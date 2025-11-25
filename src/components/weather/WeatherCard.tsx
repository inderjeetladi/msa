"use client";

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { getWeatherForecast, getWeatherIcon, getPlantingRecommendation, clearWeatherCache, getCacheInfo, WeatherForecast } from '@/services/weatherService';

interface WeatherCardProps {
  className?: string;
}

export default function WeatherCard({ className = "" }: WeatherCardProps) {
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheInfo, setCacheInfo] = useState<{ isCached: boolean; age: number; isExpired: boolean } | null>(null);
  const [postalInput, setPostalInput] = useState('');
  const [activePostalCode, setActivePostalCode] = useState<string | null>(null);

  const handlePostalInputChange = (value: string) => {
    setPostalInput(value);
    if (error) {
      setError(null);
    }
  };

  const fetchWeather = async ({ forceRefresh = false, postalCode = activePostalCode }: { forceRefresh?: boolean; postalCode?: string | null } = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      if (forceRefresh) {
        clearWeatherCache();
      }
      
      const data = await getWeatherForecast(
        postalCode ? { postalCode } : {}
      );
      setWeatherData(data);
      
      // Update cache info
      const cache = getCacheInfo();
      setCacheInfo(cache);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleRefresh = () => {
    fetchWeather({ forceRefresh: true });
  };

  const handlePostalSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedPostal = postalInput.trim();

    if (!trimmedPostal) {
      setError('Please enter a valid postal code.');
      return;
    }

    setActivePostalCode(trimmedPostal);
    setPostalInput(trimmedPostal);
    await fetchWeather({ forceRefresh: true, postalCode: trimmedPostal });
  };

  const getWeatherIconComponent = (iconCode: string) => {
    const iconType = getWeatherIcon(iconCode);
    
    switch (iconType) {
      case 'sun':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="m4.93 4.93 1.41 1.41"/>
            <path d="m17.66 17.66 1.41 1.41"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m6.34 17.66-1.41 1.41"/>
            <path d="m19.07 4.93-1.41 1.41"/>
          </svg>
        );
      case 'cloud':
        return (
          <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
        );
      case 'cloud-rain':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
            <path d="m9.2 22 3-7"/>
            <path d="m9 13-3 7"/>
            <path d="m17 13-3 7"/>
          </svg>
        );
      case 'cloud-lightning':
        return (
          <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg p-6 border ${className}`} style={{ borderColor: '#e8e8e8' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather & Planting Alert</h3>
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading weather data...</span>
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className={`bg-white rounded-lg p-6 border ${className}`} style={{ borderColor: '#e8e8e8' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather & Planting Alert</h3>
        <form onSubmit={handlePostalSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-end mb-4">
          <div className="w-full sm:w-auto flex-1">
            <label htmlFor="postal-code-input" className="block text-sm font-medium text-gray-700 mb-1">
              Enter ZIP / Postal Code
            </label>
            <input
              id="postal-code-input"
              value={postalInput}
              onChange={(event) => handlePostalInputChange(event.target.value)}
              placeholder="e.g. 65201"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Update Weather
          </button>
        </form>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-800 font-medium">Error loading weather data</span>
          </div>
          <p className="text-red-700 mt-1">{error || 'Unable to fetch weather information'}</p>
        </div>
      </div>
    );
  }

  const plantingRecommendation = getPlantingRecommendation(weatherData.forecast);
  const totalPrecipitation = weatherData.forecast.reduce((sum, day) => sum + day.precipitation, 0);
  const avgTemp = weatherData.forecast.reduce((sum, day) => sum + day.temperature, 0) / weatherData.forecast.length;

  return (
    <div className={`bg-white rounded-lg p-6 border ${className}`} style={{ borderColor: '#e8e8e8' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Weather & Planting Alert</h3>
        <div className="flex items-center gap-2">
          {cacheInfo && (
            <span className="text-xs text-gray-500">
              {cacheInfo.isCached ? `Cached ${cacheInfo.age}h ago` : 'Live data'}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
            title="Refresh weather data"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      <form onSubmit={handlePostalSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-end mb-4">
        <div className="w-full sm:w-auto flex-1">
          <label htmlFor="postal-code-input-loaded" className="block text-sm font-medium text-gray-700 mb-1">
            Enter ZIP / Postal Code
          </label>
          <input
            id="postal-code-input-loaded"
            value={postalInput}
            onChange={(event) => handlePostalInputChange(event.target.value)}
            placeholder="e.g. 65201"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Update Weather
        </button>
      </form>

      <p className="text-sm text-gray-500 mb-4">
        Showing weather for {weatherData.city}, {weatherData.country}
        {activePostalCode ? ` (Postal code: ${activePostalCode})` : ''}
      </p>
      
      {/* Current Weather Summary */}
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
        <li className="flex items-center">
          Rainfall forecast: {totalPrecipitation.toFixed(1)}&quot; over next 5 days
        </li>
        <li className="flex items-center">
          Average temperature: {Math.round(avgTemp)}°F
        </li>
        <li className="flex items-center">
          Current: {weatherData.current.temperature}°F — {weatherData.current.description}
        </li>
        <li className="flex items-center mt-2 flex-wrap">
          <span className="font-medium">Recommendation:</span> {plantingRecommendation}
        </li>
      </ul>

      {/* 5-Day Forecast */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900 mb-2">5-Day Forecast</h4>
        <div className="space-y-2">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                {getWeatherIconComponent(day.icon)}
                <span className="text-gray-700">
                  {formatDate(day.date)}: {day.temperature}°F — {day.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
