import React from 'react';
import { Eye, Volume2, Type, CheckCircle2, Shield } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AccessibilityPage: React.FC = () => {
  const { setTextSize, toggleHighContrast, highContrast, announceToScreenReader } = useAccessibility();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Inclusivity & Public Conformance
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gov-navy mt-1">
          Accessibility Statement & Assistive Guidelines
        </h1>
        <p className="text-sm text-gov-gray-600 mt-1">
          Committed to ensuring digital public health equity for users with disabilities, senior citizens, and rural low-bandwidth users.
        </p>
      </div>

      {/* Conformance Summary */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-6 shadow-xs space-y-4 text-xs">
        <h2 className="text-base font-bold text-gov-navy flex items-center gap-2">
          <Shield className="w-5 h-5 text-gov-saffron" />
          <span>Compliance with Guidelines for Indian Government Websites (GIGW 3.0) & WCAG 2.1 AA</span>
        </h2>
        <p className="text-slate-700 leading-relaxed">
          The Arogya Setu platform is designed and constructed in alignment with the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and the mandatory accessibility provisions under GIGW 3.0.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded space-y-1">
            <div className="font-bold text-gov-navy text-xs uppercase">Keyboard Operability</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Every interactive element, form field, and button can be navigated using standard keys (Tab, Shift+Tab, Enter, Space, and Esc) with high-visibility saffron focus rings.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded space-y-1">
            <div className="font-bold text-gov-navy text-xs uppercase">Screen Reader Support</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Built with semantic HTML5 (`header`, `nav`, `main`, `aside`, `footer`), descriptive ARIA labels, and polite live regions for queue and status announcements.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded space-y-1">
            <div className="font-bold text-gov-navy text-xs uppercase">Visual Contrast & Scalability</div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Maintains text contrast ratios exceeding 4.5:1. Supports one-click high-contrast mode and font scaling from 0.875rem to 1.25rem without layout degradation.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Controls Playground */}
      <div className="bg-slate-50 border border-gov-gray-300 rounded-lg p-6 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider">
          Test Accessibility Controls on this Page
        </h3>

        <div className="flex flex-wrap items-center gap-4">
          {/* Font Controls */}
          <div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200">
            <Type className="w-4 h-4 text-gov-navy" />
            <span className="font-semibold text-slate-700">Adjust Font Scale:</span>
            <button
              onClick={() => setTextSize('sm')}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold"
            >
              A- (Small)
            </button>
            <button
              onClick={() => setTextSize('base')}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold"
            >
              A (Default)
            </button>
            <button
              onClick={() => setTextSize('lg')}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold"
            >
              A+ (Large)
            </button>
            <button
              onClick={() => setTextSize('xl')}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold"
            >
              A++ (Extra Large)
            </button>
          </div>

          {/* High Contrast */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1.5 px-4 py-2 rounded font-bold transition-colors ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-gov-navy text-white hover:bg-gov-navyLight'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}</span>
          </button>

          {/* Screen reader test announcement */}
          <button
            onClick={() => announceToScreenReader("Testing screen reader announcement. Accessibility engine active.")}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 text-gov-navy hover:bg-slate-100 rounded font-semibold"
          >
            <Volume2 className="w-4 h-4 text-gov-saffron" />
            <span>Test Screen Reader Hook</span>
          </button>
        </div>
      </div>
    </div>
  );
};
