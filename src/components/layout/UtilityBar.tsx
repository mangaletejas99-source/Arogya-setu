import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Language } from '../../locales/types';
import { Eye, Volume2, Globe, HelpCircle, FileText, PhoneCall } from 'lucide-react';

export const UtilityBar: React.FC = () => {
  const {
    textSize,
    setTextSize,
    highContrast,
    toggleHighContrast,
    language,
    setLanguage,
    t,
    announceToScreenReader
  } = useAccessibility();

  const handleTextSize = (size: 'sm' | 'base' | 'lg' | 'xl') => {
    setTextSize(size);
    announceToScreenReader(`Font size changed to ${size}`);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
    announceToScreenReader(`Language switched to ${lang === 'mr' ? 'Marathi' : lang === 'hi' ? 'Hindi' : 'English'}`);
  };

  return (
    <aside aria-label="Accessibility and Utility Bar" className="bg-[#07243B] text-slate-200 text-xs border-b border-slate-700 py-1 px-4 utility-bar">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Skip to Main and Screen Reader */}
        <div className="flex items-center gap-3">
          <a href="#main-content" className="skip-link font-medium">
            {t.skipToMain}
          </a>
          
          <button
            onClick={() => announceToScreenReader("Arogya Setu Demonstration Platform. Screen reader support active.")}
            className="flex items-center gap-1 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-gov-saffron px-1 py-0.5"
            title={t.screenReader}
          >
            <Volume2 className="w-3.5 h-3.5 text-gov-saffron" />
            <span className="hidden sm:inline">{t.screenReader}</span>
          </button>

          <span className="text-slate-500 hidden sm:inline">|</span>

          {/* Prototype disclaimer pill */}
          <span className="inline-flex items-center bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-400/30">
            PROTOTYPE / DEMO
          </span>
        </div>

        {/* Right: Accessibility controls, Language, Links */}
        <div className="flex items-center gap-3">
          {/* Text Zoom Controls */}
          <div className="flex items-center gap-1 border-r border-slate-700 pr-2">
            <span className="text-[11px] text-slate-400 mr-1 hidden md:inline">Font:</span>
            <button
              onClick={() => handleTextSize('sm')}
              className={`px-1.5 py-0.5 rounded text-xs font-semibold ${textSize === 'sm' ? 'bg-slate-700 text-white' : 'hover:bg-slate-800'}`}
              title="Smaller Text (A-)"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => handleTextSize('base')}
              className={`px-1.5 py-0.5 rounded text-xs font-semibold ${textSize === 'base' ? 'bg-slate-700 text-white' : 'hover:bg-slate-800'}`}
              title="Default Text (A)"
              aria-label="Default Font Size"
            >
              A
            </button>
            <button
              onClick={() => handleTextSize('lg')}
              className={`px-1.5 py-0.5 rounded text-xs font-semibold ${textSize === 'lg' ? 'bg-slate-700 text-white' : 'hover:bg-slate-800'}`}
              title="Larger Text (A+)"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
              highContrast ? 'bg-yellow-400 text-black font-bold' : 'hover:bg-slate-800 text-slate-200'
            }`}
            title="Toggle High Contrast Mode"
            aria-pressed={highContrast}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contrast</span>
          </button>

          <span className="text-slate-500">|</span>

          {/* Language Selector */}
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-gov-saffron" />
            <select
              value={language}
              onChange={handleLanguageChange}
              aria-label="Select Portal Language"
              className="bg-slate-800 text-white text-xs border border-slate-600 rounded px-1.5 py-0.5 focus:ring-1 focus:ring-gov-saffron focus:outline-none"
            >
              <option value="en">English</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>

          <span className="text-slate-500 hidden md:inline">|</span>

          {/* Quick links */}
          <div className="hidden lg:flex items-center gap-2 text-slate-300">
            <Link to="/help" className="hover:text-white flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-gov-green" />
              <span>108/104</span>
            </Link>
            <Link to="/accessibility" className="hover:text-white flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>{t.accessibility}</span>
            </Link>
          </div>
        </div>

      </div>
    </aside>
  );
};
