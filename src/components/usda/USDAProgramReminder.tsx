"use client";

import { useState, useEffect } from "react";

interface USDAProgramReminderProps {
  county?: string;
  state?: string;
}

export default function USDAProgramReminder({ 
  county = "Boone County", 
  state = "Missouri" 
}: USDAProgramReminderProps) {
  const [usdaInfo, setUsdaInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchUSDAInfo = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/usda-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ county, state }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get USDA program information");
      }

      setUsdaInfo(data.usdaInfo);
      setLastUpdated(data.timestamp);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      // Fallback to static content if API fails
      setUsdaInfo(`Signup deadline: March 15
ARC-CO projected payout: $21/acre (${county})
PLC projected payout: $5/acre
Recommendation: ARC-CO likely better protection this year`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUSDAInfo();
  }, [county, state]);

  const formatUSDAInfo = (info: string) => {
    // Split by newlines and filter out empty lines
    const lines = info.split('\n').filter(line => line.trim() !== '');
    
    // Ensure we have exactly 4 lines, pad with empty strings if needed
    const paddedLines = [...lines, '', '', '', ''].slice(0, 4);
    
    return paddedLines.map((line, index) => {
      // If line is empty, show a placeholder or skip
      if (!line.trim()) {
        return (
          <li key={index} className="items-center text-gray-500">
            Loading...
          </li>
        );
      }
      
      // Remove square brackets from the line
      const cleanLine = line.replace(/\[|\]/g, '');
      
      // Check if line contains "Recommendation:" for special styling
      if (cleanLine.includes('Recommendation:')) {
        return (
          <li key={index} className="items-center mt-2 font-medium text-gray-800">
            {cleanLine}
          </li>
        );
      }
      
      return (
        <li key={index} className="items-center">
          {cleanLine}
        </li>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 border" style={{ borderColor: '#e8e8e8' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">USDA Program Reminder</h3>
        <div className="flex items-center space-x-2">
          {isLoading && (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          )}
          <button
            onClick={fetchUSDAInfo}
            disabled={isLoading}
            className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
            title="Refresh USDA program information"
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-800 text-sm">Using cached data: {error}</span>
          </div>
        </div>
      )}

      {isLoading && !usdaInfo ? (
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-gray-600 text-sm">Loading USDA program information...</span>
        </div>
      ) : (
        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
          {formatUSDAInfo(usdaInfo)}
        </ul>
      )}

      {lastUpdated && (
        <div className="text-xs text-gray-500 mt-2">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  );
}
