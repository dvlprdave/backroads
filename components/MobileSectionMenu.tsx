"use client";

import { useState, useEffect } from "react";

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface MobileSectionMenuProps {
  sections: Section[];
}

export default function MobileSectionMenu({ sections }: MobileSectionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      {/* Menu Button */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6 text-slate-900 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-slate-900 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Menu Panel */}
      <div
        className={`absolute bottom-0 left-0 right-0 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-t border-white/20 dark:border-white/10 shadow-2xl transition-transform duration-300 ease-out pointer-events-auto ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          maxHeight: "70vh",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
        }}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
        </div>

        {/* Menu Title */}
        <div className="px-6 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Jump to Section
          </h3>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(70vh - 80px)" }}>
          <nav className="py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors duration-200 ${
                  activeSection === section.id
                    ? "bg-blue-500/10 dark:bg-blue-500/20 border-l-4 border-blue-500"
                    : "hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <div
                  className={`flex-shrink-0 ${
                    activeSection === section.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {section.icon}
                </div>
                <span
                  className={`font-medium ${
                    activeSection === section.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 pointer-events-auto"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

