"use client";

import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import Navigation from "./Navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-warm-cream to-soft-white">
        <Navigation />
        <main className="lg:ml-64">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
