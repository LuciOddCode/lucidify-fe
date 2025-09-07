"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, Play, Pause, Check, ArrowRight, Heart, BookOpen, MessageCircle, Wind } from "lucide-react";
import { sessionApi, moodApi, journalApi, chatApi } from "../lib/api";
import { EightMinuteSession, SessionStep } from "../lib/types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ProtectedLayout from "../components/ProtectedLayout";
import toast from "react-hot-toast";

const sessionSteps = [
  {
    id: "mood-check",
    title: "Mood Check-In",
    description: "Take a moment to assess how you're feeling right now",
    duration: 2,
    icon: Heart,
    color: "from-pink-400 to-pink-600"
  },
  {
    id: "journal",
    title: "Quick Journal",
    description: "Write about what's on your mind or what you're grateful for",
    duration: 3,
    icon: BookOpen,
    color: "from-blue-400 to-blue-600"
  },
  {
    id: "ai-chat",
    title: "AI Coaching",
    description: "Chat with your AI companion for support and guidance",
    duration: 2,
    icon: MessageCircle,
    color: "from-purple-400 to-purple-600"
  },
  {
    id: "breathing",
    title: "Calming Activity",
    description: "Practice a guided breathing exercise or mindfulness",
    duration: 1,
    icon: Wind,
    color: "from-green-400 to-green-600"
  }
];

