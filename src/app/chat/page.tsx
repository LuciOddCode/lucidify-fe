"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Bot, User, RotateCcw } from "lucide-react";
import { chatApi } from "../lib/api";
import { ChatMessage, ChatSession } from "../lib/types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ProtectedLayout from "../components/ProtectedLayout";
import { useAuth } from "../lib/auth-context";
import toast from "react-hot-toast";

const quickReplies = [
  "I'm feeling anxious",
  "I need help with stress",
  "I want to talk about my day",
  "Can you suggest a breathing exercise?",
  "I'm feeling overwhelmed",
  "I need encouragement",
];

export default function ChatPage() {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchSessions = async () => {
    try {
      const response = await chatApi.getChatSessions();
      if (response.success && response.data) {
        setSessions(response.data);
        if (response.data.length > 0) {
          const latestSession = response.data[0];
          setCurrentSessionId(latestSession.id);
          fetchMessages(latestSession.id);
        }
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      const response = await chatApi.getChatHistory(sessionId);
      if (response.success && response.data) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    // Check authentication status
    console.log("Auth status:", { user, isAuthenticated });
    const token = localStorage.getItem("token");
    console.log("Token exists:", !!token);
    console.log("Token value:", token ? "Present" : "Missing");

    if (!isAuthenticated || !token) {
      toast.error("Please log in to use the AI companion");
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: "current-user",
      content: messageText.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
      sessionId: currentSessionId || "new-session",
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(
        messageText.trim(),
        currentSessionId || undefined
      );

      if (response.success && response.data) {
        // Handle nested response structure from backend
        const aiMessage = response.data.message || response.data;
        console.log("AI Response:", response.data);
        console.log("AI Message:", aiMessage);

        // Ensure the AI message has all required fields
        const formattedAiMessage: ChatMessage = {
          id: aiMessage.id || Date.now().toString(),
          userId: aiMessage.userId || "ai-companion",
          content: aiMessage.content || "",
          isUser: false,
          timestamp: aiMessage.timestamp || new Date().toISOString(),
          sessionId: response.data.sessionId || currentSessionId || "unknown",
          suggestions: aiMessage.suggestions || [],
        };

        setMessages((prev) => [...prev, formattedAiMessage]);
        if (!currentSessionId) {
          setCurrentSessionId(response.data.sessionId);
        }
      } else {
        toast.error(response.message || "Failed to send message");
        // Remove the user message if sending failed
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
      // Remove the user message if sending failed
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(currentMessage);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const startNewSession = () => {
    setCurrentSessionId(null);
    setMessages([]);
  };

  const formatTime = (timestamp: string) => {
    console.log("Formatting timestamp:", timestamp);
    const date = new Date(timestamp);
    console.log("Parsed date:", date);
    if (isNaN(date.getTime())) {
      console.error("Invalid timestamp:", timestamp);
      return "Invalid Date";
    }
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoadingSessions) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner size="lg" className="text-primary-sage mb-4" />
            <p className="text-gentle-gray">Loading your conversations...</p>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gentle-gray/50 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-deep-forest mb-2">
              Authentication Required
            </h2>
            <p className="text-gentle-gray">
              Please log in to access the AI companion.
            </p>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-soft-white/80 backdrop-blur-sm border-b border-primary-sage/20 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-sage/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-sage" />
              </div>
              <div>
                <h1 className="text-xl font-medium text-deep-forest">
                  AI Companion
                </h1>
                <p className="text-sm text-gentle-gray">
                  Your empathetic support companion
                </p>
              </div>
            </div>
            <button
              onClick={startNewSession}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-primary-sage hover:text-primary-sage/80 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-soft-white/50 to-warm-cream/30">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-primary-sage" />
              </div>
              <h3 className="text-lg font-medium text-deep-forest mb-2">
                Welcome to your AI Companion
              </h3>
              <p className="text-gentle-gray mb-6">
                I'm here to listen, support, and help you navigate your
                emotions. How are you feeling today?
              </p>

              {/* Quick Replies */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-4 py-2 bg-soft-white text-deep-forest rounded-xl border border-primary-sage/20 hover:border-primary-sage/40 hover:bg-primary-sage/5 transition-all duration-200 text-sm"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl
                    ${
                      message.isUser
                        ? "bg-primary-sage text-white rounded-br-md"
                        : "bg-soft-white text-deep-forest border border-primary-sage/20 rounded-bl-md"
                    }
                  `}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && (
                      <div className="w-6 h-6 bg-primary-sage/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-primary-sage" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.isUser ? "text-white/70" : "text-gentle-gray"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    {message.isUser && (
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-soft-white text-deep-forest border border-primary-sage/20 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary-sage/10 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-primary-sage" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-sage rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary-sage rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary-sage rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-soft-white/80 backdrop-blur-sm border-t border-primary-sage/20 p-6 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-xl border border-primary-sage/20 bg-soft-white focus:border-primary-sage focus:ring-4 focus:ring-primary-sage/20 focus:outline-none text-deep-forest placeholder-gentle-gray/60"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !currentMessage.trim()}
              className={`
                px-6 py-3 rounded-xl font-medium transition-all duration-200
                ${
                  isLoading || !currentMessage.trim()
                    ? "bg-gentle-gray/20 text-gentle-gray cursor-not-allowed"
                    : "bg-primary-sage text-white hover:bg-primary-sage/90"
                }
              `}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </ProtectedLayout>
  );
}
