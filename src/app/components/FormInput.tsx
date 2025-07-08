"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
  loading?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      showPasswordToggle = false,
      isPasswordVisible = false,
      onTogglePassword,
      loading = false,
      className = "",
      id,
      type,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = `${inputId}-error`;

    return (
      <div className="mb-4">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-3 text-deep-forest"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={
              showPasswordToggle
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : type
            }
            className={`
              w-full p-4 rounded-2xl border transition-all duration-200
              ${
                error
                  ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-400/20"
                  : "border-primary-sage/20 bg-soft-white focus:border-primary-sage focus:ring-primary-sage/20"
              }
              focus:outline-none focus:ring-4
              disabled:opacity-50 disabled:cursor-not-allowed
              text-deep-forest placeholder-gentle-gray/60
              ${className}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : undefined}
            disabled={loading}
            {...props}
          />

          {showPasswordToggle && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gentle-gray hover:text-primary-sage focus:outline-none focus:text-primary-sage disabled:opacity-50 transition-colors duration-200"
              disabled={loading}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {error && (
          <div
            id={errorId}
            className="mt-2 flex items-center text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
