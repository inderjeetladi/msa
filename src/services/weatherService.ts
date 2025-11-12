// Weather service for OpenWeatherMap API integration
export interface WeatherData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface WeatherForecast {
  city: string;
  country: string;
  forecast: WeatherData[];
  current: {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
  };
}

// OpenWeatherMap API response interfaces
interface OpenWeatherMain {
  temp: number;
  humidity: number;
}

interface OpenWeatherWeather {
  description: string;
  icon: string;
}

interface OpenWeatherWind {
  speed: number;
}

interface OpenWeatherRain {
  '3h'?: number;
}

interface OpenWeatherForecastItem {
  dt: number;
  main: OpenWeatherMain;
  weather: OpenWeatherWeather[];
  wind: OpenWeatherWind;
  rain?: OpenWeatherRain;
}

interface OpenWeatherCity {
  name: string;
  country: string;
}

interface OpenWeatherForecastResponse {
  list: OpenWeatherForecastItem[];
  city: OpenWeatherCity;
}

interface OpenWeatherCurrentResponse {
  main: OpenWeatherMain;
  weather: OpenWeatherWeather[];
  wind: OpenWeatherWind;
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'your-api-key-here';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const CACHE_KEY = 'weather_forecast_cache';
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

interface CachedWeatherData {
  data: WeatherForecast;
  timestamp: number;
  city: string;
  country: string;
}

// Helper functions for localStorage operations
const getCachedWeatherData = (): CachedWeatherData | null => {
  try {
    if (typeof window === 'undefined') return null;
    
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const parsedCache: CachedWeatherData = JSON.parse(cached);
    return parsedCache;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

const setCachedWeatherData = (data: WeatherForecast, city: string, country: string): void => {
  try {
    if (typeof window === 'undefined') return;
    
    const cacheData: CachedWeatherData = {
      data,
      timestamp: Date.now(),
      city,
      country
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

const isCacheValid = (cachedData: CachedWeatherData, city: string, country: string): boolean => {
  const now = Date.now();
  const isExpired = now - cachedData.timestamp > CACHE_DURATION;
  const isSameLocation = cachedData.city === city && cachedData.country === country;
  
  return !isExpired && isSameLocation;
};

export const getWeatherForecast = async (city: string = 'Columbia, MO', country: string = 'US'): Promise<WeatherForecast> => {
  // Check cache first
  const cachedData = getCachedWeatherData();
  if (cachedData && isCacheValid(cachedData, city, country)) {
    console.log('Using cached weather data');
    return cachedData.data;
  }

  try {
    console.log('Fetching fresh weather data from API');
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: OpenWeatherForecastResponse = await response.json();
    
    // Process the 5-day forecast data
    const forecast: WeatherData[] = [];
    const processedDates = new Set<string>();
    
    // Get daily forecasts (every 24 hours)
    data.list.forEach((item: OpenWeatherForecastItem) => {
      const date = new Date(item.dt * 1000).toDateString();
      const time = new Date(item.dt * 1000).getHours();
      
      // Only take one forecast per day (preferably midday)
      if (!processedDates.has(date) && time >= 12 && time <= 15) {
        forecast.push({
          date: date,
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          precipitation: item.rain?.['3h'] || 0
        });
        processedDates.add(date);
      }
    });

    // Get current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error(`Current weather API error: ${currentResponse.status}`);
    }
    
    const currentData: OpenWeatherCurrentResponse = await currentResponse.json();

    const weatherData: WeatherForecast = {
      city: data.city.name,
      country: data.city.country,
      forecast: forecast.slice(0, 5), // Ensure we only get 5 days
      current: {
        temperature: Math.round(currentData.main.temp),
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed
      }
    };

    // Cache the fresh data
    setCachedWeatherData(weatherData, city, country);
    
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // If API fails, try to return cached data even if expired
    if (cachedData) {
      console.log('API failed, using expired cached data as fallback');
      return cachedData.data;
    }
    
    throw error;
  }
};

export const getWeatherIcon = (iconCode: string): string => {
  const iconMap: { [key: string]: string } = {
    '01d': 'sun', // clear sky day
    '01n': 'moon', // clear sky night
    '02d': 'cloud-sun', // few clouds day
    '02n': 'cloud-moon', // few clouds night
    '03d': 'cloud', // scattered clouds
    '03n': 'cloud',
    '04d': 'cloud', // broken clouds
    '04n': 'cloud',
    '09d': 'cloud-rain', // shower rain
    '09n': 'cloud-rain',
    '10d': 'cloud-rain', // rain
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning', // thunderstorm
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow', // snow
    '13n': 'cloud-snow',
    '50d': 'cloud-fog', // mist
    '50n': 'cloud-fog'
  };
  
  return iconMap[iconCode] || 'cloud';
};

export const getPlantingRecommendation = (forecast: WeatherData[]): string => {
  const avgTemp = forecast.reduce((sum, day) => sum + day.temperature, 0) / forecast.length;
  const totalPrecipitation = forecast.reduce((sum, day) => sum + day.precipitation, 0);
  const hasRain = forecast.some(day => day.precipitation > 0);
  
  if (avgTemp < 10) {
    return "Soil temperature too low. Wait for warmer conditions before planting.";
  } else if (avgTemp < 15) {
    return "Cool conditions. Consider waiting for soil to warm up for optimal germination.";
  } else if (hasRain && totalPrecipitation > 5) {
    return "Heavy rain expected. Delay planting to avoid soil compaction.";
  } else if (hasRain && totalPrecipitation > 2) {
    return "Moderate rainfall expected. Good conditions for planting after rain.";
  } else {
    return "Favorable conditions for planting. Monitor soil moisture levels.";
  }
};

// Utility function to clear weather cache
export const clearWeatherCache = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CACHE_KEY);
      console.log('Weather cache cleared');
    }
  } catch (error) {
    console.error('Error clearing weather cache:', error);
  }
};

// Utility function to get cache info
export const getCacheInfo = (): { isCached: boolean; age: number; isExpired: boolean } | null => {
  try {
    if (typeof window === 'undefined') return null;
    
    const cachedData = getCachedWeatherData();
    if (!cachedData) {
      return { isCached: false, age: 0, isExpired: true };
    }
    
    const age = Date.now() - cachedData.timestamp;
    const isExpired = age > CACHE_DURATION;
    
    return {
      isCached: true,
      age: Math.floor(age / (1000 * 60 * 60)), // age in hours
      isExpired
    };
  } catch (error) {
    console.error('Error getting cache info:', error);
    return null;
  }
};
