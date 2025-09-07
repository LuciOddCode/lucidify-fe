"use client";

import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, User, Shield, Download, Trash2, Bell, Globe, Eye, EyeOff } from "lucide-react";
import { profileApi } from "../lib/api";
import { User as UserType, UserPreferences, TrustedContact } from "../lib/types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ProtectedLayout from "../components/ProtectedLayout";
import { useAuth } from "../lib/auth-context";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user, setLanguage, language } = useAuth();
  const [profile, setProfile] = useState<UserType | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>({
    language: "en",
    aiSummarization: true,
    anonymousMode: false,
    dataConsent: true
  });
  const [trustedContact, setTrustedContact] = useState<TrustedContact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileApi.getProfile();
      if (response.success && response.data) {
        setProfile(response.data);
        if (response.data.preferences) {
          setPreferences(response.data.preferences);
        }
        if (response.data.preferences?.trustedContact) {
          setTrustedContact(response.data.preferences.trustedContact);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = async (key: keyof UserPreferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    
    try {
      const response = await profileApi.updatePreferences({ [key]: value });
      if (response.success) {
        toast.success("Settings updated successfully");
        if (key === "language") {
          setLanguage(value);
        }
      } else {
        toast.error(response.message || "Failed to update settings");
        // Revert on error
        setPreferences(preferences);
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update settings");
      setPreferences(preferences);
    }
  };

  const handleTrustedContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trustedContact) return;

    setIsSaving(true);
    try {
      const response = await profileApi.setTrustedContact(trustedContact);
      if (response.success) {
        toast.success("Trusted contact updated successfully");
      } else {
        toast.error(response.message || "Failed to update trusted contact");
      }
    } catch (error) {
      console.error("Error updating trusted contact:", error);
      toast.error("Failed to update trusted contact");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestNotification = async () => {
    try {
      const response = await profileApi.testTrustedContact();
      if (response.success) {
        toast.success("Test notification sent successfully");
      } else {
        toast.error(response.message || "Failed to send test notification");
      }
    } catch (error) {
      console.error("Error sending test notification:", error);
      toast.error("Failed to send test notification");
    }
  };

  const handleExportData = async () => {
    try {
      const response = await profileApi.exportData();
      if (response.success && response.data) {
        // Create a download link
        const link = document.createElement('a');
        link.href = response.data.downloadUrl;
        link.download = `lucidify-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Data export started");
      } else {
        toast.error(response.message || "Failed to export data");
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await profileApi.deleteAccount();
      if (response.success) {
        toast.success("Account deleted successfully");
        // Redirect to login
        window.location.href = "/pages/loginPage";
      } else {
        toast.error(response.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    }
  };

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner size="lg" className="text-primary-sage mb-4" />
            <p className="text-gentle-gray">Loading settings...</p>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <SettingsIcon className="w-8 h-8 text-primary-sage" />
          </div>
          <h1 className="text-3xl font-light text-deep-forest mb-2">
            Settings & Privacy
          </h1>
          <p className="text-gentle-gray">
            Manage your account, preferences, and privacy settings
          </p>
        </div>

        {/* Profile Information */}
        <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20">
          <div className="flex items-center space-x-4 mb-6">
            <User className="w-6 h-6 text-primary-sage" />
            <h2 className="text-xl font-medium text-deep-forest">Profile Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-deep-forest mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full p-3 rounded-xl border border-primary-sage/20 bg-gray-50 text-gentle-gray"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-forest mb-2">
                Name
              </label>
              <input
                type="text"
                value={profile?.name || ""}
                placeholder="Enter your name"
                className="w-full p-3 rounded-xl border border-primary-sage/20 bg-soft-white focus:border-primary-sage focus:ring-4 focus:ring-primary-sage/20 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20">
          <div className="flex items-center space-x-4 mb-6">
            <SettingsIcon className="w-6 h-6 text-primary-sage" />
            <h2 className="text-xl font-medium text-deep-forest">Preferences</h2>
          </div>

          <div className="space-y-6">
            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-deep-forest mb-3">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange("language", e.target.value)}
                className="w-full p-3 rounded-xl border border-primary-sage/20 bg-soft-white focus:border-primary-sage focus:ring-4 focus:ring-primary-sage/20 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="si">සිංහල (Sinhala)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>

            {/* AI Summarization */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-deep-forest">AI Summarization</h3>
                <p className="text-sm text-gentle-gray">
                  Allow AI to analyze and summarize your journal entries for insights
                </p>
              </div>
              <button
                onClick={() => handlePreferenceChange("aiSummarization", !preferences.aiSummarization)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.aiSummarization ? "bg-primary-sage" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.aiSummarization ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Anonymous Mode */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-deep-forest">Anonymous Mode</h3>
                <p className="text-sm text-gentle-gray">
                  Use the app without personal data being stored
                </p>
              </div>
              <button
                onClick={() => handlePreferenceChange("anonymousMode", !preferences.anonymousMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.anonymousMode ? "bg-primary-sage" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.anonymousMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Trusted Contact */}
        <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20">
          <div className="flex items-center space-x-4 mb-6">
            <Bell className="w-6 h-6 text-primary-sage" />
            <h2 className="text-xl font-medium text-deep-forest">Trusted Contact</h2>
          </div>

          <form onSubmit={handleTrustedContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-deep-forest mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={trustedContact?.name || ""}
                  onChange={(e) => setTrustedContact({ ...trustedContact!, name: e.target.value })}
                  placeholder="Enter trusted contact's name"
                  className="w-full p-3 rounded-xl border border-primary-sage/20 bg-soft-white focus:border-primary-sage focus:ring-4 focus:ring-primary-sage/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-forest mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={trustedContact?.email || ""}
                  onChange={(e) => setTrustedContact({ ...trustedContact!, email: e.target.value })}
                  placeholder="Enter trusted contact's email"
                  className="w-full p-3 rounded-xl border border-primary-sage/20 bg-soft-white focus:border-primary-sage focus:ring-4 focus:ring-primary-sage/20 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-deep-forest mb-2">
                Phone (optional)
              </label>
              <input
                type="tel"
                value={trustedContact?.phone || ""}
                onChange={(e) => setTrustedContact({ ...trustedContact!, phone: e.target.value })}
                placeholder="Enter trusted contact's phone number"
                className="w-full p-3 rounded-xl border border-primary-sage/20 bg-soft-white focus:border-primary-sage focus:ring-4 focus:ring-primary-sage/20 focus:outline-none"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-primary-sage text-white rounded-xl hover:bg-primary-sage/90 transition-colors disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Contact"}
              </button>
              {trustedContact && (
                <button
                  type="button"
                  onClick={handleTestNotification}
                  className="px-6 py-3 text-primary-sage border border-primary-sage rounded-xl hover:bg-primary-sage/10 transition-colors"
                >
                  Send Test Notification
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Data Management */}
        <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20">
          <div className="flex items-center space-x-4 mb-6">
            <Shield className="w-6 h-6 text-primary-sage" />
            <h2 className="text-xl font-medium text-deep-forest">Data Management</h2>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="flex items-center space-x-3 px-6 py-3 text-primary-sage border border-primary-sage rounded-xl hover:bg-primary-sage/10 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Export My Data</span>
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center space-x-3 px-6 py-3 text-red-600 border border-red-300 rounded-xl hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-soft-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-xl font-semibold text-deep-forest mb-4">
                Delete Account
              </h3>
              <p className="text-gentle-gray mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 text-gentle-gray border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
}
