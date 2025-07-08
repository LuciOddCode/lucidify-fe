"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Heart, UserPlus, Shield } from "lucide-react";
import { signupSchema, SignupFormData } from "../../lib/validation";
import { FormInput } from "../../components/FormInput";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { LanguageSelector } from "../../components/LanguageSelector";
import { useAuth } from "../../lib/auth-context";
import { getTranslation, getValidationMessage } from "../../lib/i18n";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { signup, loginWithGoogle, isAuthenticated, language } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  // Watch password for real-time validation feedback
  const password = watch("password");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await signup(
        data.email,
        data.password,
        data.confirmPassword
      );

      if (result.success) {
        setSuccessMessage(getTranslation(language, "signupSuccess"));
        // Redirect to login page after successful signup
        setTimeout(() => {
          router.push("/pages/loginPage");
        }, 2000);
      } else {
        // Handle specific error cases
        if (result.message.includes("email")) {
          setError("email", {
            message: getValidationMessage(language, result.message),
          });
        } else if (result.message.includes("password")) {
          setError("password", {
            message: getValidationMessage(language, result.message),
          });
        } else {
          setErrorMessage(result.message);
        }
      }
    } catch (error) {
      setErrorMessage(getTranslation(language, "networkError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await loginWithGoogle();

      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(getTranslation(language, "networkError"));
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ];

    strength = checks.filter(Boolean).length;

    const strengthLabels = {
      en: ["Very Weak", "Weak", "Fair", "Good", "Strong"],
      si: ["ඉතා දුර්වල", "දුර්වල", "සාමාන්‍ය", "හොඳ", "ශක්තිමත්"],
      ta: ["மிக பலவீனம்", "பலவீனம்", "சாதாரண", "நல்ல", "வலுவான"],
    };

    return {
      strength: (strength / 5) * 100,
      label: strengthLabels[language][strength - 1] || "",
      color:
        strength <= 1
          ? "red"
          : strength <= 2
          ? "orange"
          : strength <= 3
          ? "yellow"
          : "green",
    };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="flex flex-auto justify-center items-center w-screen min-h-screen bg-gradient-to-br from-soft-white via-warm-cream to-soft-white py-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-40 h-40 bg-soft-lavender rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-serene-teal rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-56 h-56 bg-primary-sage rounded-full blur-3xl"></div>
      </div>

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      <div className="relative w-full max-w-lg mx-4 z-10">
        {/* Modern therapeutic card */}
        <div className="relative drop-shadow-xl overflow-hidden rounded-3xl bg-soft-white/90 backdrop-blur-md border border-primary-sage/10">
          <div className="relative z-10 p-8">
            {/* Header with logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary-sage/10 p-3 rounded-full mr-3">
                  <Heart className="h-6 w-6 text-primary-sage" />
                </div>
                <h1 className="text-2xl font-light text-deep-forest">
                  Lucidify
                </h1>
              </div>
              <h2 className="text-2xl font-light text-deep-forest mb-2">
                {getTranslation(language, "createAccount")}
              </h2>
              <p className="text-gentle-gray text-sm leading-relaxed">
                {getTranslation(language, "fillDetails")}
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div
                className="mb-6 p-4 bg-green-100 border border-green-200 rounded-2xl text-green-700 text-sm flex items-center"
                role="alert"
                aria-live="polite"
              >
                <Shield className="h-5 w-5 mr-3 text-green-600 flex-shrink-0" />
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div
                className="mb-6 p-4 bg-red-100 border border-red-200 rounded-2xl text-red-700 text-sm"
                role="alert"
                aria-live="polite"
              >
                {errorMessage}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                label={getTranslation(language, "email")}
                type="email"
                placeholder="Enter your email"
                error={
                  errors.email
                    ? getValidationMessage(language, errors.email.message!)
                    : undefined
                }
                loading={isLoading}
                {...register("email")}
              />

              <div>
                <FormInput
                  label={getTranslation(language, "password")}
                  type="password"
                  placeholder="Create a strong password"
                  showPasswordToggle
                  isPasswordVisible={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  error={
                    errors.password
                      ? getValidationMessage(language, errors.password.message!)
                      : undefined
                  }
                  loading={isLoading}
                  {...register("password")}
                />

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-3 p-3 bg-warm-cream/50 rounded-xl">
                    <div className="flex justify-between text-xs text-gentle-gray mb-2">
                      <span>Password Strength</span>
                      <span className="font-medium">
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gentle-gray/20 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          passwordStrength.color === "red"
                            ? "bg-red-400"
                            : passwordStrength.color === "orange"
                            ? "bg-orange-400"
                            : passwordStrength.color === "yellow"
                            ? "bg-yellow-400"
                            : "bg-primary-sage"
                        }`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <FormInput
                label={getTranslation(language, "confirmPassword")}
                type="password"
                placeholder="Confirm your password"
                showPasswordToggle
                isPasswordVisible={showConfirmPassword}
                onTogglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                error={
                  errors.confirmPassword
                    ? getValidationMessage(
                        language,
                        errors.confirmPassword.message!
                      )
                    : undefined
                }
                loading={isLoading}
                {...register("confirmPassword")}
              />

              {/* Terms and Conditions */}
              <div className="text-sm text-gentle-gray bg-warm-cream/30 p-4 rounded-2xl">
                <p className="leading-relaxed">
                  By signing up, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-primary-sage hover:text-primary-sage/80 transition-colors font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary-sage hover:text-primary-sage/80 transition-colors font-medium"
                  >
                    Privacy Policy
                  </Link>
                  . Your privacy and security are our top priorities.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-4 bg-primary-sage hover:bg-primary-sage/90 disabled:bg-primary-sage/60 disabled:cursor-not-allowed text-white rounded-2xl font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label={
                  isLoading
                    ? getTranslation(language, "signingUp")
                    : getTranslation(language, "signUp")
                }
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    {getTranslation(language, "signingUp")}
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    {getTranslation(language, "signUp")}
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-primary-sage/20"></div>
              <span className="px-4 text-sm text-gentle-gray">or</span>
              <div className="flex-1 border-t border-primary-sage/20"></div>
            </div>

            {/* Google Signup Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full py-4 px-4 bg-soft-white border-2 border-primary-sage/20 hover:border-primary-sage/40 text-deep-forest rounded-2xl font-medium transition-all duration-300 flex items-center justify-center hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gentle-gray text-sm">
                {getTranslation(language, "haveAccount")}{" "}
                <Link
                  href="/pages/loginPage"
                  className="text-primary-sage hover:text-primary-sage/80 transition-colors font-medium"
                >
                  {getTranslation(language, "signIn")}
                </Link>
              </p>
            </div>
          </div>

          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-32 h-32 bg-soft-lavender rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-primary-sage rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 right-8 w-16 h-16 bg-serene-teal rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
