"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Heart, Mic, MicOff, Save, Check } from "lucide-react";
import { moodApi } from "../lib/api";
import { MoodEntry } from "../lib/types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ProtectedLayout from "../components/ProtectedLayout";
import toast from "react-hot-toast";

interface MoodFormData {
  mood: number;
  emotions: string[];
  notes: string;
}

const emotionOptions = [
  "Happy",
  "Sad",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Grateful",
  "Lonely",
  "Confident",
  "Overwhelmed",
  "Peaceful",
  "Angry",
  "Hopeful",
  "Tired",
  "Energetic",
  "Content",
];

export default function MoodPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [moodValue, setMoodValue] = useState(5);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<MoodFormData>({
      defaultValues: {
        mood: 5,
        emotions: [],
        notes: "",
      },
    });

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        setValue("notes", transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        toast.error("Speech recognition failed. Please try again.");
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [setValue]);

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    } else {
      toast.error("Speech recognition not supported in this browser.");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleEmotionToggle = (emotion: string) => {
    const newEmotions = selectedEmotions.includes(emotion)
      ? selectedEmotions.filter((e) => e !== emotion)
      : [...selectedEmotions, emotion];

    setSelectedEmotions(newEmotions);
    setValue("emotions", newEmotions);
  };

  const handleMoodChange = (value: number) => {
    setMoodValue(value);
    setValue("mood", value);
  };

  const onSubmit = async (data: MoodFormData) => {
    setIsSubmitting(true);

    try {
      const moodEntry: Partial<MoodEntry> = {
        mood: data.mood,
        emotions: data.emotions,
        notes: data.notes,
        voiceTranscript: transcript || undefined,
      };

      const response = await moodApi.logMood(moodEntry);

      if (response.success) {
        setIsSuccess(true);
        toast.success("Mood logged successfully!");

        // Reset form
        reset();
        setSelectedEmotions([]);
        setMoodValue(5);
        setTranscript("");

        // Hide success state after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        toast.error(response.message || "Failed to log mood");
      }
    } catch (error) {
      console.error("Error logging mood:", error);
      toast.error("Failed to log mood. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 9) return "😍";
    if (mood >= 8) return "😊";
    if (mood >= 7) return "🙂";
    if (mood >= 6) return "😌";
    if (mood >= 5) return "😐";
    if (mood >= 4) return "😕";
    if (mood >= 3) return "😔";
    if (mood >= 2) return "😢";
    return "😭";
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 7) return "from-green-400 to-emerald-500";
    if (mood >= 5) return "from-yellow-400 to-orange-400";
    return "from-red-400 to-pink-500";
  };

  if (isSuccess) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-deep-forest mb-2">
              Mood Logged Successfully!
            </h2>
            <p className="text-gentle-gray mb-6">
              Thank you for taking the time to check in with yourself.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-3 bg-primary-sage text-white rounded-xl hover:bg-primary-sage/90 transition-colors"
            >
              Log Another Mood
            </button>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-primary-sage" />
          </div>
          <h1 className="text-3xl font-light text-deep-forest mb-2">
            How are you feeling?
          </h1>
          <p className="text-gentle-gray">
            Take a moment to check in with yourself and log your current mood.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Mood Slider */}
          <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20">
            <h3 className="text-lg font-medium text-deep-forest mb-6 text-center">
              Rate your mood (1-10)
            </h3>

            <div className="space-y-6">
              {/* Emoji Display */}
              <div className="text-center">
                <div className="text-6xl mb-2">{getMoodEmoji(moodValue)}</div>
                <div className="text-2xl font-semibold text-deep-forest">
                  {moodValue}/10
                </div>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodValue}
                  onChange={(e) => handleMoodChange(parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gentle-gray mt-2">
                  <span>Very Low</span>
                  <span>Very High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emotions */}
          <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20">
            <h3 className="text-lg font-medium text-deep-forest mb-6">
              What emotions are you experiencing?
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {emotionOptions.map((emotion) => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => handleEmotionToggle(emotion)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      selectedEmotions.includes(emotion)
                        ? "bg-primary-sage text-white border border-primary-sage"
                        : "bg-soft-white text-gentle-gray border border-primary-sage/20 hover:border-primary-sage/40 hover:text-deep-forest"
                    }
                  `}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20">
            <h3 className="text-lg font-medium text-deep-forest mb-6">
              Additional notes (optional)
            </h3>

            <div className="space-y-4">
              <textarea
                {...register("notes")}
                placeholder="What's on your mind? What might be contributing to how you're feeling?"
                className="w-full h-32 p-4 rounded-xl border border-primary-sage/20 bg-soft-white focus:border-primary-sage focus:ring-4 focus:ring-primary-sage/20 focus:outline-none resize-none text-deep-forest placeholder-gentle-gray/60"
              />

              {/* Voice Input */}
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isRecording
                        ? "bg-red-100 text-red-600 border border-red-200"
                        : "bg-primary-sage/10 text-primary-sage border border-primary-sage/20 hover:bg-primary-sage/20"
                    }
                  `}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      <span>Stop Recording</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>Voice Input</span>
                    </>
                  )}
                </button>

                {transcript && (
                  <div className="text-sm text-gentle-gray">
                    <span className="font-medium">Transcribed:</span>{" "}
                    {transcript}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex items-center space-x-3 px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-200
                ${
                  isSubmitting
                    ? "bg-gentle-gray/20 text-gentle-gray cursor-not-allowed"
                    : "bg-gradient-to-r from-primary-sage to-calm-blue text-white hover:from-primary-sage/90 hover:to-calm-blue/90 shadow-lg hover:shadow-xl"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Logging Mood...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Log My Mood</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--primary-sage);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--primary-sage);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </ProtectedLayout>
  );
}
