import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: 'navy' | 'saffron' | 'green' | 'emergency';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
  color = 'navy',
}) => {
  const colorMap = {
    navy: 'border-l-gov-navy text-gov-navy bg-slate-50',
    saffron: 'border-l-gov-saffron text-gov-saffron bg-orange-50/50',
    green: 'border-l-gov-green text-gov-green bg-emerald-50/40',
    emergency: 'border-l-gov-emergency text-gov-emergency bg-rose-50/40',
  };

  return (
    <div className={`bg-white border border-gov-gray-200 border-l-4 ${colorMap[color]} rounded p-3.5 shadow-sm`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gov-gray-600 uppercase tracking-wide">
          {title}
        </span>
        <div className="p-1.5 rounded bg-white border border-gov-gray-200">
          <Icon className="w-4 h-4 text-gov-gray-700" />
        </div>
      </div>

      <div className="mt-2 text-2xl font-bold text-gov-navy tracking-tight">
        {value}
      </div>

      {(subtitle || trend) && (
        <div className="mt-1 flex items-center justify-between text-[11px] text-gov-gray-500">
          <span>{subtitle}</span>
          {trend && (
            <span className={`font-semibold ${trendUp ? 'text-emerald-700' : 'text-gov-gray-600'}`}>
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
