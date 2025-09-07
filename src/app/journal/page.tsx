"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BookOpen, Plus, Save, Calendar, Heart, Sparkles } from "lucide-react";
import { journalApi } from "../lib/api";
import { JournalEntry, PaginatedResponse } from "../lib/types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ProtectedLayout from "../components/ProtectedLayout";
import toast from "react-hot-toast";

interface JournalFormData {
  content: string;
  mood?: number;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<JournalFormData>({
      defaultValues: {
        content: "",
        mood: undefined,
      },
    });

  const content = watch("content");

  useEffect(() => {
    fetchEntries();
    fetchAIPrompt();
  }, []);

  const fetchEntries = async (page = 1) => {
    try {
      const response = await journalApi.getEntries(page, 10);
      if (response.success && response.data) {
        if (page === 1) {
          setEntries(response.data);
        } else {
          setEntries((prev) => [...prev, ...response.data]);
        }
        setHasMore(response.pagination.page < response.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast.error("Failed to load journal entries");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIPrompt = async () => {
    try {
      const response = await journalApi.getAIPrompt();
      if (response.success && response.data) {
        setAiPrompt(response.data.prompt);
      }
    } catch (error) {
      console.error("Error fetching AI prompt:", error);
    }
  };

  const onSubmit = async (data: JournalFormData) => {
    if (!data.content.trim()) {
      toast.error("Please write something before saving");
      return;
    }

    setIsSubmitting(true);

    try {
      const entry: Partial<JournalEntry> = {
        content: data.content.trim(),
        mood: data.mood,
      };

      const response = await journalApi.createEntry(entry);

      if (response.success) {
        toast.success("Journal entry saved!");
        reset();
        setIsCreating(false);
        fetchEntries(1); // Refresh entries
        fetchAIPrompt(); // Get new AI prompt
      } else {
        toast.error(response.message || "Failed to save entry");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      toast.error("Failed to save entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchEntries(nextPage);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMoodEmoji = (mood?: number) => {
    if (!mood) return null;
    if (mood >= 8) return "😊";
    if (mood >= 6) return "🙂";
    if (mood >= 4) return "😐";
    if (mood >= 2) return "😔";
    return "😢";
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner size="lg" className="text-primary-sage mb-4" />
            <p className="text-gentle-gray">Loading your journal...</p>
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
            <BookOpen className="w-8 h-8 text-primary-sage" />
          </div>
          <h1 className="text-3xl font-light text-deep-forest mb-2">
            Your Digital Journal
          </h1>
          <p className="text-gentle-gray">
            Reflect on your thoughts, feelings, and experiences in a safe space.
          </p>
        </div>

        {/* AI Prompt */}
        {aiPrompt && !isCreating && (
          <div className="bg-gradient-to-r from-soft-lavender/10 to-primary-sage/10 rounded-2xl p-6 border border-soft-lavender/20">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-soft-lavender mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-deep-forest mb-2">
                  AI Writing Prompt
                </h3>
                <p className="text-gentle-gray italic">"{aiPrompt}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Create New Entry Button */}
        {!isCreating && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center space-x-3 px-6 py-3 bg-primary-sage text-white rounded-xl hover:bg-primary-sage/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Entry</span>
            </button>
          </div>
        )}

        {/* Create Entry Form */}
        {isCreating && (
          <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20">
            <h2 className="text-xl font-medium text-deep-forest mb-6">
              Write Your Entry
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-deep-forest mb-3">
                  What's on your mind today?
                </label>
                <textarea
                  {...register("content", { required: true })}
                  placeholder="Start writing about your thoughts, feelings, experiences, or anything else you'd like to reflect on..."
                  className="w-full h-48 p-4 rounded-xl border border-primary-sage/20 bg-soft-white focus:border-primary-sage focus:ring-4 focus:ring-primary-sage/20 focus:outline-none resize-none text-deep-forest placeholder-gentle-gray/60"
                />
                <div className="text-right text-sm text-gentle-gray mt-2">
                  {content?.length || 0} characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-forest mb-3">
                  How are you feeling? (optional)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setValue("mood", mood)}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                        ${
                          watch("mood") === mood
                            ? "bg-primary-sage text-white"
                            : "bg-soft-white text-gentle-gray border border-primary-sage/20 hover:border-primary-sage/40"
                        }
                      `}
                    >
                      {getMoodEmoji(mood)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    reset();
                  }}
                  className="px-6 py-3 text-gentle-gray hover:text-deep-forest transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !content?.trim()}
                  className={`
                    flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
                    ${
                      isSubmitting || !content?.trim()
                        ? "bg-gentle-gray/20 text-gentle-gray cursor-not-allowed"
                        : "bg-primary-sage text-white hover:bg-primary-sage/90"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Entry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Journal Entries */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-deep-forest">Your Entries</h2>

          {entries.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gentle-gray/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gentle-gray mb-2">
                No entries yet
              </h3>
              <p className="text-gentle-gray">
                Start your journaling journey by creating your first entry.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20 hover:border-primary-sage/40 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gentle-gray" />
                      <span className="text-sm text-gentle-gray">
                        {formatDate(entry.timestamp)}
                      </span>
                      {entry.mood && (
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-primary-sage" />
                          <span className="text-sm text-gentle-gray">
                            {entry.mood}/10 {getMoodEmoji(entry.mood)}
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setExpandedEntry(
                          expandedEntry === entry.id ? null : entry.id
                        )
                      }
                      className="text-sm text-primary-sage hover:text-primary-sage/80 transition-colors"
                    >
                      {expandedEntry === entry.id ? "Show Less" : "Read More"}
                    </button>
                  </div>

                  <div className="text-deep-forest leading-relaxed">
                    {expandedEntry === entry.id
                      ? entry.content
                      : truncateText(entry.content, 200)}
                  </div>

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {entry.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-sage/10 text-primary-sage text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 text-primary-sage hover:text-primary-sage/80 transition-colors"
                  >
                    Load More Entries
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
}
