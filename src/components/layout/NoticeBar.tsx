import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const NoticeBar: React.FC = () => {
  const { t } = useAccessibility();

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 font-bold bg-gov-saffron text-white px-2 py-0.5 rounded text-[11px] uppercase tracking-wide shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
            {t.announcementTitle}
          </span>
          <span className="truncate font-medium text-slate-800">
            Monsoon Fever & Dengue Surveillance Advisory active across North Maharashtra districts. Standard clinical SOPs issued for all Primary Health Centres.
          </span>
        </div>

        <Link
          to="/notices"
          className="shrink-0 flex items-center text-gov-navy font-semibold hover:underline text-[11px]"
        >
          <span>View Circular</span>
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </Link>

      </div>
    </div>
  );
};
