import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-deep-forest/5 to-primary-sage/5 border-t border-primary-sage/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary-sage/10 p-2 rounded-full mr-3">
              <Heart className="h-5 w-5 text-primary-sage" />
            </div>
            <span className="text-2xl font-light text-deep-forest">
              Lucidify
            </span>
          </div>

          {/* Mission Statement */}
          <p className="text-gentle-gray mb-6 max-w-2xl mx-auto leading-relaxed">
            Supporting the emotional well-being of young adults in Sri Lanka
            with compassionate, culturally-sensitive mental health tools.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a
              href="/privacy"
              className="text-gentle-gray hover:text-primary-sage transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gentle-gray hover:text-primary-sage transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="/support"
              className="text-gentle-gray hover:text-primary-sage transition-colors duration-200"
            >
              Support
            </a>
            <a
              href="/about"
              className="text-gentle-gray hover:text-primary-sage transition-colors duration-200"
            >
              About Us
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-primary-sage/10 pt-6">
            <p className="text-gentle-gray/80 text-sm">
              &copy; 2025 Lucidify. Made with care for mental wellness in Sri
              Lanka. 🇱🇰
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
