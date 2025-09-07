"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";

export const BackendStatus: React.FC = () => {
  const [isBackendRunning, setIsBackendRunning] = useState<boolean | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
          }/health`,
          {
            method: "GET",
            timeout: 5000,
          } as any
        );
        setIsBackendRunning(response.ok);
      } catch (error) {
        setIsBackendRunning(false);
      }
    };

    checkBackendStatus();
    // Check every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible || isBackendRunning === null || isBackendRunning) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5 mr-3" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Backend Server Not Running
          </h3>
          <p className="text-sm text-red-700 mt-1">
            The backend server is not running on port 3001. Please start the
            backend server to use all features.
          </p>
          <div className="mt-2 text-xs text-red-600">
            <p>To start the backend:</p>
            <code className="bg-red-100 px-2 py-1 rounded text-red-800">
              npm run dev
            </code>
            <span className="ml-2">in the backend directory</span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-3 text-red-400 hover:text-red-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
