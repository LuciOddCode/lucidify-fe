"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  BookOpen,
  Lightbulb,
  BarChart3,
  Clock,
  TrendingUp,
  Calendar,
  Quote,
} from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { moodApi, journalApi } from "../lib/api";
import { MoodAnalytics, JournalAnalytics } from "../lib/types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ProtectedLayout from "../components/ProtectedLayout";

export default function Dashboard() {
  const { user, language } = useAuth();
  const [moodAnalytics, setMoodAnalytics] = useState<MoodAnalytics | null>(
    null
  );
  const [journalAnalytics, setJournalAnalytics] =
    useState<JournalAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show content immediately, don't wait for API calls
    setIsLoading(false);

    const fetchData = async () => {
      try {
        const [moodResponse, journalResponse] = await Promise.all([
          moodApi.getMoodAnalytics(),
          journalApi.getJournalAnalytics(),
        ]);

        if (moodResponse.success) {
          setMoodAnalytics(moodResponse.data || null);
        }
        if (journalResponse.success) {
          setJournalAnalytics(journalResponse.data || null);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Don't set loading to false here since we already did it above
      }
    };

    // Fetch data in background without blocking UI
    fetchData();
  }, []);

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return "😊";
    if (mood >= 6) return "🙂";
    if (mood >= 4) return "😐";
    if (mood >= 2) return "😔";
    return "😢";
  };

  const getMoodText = (mood: number) => {
    if (mood >= 8) return "Excellent";
    if (mood >= 6) return "Good";
    if (mood >= 4) return "Neutral";
    if (mood >= 2) return "Low";
    return "Very Low";
  };

  const motivationalQuotes = [
    "Every small step towards emotional well-being is a victory worth celebrating.",
    "Your feelings are valid, and taking time to understand them is an act of self-care.",
    "It's okay to not be okay sometimes. What matters is that you're here, trying.",
    "Emotional growth happens in small, consistent moments of awareness and care.",
    "You are stronger than you know, and more resilient than you think.",
  ];

  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner size="lg" className="text-primary-sage mb-4" />
            <p className="text-gentle-gray">Loading your dashboard...</p>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-sage/10 to-calm-blue/10 rounded-2xl p-6 border border-primary-sage/20">
          <h1 className="text-3xl font-light text-deep-forest mb-2">
            Welcome back, {user?.name || "there"}! 👋
          </h1>
          <p className="text-gentle-gray text-lg">
            Ready for your 8 minutes of emotional well-being today?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mood Summary */}
          <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-deep-forest">
                This Week's Mood
              </h3>
              <Heart className="w-5 h-5 text-primary-sage" />
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">
                {moodAnalytics ? getMoodEmoji(moodAnalytics.averageMood) : "😐"}
              </div>
              <div className="text-2xl font-semibold text-deep-forest mb-1">
                {moodAnalytics
                  ? `${moodAnalytics.averageMood.toFixed(1)}/10`
                  : "0.0/10"}
              </div>
              <div className="text-gentle-gray">
                {moodAnalytics
                  ? getMoodText(moodAnalytics.averageMood)
                  : "No data yet"}
              </div>
              <div className="mt-3 flex items-center justify-center text-sm">
                <TrendingUp className="w-4 h-4 mr-1 text-primary-sage" />
                <span className="text-gentle-gray capitalize">
                  {moodAnalytics ? moodAnalytics.moodTrend : "stable"}
                </span>
              </div>
              {!moodAnalytics && (
                <div className="mt-2 text-xs text-gentle-gray">
                  Start logging your mood!
                </div>
              )}
            </div>
          </div>

          {/* Journal Entries */}
          <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-deep-forest">
                Journal Entries
              </h3>
              <BookOpen className="w-5 h-5 text-primary-sage" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-deep-forest mb-1">
                {journalAnalytics ? journalAnalytics.totalEntries : 0}
              </div>
              <div className="text-gentle-gray">Total entries</div>
              <div className="mt-3 text-sm text-gentle-gray">
                Avg. {journalAnalytics ? journalAnalytics.averageLength : 0}{" "}
                words
              </div>
              {!journalAnalytics && (
                <div className="mt-2 text-xs text-gentle-gray">
                  Start journaling!
                </div>
              )}
            </div>
          </div>

          {/* Streak */}
          <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-deep-forest">
                Current Streak
              </h3>
              <Calendar className="w-5 h-5 text-primary-sage" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-deep-forest mb-1">
                0
              </div>
              <div className="text-gentle-gray">Days in a row</div>
              <div className="mt-3 text-sm text-gentle-gray">
                Keep it up! 🔥
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-light text-deep-forest mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/mood"
              className="bg-gradient-to-br from-primary-sage/10 to-primary-sage/5 rounded-2xl p-6 border border-primary-sage/20 hover:border-primary-sage/40 transition-all duration-200 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-sage/20 rounded-xl flex items-center justify-center group-hover:bg-primary-sage/30 transition-colors">
                  <Heart className="w-6 h-6 text-primary-sage" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-deep-forest mb-2">
                Mood Check-In
              </h3>
              <p className="text-gentle-gray text-sm">
                Log how you're feeling right now
              </p>
            </Link>

            <Link
              href="/session"
              className="bg-gradient-to-br from-calm-blue/10 to-calm-blue/5 rounded-2xl p-6 border border-calm-blue/20 hover:border-calm-blue/40 transition-all duration-200 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-calm-blue/20 rounded-xl flex items-center justify-center group-hover:bg-calm-blue/30 transition-colors">
                  <Clock className="w-6 h-6 text-calm-blue" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-deep-forest mb-2">
                8-Minute Session
              </h3>
              <p className="text-gentle-gray text-sm">
                Guided emotional well-being session
              </p>
            </Link>

            <Link
              href="/journal"
              className="bg-gradient-to-br from-serene-teal/10 to-serene-teal/5 rounded-2xl p-6 border border-serene-teal/20 hover:border-serene-teal/40 transition-all duration-200 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-serene-teal/20 rounded-xl flex items-center justify-center group-hover:bg-serene-teal/30 transition-colors">
                  <BookOpen className="w-6 h-6 text-serene-teal" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-deep-forest mb-2">
                Journal
              </h3>
              <p className="text-gentle-gray text-sm">
                Reflect and write about your day
              </p>
            </Link>

            <Link
              href="/chat"
              className="bg-gradient-to-br from-sunset-peach/10 to-sunset-peach/5 rounded-2xl p-6 border border-sunset-peach/20 hover:border-sunset-peach/40 transition-all duration-200 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-sunset-peach/20 rounded-xl flex items-center justify-center group-hover:bg-sunset-peach/30 transition-colors">
                  <MessageCircle className="w-6 h-6 text-sunset-peach" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-deep-forest mb-2">
                AI Companion
              </h3>
              <p className="text-gentle-gray text-sm">
                Chat with your AI support companion
              </p>
            </Link>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-soft-lavender/10 to-primary-sage/10 rounded-2xl p-6 border border-soft-lavender/20">
          <div className="flex items-start space-x-4">
            <Quote className="w-6 h-6 text-soft-lavender mt-1 flex-shrink-0" />
            <div>
              <p className="text-deep-forest text-lg italic leading-relaxed">
                "{randomQuote}"
              </p>
              <p className="text-gentle-gray text-sm mt-2">
                — Your AI Companion
              </p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/coping"
            className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20 hover:border-primary-sage/40 transition-all duration-200 group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-sage/10 rounded-xl flex items-center justify-center group-hover:bg-primary-sage/20 transition-colors">
                <Lightbulb className="w-6 h-6 text-primary-sage" />
              </div>
              <h3 className="text-lg font-medium text-deep-forest ml-4">
                Coping Strategies
              </h3>
            </div>
            <p className="text-gentle-gray">
              Personalized techniques for emotional regulation
            </p>
          </Link>

          <Link
            href="/analytics"
            className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20 hover:border-primary-sage/40 transition-all duration-200 group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-sage/10 rounded-xl flex items-center justify-center group-hover:bg-primary-sage/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-primary-sage" />
              </div>
              <h3 className="text-lg font-medium text-deep-forest ml-4">
                Analytics & Trends
              </h3>
            </div>
            <p className="text-gentle-gray">
              Insights into your emotional patterns
            </p>
          </Link>
        </div>
      </div>
    </ProtectedLayout>
  );
}
