import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let colorStyles = 'bg-gov-gray-100 text-gov-gray-800 border-gov-gray-300';

  const normalized = status.toLowerCase();

  if (
    normalized.includes('completed') ||
    normalized.includes('available') ||
    normalized.includes('normal') ||
    normalized.includes('online') ||
    normalized.includes('resolved')
  ) {
    colorStyles = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  } else if (
    normalized.includes('urgent') ||
    normalized.includes('low stock') ||
    normalized.includes('scheduled') ||
    normalized.includes('processing') ||
    normalized.includes('patient reached') ||
    normalized.includes('due') ||
    normalized.includes('under review')
  ) {
    colorStyles = 'bg-amber-50 text-amber-900 border-amber-300';
  } else if (
    normalized.includes('emergency') ||
    normalized.includes('out of stock') ||
    normalized.includes('severe') ||
    normalized.includes('overdue') ||
    normalized.includes('cancelled')
  ) {
    colorStyles = 'bg-rose-50 text-rose-800 border-rose-300';
  } else if (
    normalized.includes('accepted') ||
    normalized.includes('in progress') ||
    normalized.includes('confirmed') ||
    normalized.includes('under consultation')
  ) {
    colorStyles = 'bg-blue-50 text-blue-800 border-blue-300';
  }

  const sizeStyles = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2.5 py-0.5';

  return (
    <span
      className={`inline-flex items-center font-semibold rounded border ${sizeStyles} ${colorStyles}`}
    >
      {status}
    </span>
  );
};
