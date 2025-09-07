"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Calendar, Heart, BookOpen, PieChart, BarChart } from "lucide-react";
import { moodApi, journalApi } from "../lib/api";
import { MoodAnalytics, JournalAnalytics } from "../lib/types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ProtectedLayout from "../components/ProtectedLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar } from "recharts";

export default function AnalyticsPage() {
  const [moodAnalytics, setMoodAnalytics] = useState<MoodAnalytics | null>(null);
  const [journalAnalytics, setJournalAnalytics] = useState<JournalAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem("analytics-consent");
    if (savedConsent === "true") {
      setConsentGiven(true);
      fetchAnalytics();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const [moodResponse, journalResponse] = await Promise.all([
        moodApi.getMoodAnalytics(),
        journalApi.getJournalAnalytics()
      ]);

      if (moodResponse.success) {
        setMoodAnalytics(moodResponse.data || null);
      }
      if (journalResponse.success) {
        setJournalAnalytics(journalResponse.data || null);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConsent = () => {
    setConsentGiven(true);
    localStorage.setItem("analytics-consent", "true");
    fetchAnalytics();
  };

  const getMoodTrendColor = (trend: string) => {
    switch (trend) {
      case "improving": return "text-green-600";
      case "declining": return "text-red-600";
      default: return "text-blue-600";
    }
  };

  const getMoodTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return "📈";
      case "declining": return "📉";
      default: return "➡️";
    }
  };

  const COLORS = ["#7c9885", "#6b9bd1", "#5fa5a5", "#e8b4a0", "#b8a4c9"];

  if (!consentGiven) {
    return (
      <ProtectedLayout>
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-primary-sage" />
            </div>
            <h1 className="text-3xl font-light text-deep-forest mb-4">
              Analytics & Insights
            </h1>
            <p className="text-gentle-gray text-lg mb-8">
              Get personalized insights into your emotional patterns and well-being journey.
            </p>
            
            <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20 text-left space-y-4">
              <h3 className="text-lg font-medium text-deep-forest mb-4">Data Privacy & Consent</h3>
              <p className="text-gentle-gray text-sm leading-relaxed">
                To provide you with meaningful insights, we analyze your mood entries and journal content 
                using AI. This helps us identify patterns and suggest personalized coping strategies.
              </p>
              <ul className="text-gentle-gray text-sm space-y-2">
                <li>• Your data is processed securely and anonymously</li>
                <li>• We only analyze content you explicitly share</li>
                <li>• You can revoke consent at any time in settings</li>
                <li>• No personal information is shared with third parties</li>
              </ul>
              <div className="pt-4">
                <button
                  onClick={handleConsent}
                  className="w-full py-3 px-6 bg-primary-sage text-white rounded-xl hover:bg-primary-sage/90 transition-colors font-medium"
                >
                  I Consent to Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner size="lg" className="text-primary-sage mb-4" />
            <p className="text-gentle-gray">Loading your insights...</p>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-primary-sage" />
          </div>
          <h1 className="text-3xl font-light text-deep-forest mb-2">
            Your Emotional Insights
          </h1>
          <p className="text-gentle-gray">
            Understanding your patterns to support your well-being journey
          </p>
        </div>

        {/* Mood Analytics */}
        {moodAnalytics && (
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-deep-forest flex items-center space-x-3">
              <Heart className="w-6 h-6 text-primary-sage" />
              <span>Mood Patterns</span>
            </h2>

            {/* Mood Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-deep-forest">Average Mood</h3>
                  <TrendingUp className="w-5 h-5 text-primary-sage" />
                </div>
                <div className="text-3xl font-semibold text-deep-forest mb-2">
                  {moodAnalytics.averageMood.toFixed(1)}/10
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getMoodTrendIcon(moodAnalytics.moodTrend)}</span>
                  <span className={`text-sm font-medium ${getMoodTrendColor(moodAnalytics.moodTrend)}`}>
                    {moodAnalytics.moodTrend}
                  </span>
                </div>
              </div>

              <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-deep-forest">Data Points</h3>
                  <Calendar className="w-5 h-5 text-primary-sage" />
                </div>
                <div className="text-3xl font-semibold text-deep-forest mb-2">
                  {moodAnalytics.weeklyData.length}
                </div>
                <div className="text-sm text-gentle-gray">Mood entries this week</div>
              </div>

              <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-deep-forest">Most Common</h3>
                  <PieChart className="w-5 h-5 text-primary-sage" />
                </div>
                <div className="text-lg font-semibold text-deep-forest mb-2">
                  {moodAnalytics.emotionFrequency[0]?.emotion || "N/A"}
                </div>
                <div className="text-sm text-gentle-gray">
                  {moodAnalytics.emotionFrequency[0]?.count || 0} times
                </div>
              </div>
            </div>

            {/* Mood Trend Chart */}
            <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
              <h3 className="text-lg font-medium text-deep-forest mb-6">Weekly Mood Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodAnalytics.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280"
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                    />
                    <YAxis 
                      domain={[0, 10]}
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #7c9885',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                      labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#7c9885" 
                      strokeWidth={3}
                      dot={{ fill: '#7c9885', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#7c9885', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Emotion Frequency Chart */}
            <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
              <h3 className="text-lg font-medium text-deep-forest mb-6">Emotion Frequency</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={moodAnalytics.emotionFrequency.slice(0, 8)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="emotion" 
                      stroke="#6b7280"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #7c9885',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                    <Bar dataKey="count" fill="#7c9885" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Journal Analytics */}
        {journalAnalytics && (
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-deep-forest flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-primary-sage" />
              <span>Journal Insights</span>
            </h2>

            {/* Journal Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-deep-forest">Total Entries</h3>
                  <BookOpen className="w-5 h-5 text-primary-sage" />
                </div>
                <div className="text-3xl font-semibold text-deep-forest mb-2">
                  {journalAnalytics.totalEntries}
                </div>
                <div className="text-sm text-gentle-gray">Journal entries</div>
              </div>

              <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-deep-forest">Average Length</h3>
                  <BarChart className="w-5 h-5 text-primary-sage" />
                </div>
                <div className="text-3xl font-semibold text-deep-forest mb-2">
                  {journalAnalytics.averageLength}
                </div>
                <div className="text-sm text-gentle-gray">Words per entry</div>
              </div>

              <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-deep-forest">Writing Streak</h3>
                  <Calendar className="w-5 h-5 text-primary-sage" />
                </div>
                <div className="text-3xl font-semibold text-deep-forest mb-2">
                  0
                </div>
                <div className="text-sm text-gentle-gray">Days in a row</div>
              </div>
            </div>

            {/* Sentiment Distribution */}
            <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
              <h3 className="text-lg font-medium text-deep-forest mb-6">Sentiment Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={journalAnalytics.sentimentDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {journalAnalytics.sentimentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #7c9885',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="bg-gradient-to-r from-soft-lavender/10 to-primary-sage/10 rounded-2xl p-6 border border-soft-lavender/20">
              <h3 className="text-lg font-medium text-deep-forest mb-4">AI-Generated Weekly Summary</h3>
              <p className="text-gentle-gray leading-relaxed">
                {journalAnalytics.weeklySummary || "No summary available yet. Keep journaling to get personalized insights!"}
              </p>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!moodAnalytics && !journalAnalytics && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gentle-gray/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gentle-gray mb-2">No Data Yet</h3>
            <p className="text-gentle-gray">
              Start logging your mood and journaling to see your personalized insights.
            </p>
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
}
