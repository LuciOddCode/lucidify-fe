"use client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { useRouter } from "next/navigation";
import { useAuth } from "./lib/auth-context";
import { useEffect } from "react";
import { Heart, Brain, Moon, Sparkles } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-white via-warm-cream to-soft-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-primary-sage animate-pulse" />
          </div>
          <p className="text-gentle-gray">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-white via-warm-cream to-soft-white text-deep-forest font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-sage rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-soft-lavender rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-serene-teal rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-primary-sage/10 p-4 rounded-full mr-4">
                <Heart className="h-8 w-8 text-primary-sage" />
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-deep-forest">
                Lucidify
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-gentle-gray mb-4 max-w-4xl mx-auto leading-relaxed">
              Your gentle companion for emotional well-being
            </p>

            <p className="text-lg text-gentle-gray/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Take just 8 minutes a day to nurture your mental health with
              mindful check-ins, AI-powered support, and personal reflections.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => router.push("/pages/loginPage")}
              className="group bg-primary-sage hover:bg-primary-sage/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="flex items-center">
                Begin Your Journey
                <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-soft-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-deep-forest mb-4">
              Gentle tools for your emotional journey
            </h2>
            <p className="text-lg text-gentle-gray max-w-2xl mx-auto">
              Designed with care for young adults seeking balance and peace in
              their daily lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Mood Check-In */}
            <div className="group text-center">
              <div className="bg-gradient-to-br from-calm-blue/10 to-calm-blue/5 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 border border-calm-blue/10">
                <div className="bg-calm-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-calm-blue" />
                </div>
                <h3 className="text-xl font-medium text-deep-forest mb-4">
                  Daily Check-ins
                </h3>
                <p className="text-gentle-gray leading-relaxed">
                  Gentle prompts to help you understand and track your emotional
                  patterns with compassionate insights.
                </p>
              </div>
            </div>

            {/* AI Companion */}
            <div className="group text-center">
              <div className="bg-gradient-to-br from-primary-sage/10 to-primary-sage/5 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 border border-primary-sage/10">
                <div className="bg-primary-sage/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-primary-sage" />
                </div>
                <h3 className="text-xl font-medium text-deep-forest mb-4">
                  AI Companion
                </h3>
                <p className="text-gentle-gray leading-relaxed">
                  A thoughtful AI friend that listens without judgment and
                  offers personalized coping strategies.
                </p>
              </div>
            </div>

            {/* Mindful Moments */}
            <div className="group text-center">
              <div className="bg-gradient-to-br from-soft-lavender/10 to-soft-lavender/5 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 border border-soft-lavender/10">
                <div className="bg-soft-lavender/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Moon className="h-8 w-8 text-soft-lavender" />
                </div>
                <h3 className="text-xl font-medium text-deep-forest mb-4">
                  Mindful Moments
                </h3>
                <p className="text-gentle-gray leading-relaxed">
                  Private journaling space for reflection, gratitude, and
                  personal growth in a safe environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-deep-forest mb-8">
            Built with care for Sri Lankan youth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-warm-cream/50 p-8 rounded-2xl border border-primary-sage/10">
              <h3 className="text-lg font-medium text-deep-forest mb-3">
                Cultural Understanding
              </h3>
              <p className="text-gentle-gray">
                Available in Sinhala, Tamil, and English with culturally
                sensitive support.
              </p>
            </div>
            <div className="bg-warm-cream/50 p-8 rounded-2xl border border-serene-teal/10">
              <h3 className="text-lg font-medium text-deep-forest mb-3">
                Privacy First
              </h3>
              <p className="text-gentle-gray">
                Your thoughts and feelings are protected with end-to-end
                encryption.
              </p>
            </div>
            <div className="bg-warm-cream/50 p-8 rounded-2xl border border-calm-blue/10">
              <h3 className="text-lg font-medium text-deep-forest mb-3">
                Accessible Design
              </h3>
              <p className="text-gentle-gray">
                Works seamlessly on any device, even with limited internet
                connectivity.
              </p>
            </div>
            <div className="bg-warm-cream/50 p-8 rounded-2xl border border-soft-lavender/10">
              <h3 className="text-lg font-medium text-deep-forest mb-3">
                Affordable Care
              </h3>
              <p className="text-gentle-gray">
                Mental health support that's accessible to everyone, regardless
                of income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-sage/5 via-serene-teal/5 to-soft-lavender/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-deep-forest mb-6">
            Ready to begin your wellness journey?
          </h2>
          <p className="text-lg text-gentle-gray mb-8 leading-relaxed">
            Join a growing community of young adults prioritizing their mental
            health and emotional well-being.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button
              onClick={() => router.push("/pages/signupPage")}
              className="w-full sm:w-auto bg-primary-sage hover:bg-primary-sage/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Create Free Account
            </button>
            <button
              onClick={() => router.push("/pages/loginPage")}
              className="w-full sm:w-auto bg-transparent border-2 border-primary-sage text-primary-sage hover:bg-primary-sage hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
