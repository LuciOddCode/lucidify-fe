"use client";

import React, { useState, useEffect } from "react";
import { Lightbulb, Clock, Star, Filter, Heart, Brain, Sun, Wind, Shield } from "lucide-react";
import { copingApi } from "../lib/api";
import { CopingStrategy } from "../lib/types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ProtectedLayout from "../components/ProtectedLayout";
import toast from "react-hot-toast";

const strategyTypes = [
  { id: "all", label: "All", icon: Lightbulb },
  { id: "mindfulness", label: "Mindfulness", icon: Brain },
  { id: "breathing", label: "Breathing", icon: Wind },
  { id: "cbt", label: "CBT", icon: Heart },
  { id: "gratitude", label: "Gratitude", icon: Sun },
  { id: "grounding", label: "Grounding", icon: Shield }
];

export default function CopingPage() {
  const [strategies, setStrategies] = useState<CopingStrategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null);

  useEffect(() => {
    fetchStrategies();
  }, [selectedType]);

  const fetchStrategies = async () => {
    setIsLoading(true);
    try {
      const response = await copingApi.getStrategies(selectedType === "all" ? undefined : selectedType);
      if (response.success && response.data) {
        setStrategies(response.data);
      } else {
        toast.error(response.message || "Failed to load coping strategies");
      }
    } catch (error) {
      console.error("Error fetching strategies:", error);
      toast.error("Failed to load coping strategies");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRateStrategy = async (strategyId: string, rating: number) => {
    try {
      const response = await copingApi.rateStrategy(strategyId, rating);
      if (response.success) {
        toast.success("Thank you for your feedback!");
        // Update the strategy in the local state
        setStrategies(prev => prev.map(strategy => 
          strategy.id === strategyId 
            ? { ...strategy, rating }
            : strategy
        ));
      } else {
        toast.error(response.message || "Failed to rate strategy");
      }
    } catch (error) {
      console.error("Error rating strategy:", error);
      toast.error("Failed to rate strategy");
    }
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = strategyTypes.find(t => t.id === type);
    return typeConfig ? typeConfig.icon : Lightbulb;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      mindfulness: "from-purple-400 to-purple-600",
      breathing: "from-blue-400 to-blue-600",
      cbt: "from-pink-400 to-pink-600",
      gratitude: "from-yellow-400 to-orange-500",
      grounding: "from-green-400 to-green-600"
    };
    return colors[type as keyof typeof colors] || "from-primary-sage to-calm-blue";
  };

  const renderStars = (rating: number, onRate: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(star)}
            className="transition-colors duration-200"
          >
            <Star
              className={`w-4 h-4 ${
                star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner size="lg" className="text-primary-sage mb-4" />
            <p className="text-gentle-gray">Loading coping strategies...</p>
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
            <Lightbulb className="w-8 h-8 text-primary-sage" />
          </div>
          <h1 className="text-3xl font-light text-deep-forest mb-2">
            Coping Strategies
          </h1>
          <p className="text-gentle-gray">
            Personalized techniques to help you manage stress and emotions
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {strategyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
                  ${selectedType === type.id
                    ? "bg-primary-sage text-white"
                    : "bg-soft-white text-gentle-gray border border-primary-sage/20 hover:border-primary-sage/40 hover:text-deep-forest"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Strategies Grid */}
        {strategies.length === 0 ? (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-gentle-gray/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gentle-gray mb-2">No strategies found</h3>
            <p className="text-gentle-gray">Try selecting a different category or check back later for new strategies.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy) => {
              const TypeIcon = getTypeIcon(strategy.type);
              const isExpanded = expandedStrategy === strategy.id;
              
              return (
                <div
                  key={strategy.id}
                  className="bg-soft-white/80 backdrop-blur-sm rounded-2xl border border-primary-sage/20 hover:border-primary-sage/40 transition-all duration-200 overflow-hidden"
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${getTypeColor(strategy.type)} p-6 text-white`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{strategy.title}</h3>
                          <div className="flex items-center space-x-2 text-sm opacity-90">
                            <Clock className="w-4 h-4" />
                            <span>{strategy.duration} min</span>
                          </div>
                        </div>
                      </div>
                      {strategy.personalized && (
                        <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                          AI Recommended
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm opacity-90 leading-relaxed">
                      {strategy.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {isExpanded ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-deep-forest mb-3">Steps:</h4>
                          <ol className="space-y-2">
                            {strategy.steps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-3 text-sm text-gentle-gray">
                                <span className="w-6 h-6 bg-primary-sage/10 text-primary-sage rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Rating */}
                        <div className="pt-4 border-t border-primary-sage/10">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-deep-forest">
                              How helpful was this?
                            </span>
                            {renderStars(strategy.rating || 0, (rating) => 
                              handleRateStrategy(strategy.id, rating)
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gentle-gray">
                            {strategy.steps.length} steps
                          </span>
                          {strategy.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gentle-gray">
                                {strategy.rating}/5
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => setExpandedStrategy(strategy.id)}
                          className="w-full py-2 px-4 bg-primary-sage/10 text-primary-sage rounded-xl hover:bg-primary-sage/20 transition-colors text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    )}

                    {isExpanded && (
                      <button
                        onClick={() => setExpandedStrategy(null)}
                        className="w-full mt-4 py-2 px-4 text-gentle-gray hover:text-deep-forest transition-colors text-sm"
                      >
                        Show Less
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tips */}
        <div className="bg-gradient-to-r from-soft-lavender/10 to-primary-sage/10 rounded-2xl p-6 border border-soft-lavender/20">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-soft-lavender mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-deep-forest mb-2">Tips for Using Coping Strategies</h3>
              <ul className="text-sm text-gentle-gray space-y-1">
                <li>• Try different strategies to find what works best for you</li>
                <li>• Practice regularly, even when you're feeling good</li>
                <li>• Rate strategies to help us personalize recommendations</li>
                <li>• Combine multiple strategies for better results</li>
                <li>• Be patient with yourself - it takes time to develop new habits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
