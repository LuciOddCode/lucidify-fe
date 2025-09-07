"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  Home, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  Lightbulb, 
  BarChart3, 
  Clock, 
  Settings, 
  Menu, 
  X,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "../lib/auth-context";
import { getTranslation } from "../lib/i18n";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, language } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/pages/loginPage");
  };

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/mood", label: "Mood Check-In", icon: Heart },
    { href: "/journal", label: "Journal", icon: BookOpen },
    { href: "/chat", label: "AI Companion", icon: MessageCircle },
    { href: "/coping", label: "Coping Strategies", icon: Lightbulb },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/session", label: "8-Minute Session", icon: Clock },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-soft-white/90 backdrop-blur-sm border border-primary-sage/20"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-64 bg-soft-white/95 backdrop-blur-md border-r border-primary-sage/20 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary-sage/10">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-sage/10 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-sage" />
              </div>
              <span className="text-xl font-light text-deep-forest">
                Lucidify
              </span>
            </Link>
          </div>

          {/* Navigation items */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive(item.href)
                      ? "bg-primary-sage/10 text-primary-sage border border-primary-sage/20"
                      : "text-gentle-gray hover:bg-primary-sage/5 hover:text-deep-forest"
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User section */}
          <div className="p-4 border-t border-primary-sage/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-sage/10 rounded-full flex items-center justify-center">
                <User size={16} className="text-primary-sage" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-deep-forest truncate">
                  {user?.name || user?.email}
                </p>
                <p className="text-xs text-gentle-gray">Online</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gentle-gray hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">{getTranslation(language, "signOut")}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
