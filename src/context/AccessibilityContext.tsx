import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations } from '../locales/types';
import { translations } from '../locales/i18n';

type TextSize = 'sm' | 'base' | 'lg' | 'xl';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  toggleHighContrast: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  screenReaderAnnouncement: string;
  announceToScreenReader: (msg: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>('base');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState<string>('');

  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'sm') root.style.setProperty('--font-scale', '0.875rem');
    else if (textSize === 'base') root.style.setProperty('--font-scale', '1rem');
    else if (textSize === 'lg') root.style.setProperty('--font-scale', '1.125rem');
    else if (textSize === 'xl') root.style.setProperty('--font-scale', '1.25rem');
  }, [textSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);

  const announceToScreenReader = (msg: string) => {
    setScreenReaderAnnouncement(msg);
  };

  const t = translations[language];

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        language,
        setLanguage,
        t,
        screenReaderAnnouncement,
        announceToScreenReader,
      }}
    >
      {/* Aria-live region for screen readers */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
        id="a11y-status-announcer"
      >
        {screenReaderAnnouncement}
      </div>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