export default function SessionPage() {
  const [session, setSession] = useState<EightMinuteSession | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stepData, setStepData] = useState<any>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = sessionSteps[currentStepIndex];
  const totalTime = sessionSteps.reduce((sum, step) => sum + step.duration, 0);

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            handleStepComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeRemaining]);

  const startSession = async () => {
    setIsLoading(true);
    try {
      const response = await sessionApi.startSession();
      if (response.success && response.data) {
        setSession(response.data);
        setTimeRemaining(currentStep.duration * 60);
        setIsActive(true);
        toast.success("Session started! Take your time with each step.");
      } else {
        toast.error(response.message || "Failed to start session");
      }
    } catch (error) {
      console.error("Error starting session:", error);
      toast.error("Failed to start session");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepComplete = async () => {
    if (!session) return;

    // Save step data
    try {
      await sessionApi.updateSessionStep(session.id, currentStep.id, stepData);
    } catch (error) {
      console.error("Error saving step data:", error);
    }

    // Move to next step
    if (currentStepIndex < sessionSteps.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
      setTimeRemaining(sessionSteps[nextStepIndex].duration * 60);
      setStepData({});
    } else {
      // Session completed
      await completeSession();
    }
  };

  const completeSession = async () => {
    if (!session) return;

    try {
      const response = await sessionApi.completeSession(session.id);
      if (response.success) {
        setIsCompleted(true);
        setIsActive(false);
        toast.success("Great job! You've completed your 8-minute session.");
      }
    } catch (error) {
      console.error("Error completing session:", error);
    }
  };

  const pauseSession = () => {
    setIsActive(false);
  };

  const resumeSession = () => {
    setIsActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const completedTime = sessionSteps.slice(0, currentStepIndex).reduce((sum, step) => sum + step.duration, 0);
    const currentStepProgress = (currentStep.duration * 60 - timeRemaining) / (currentStep.duration * 60);
    return ((completedTime + (currentStep.duration * currentStepProgress)) / totalTime) * 100;
  };

  if (isCompleted) {
    return (
      <ProtectedLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-light text-deep-forest mb-4">
            Session Complete! 🎉
          </h1>
          <p className="text-gentle-gray text-lg mb-8">
            You've taken 8 minutes to focus on your emotional well-being. 
            How do you feel now?
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setSession(null);
                setCurrentStepIndex(0);
                setTimeRemaining(0);
                setIsCompleted(false);
                setStepData({});
              }}
              className="w-full py-3 px-6 bg-primary-sage text-white rounded-xl hover:bg-primary-sage/90 transition-colors font-medium"
            >
              Start Another Session
            </button>
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="w-full py-3 px-6 text-gentle-gray hover:text-deep-forest transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  if (!session) {
    return (
      <ProtectedLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-16 h-16 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-primary-sage" />
          </div>
          <h1 className="text-3xl font-light text-deep-forest mb-4">
            8-Minute Companion Session
          </h1>
          <p className="text-gentle-gray text-lg mb-8">
            A guided journey through mood check-in, journaling, AI coaching, and calming activities.
          </p>

          <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-sage/20 mb-8">
            <h2 className="text-xl font-medium text-deep-forest mb-6">What to Expect</h2>
            <div className="space-y-4">
              {sessionSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-semibold`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-primary-sage" />
                        <h3 className="font-medium text-deep-forest">{step.title}</h3>
                        <span className="text-sm text-gentle-gray">{step.duration} min</span>
                      </div>
                      <p className="text-sm text-gentle-gray mt-1">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={startSession}
            disabled={isLoading}
            className={`
              flex items-center space-x-3 px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-200 mx-auto
              ${isLoading
                ? "bg-gentle-gray/20 text-gentle-gray cursor-not-allowed"
                : "bg-gradient-to-r from-primary-sage to-calm-blue text-white hover:from-primary-sage/90 hover:to-calm-blue/90 shadow-lg hover:shadow-xl"
              }
            `}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Starting Session...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Start 8-Minute Session</span>
              </>
            )}
          </button>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Bar */}
        <div className="bg-soft-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-sage/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-medium text-deep-forest">8-Minute Session</h1>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary-sage" />
              <span className="text-sm text-gentle-gray">
                {formatTime(timeRemaining)} remaining
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-primary-sage to-calm-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gentle-gray">
            <span>Step {currentStepIndex + 1} of {sessionSteps.length}</span>
            <span>{Math.round(getProgress())}% complete</span>
          </div>
        </div>

        {/* Current Step */}
        <div className={`bg-gradient-to-r ${currentStep.color} rounded-2xl p-8 text-white`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <currentStep.icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{currentStep.title}</h2>
              <p className="text-white/90">{currentStep.description}</p>
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep.id === "mood-check" && (
              <MoodCheckStep data={stepData} setData={setStepData} />
            )}
            
            {currentStep.id === "journal" && (
              <JournalStep data={stepData} setData={setStepData} />
            )}
            
            {currentStep.id === "ai-chat" && (
              <AIChatStep data={stepData} setData={setStepData} />
            )}
            
            {currentStep.id === "breathing" && (
              <BreathingStep data={stepData} setData={setStepData} />
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            {isActive ? (
              <button
                onClick={pauseSession}
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            ) : (
              <button
                onClick={resumeSession}
                className="flex items-center space-x-2 px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Resume</span>
              </button>
            )}
            
            <button
              onClick={handleStepComplete}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-800 rounded-xl hover:bg-white/90 transition-colors font-medium"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Next Step</span>
            </button>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}

// Step Components
function MoodCheckStep({ data, setData }: { data: any; setData: (data: any) => void }) {
  const [mood, setMood] = useState(data.mood || 5);

  const handleMoodChange = (value: number) => {
    setMood(value);
    setData({ ...data, mood: value });
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return "😊";
    if (mood >= 6) return "🙂";
    if (mood >= 4) return "😐";
    if (mood >= 2) return "😔";
    return "😢";
  };

  return (
    <div className="text-center">
      <div className="text-6xl mb-4">{getMoodEmoji(mood)}</div>
      <div className="text-2xl font-semibold mb-4">{mood}/10</div>
      <input
        type="range"
        min="1"
        max="10"
        value={mood}
        onChange={(e) => handleMoodChange(parseInt(e.target.value))}
        className="w-full max-w-md mx-auto"
      />
      <p className="text-white/80 text-sm mt-4">
        How are you feeling right now? Take a moment to check in with yourself.
      </p>
    </div>
  );
}

function JournalStep({ data, setData }: { data: any; setData: (data: any) => void }) {
  const [content, setContent] = useState(data.content || "");

  const handleContentChange = (value: string) => {
    setContent(value);
    setData({ ...data, content: value });
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="What's on your mind? What are you grateful for? What's challenging you right now?"
        className="w-full h-32 p-4 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white/50 focus:outline-none resize-none"
      />
      <p className="text-white/80 text-sm mt-2">
        Write freely about your thoughts and feelings. There's no right or wrong way to journal.
      </p>
    </div>
  );
}

function AIChatStep({ data, setData }: { data: any; setData: (data: any) => void }) {
  const [message, setMessage] = useState(data.message || "");

  const handleMessageChange = (value: string) => {
    setMessage(value);
    setData({ ...data, message: value });
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => handleMessageChange(e.target.value)}
        placeholder="What would you like to talk about? I'm here to listen and support you."
        className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white/50 focus:outline-none"
      />
      <p className="text-white/80 text-sm mt-2">
        Your AI companion is here to provide support and guidance. Share what's on your mind.
      </p>
    </div>
  );
}

function BreathingStep({ data, setData }: { data: any; setData: (data: any) => void }) {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathCount(0);
    setData({ ...data, breathingCompleted: true });
  };

  return (
    <div className="text-center">
      {!isBreathing ? (
        <div>
          <div className="text-6xl mb-4">🌬️</div>
          <h3 className="text-xl font-semibold mb-4">4-7-8 Breathing Exercise</h3>
          <p className="text-white/80 mb-6">
            Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. 
            This simple technique can help calm your nervous system.
          </p>
          <button
            onClick={startBreathing}
            className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
          >
            Start Breathing Exercise
          </button>
        </div>
      ) : (
        <div>
          <div className="text-8xl mb-4 animate-pulse">🌬️</div>
          <h3 className="text-xl font-semibold mb-4">Breathe with me</h3>
          <p className="text-white/80">
            Focus on your breath. Inhale slowly... hold... exhale slowly...
          </p>
        </div>
      )}
    </div>
  );
}
