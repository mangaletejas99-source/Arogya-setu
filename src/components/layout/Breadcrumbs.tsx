import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  const breadcrumbs: BreadcrumbItem[] = pathnames.map((segment, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    // Format label cleanly
    const formatted = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return { label: formatted, path };
  });

  return (
    <nav aria-label="Breadcrumb" className="bg-gov-gray-100 border-b border-gov-gray-200 py-1.5 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex items-center space-x-1 text-gov-gray-600">
        <Link to="/" className="hover:text-gov-navy flex items-center gap-1 font-medium">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        {breadcrumbs.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <React.Fragment key={item.path}>
              <ChevronRight className="w-3 h-3 text-gov-gray-400" />
              {isLast ? (
                <span className="font-semibold text-gov-navy truncate max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-gov-navy font-medium">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
