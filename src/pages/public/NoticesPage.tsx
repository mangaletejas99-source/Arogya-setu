import React, { useState } from 'react';
import { MOCK_NOTICES, HealthNotice } from '../../data/mockNotices';
import { Download, Search, FileText, Calendar, Filter, Bell } from 'lucide-react';

export const NoticesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filteredNotices = MOCK_NOTICES.filter((n) => {
    const matchCat = category === 'All' || n.category === category;
    const matchQ =
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.department.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Official Gazettes & Directives
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gov-navy mt-1">
          Notices, Circulars & Health Advisories
        </h1>
        <p className="text-sm text-gov-gray-600 mt-1">
          Official communications from the Directorate of Health Services, NHM, and Disease Control Cells.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-gov-gray-300 rounded-lg shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {['All', 'Advisory', 'Circular', 'Vaccination', 'Recruitment', 'Tender'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                category === cat
                  ? 'bg-gov-navy text-white'
                  : 'bg-gov-gray-100 text-gov-gray-700 hover:bg-gov-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search circulars, SOPs, tenders..."
            className="w-full pl-9 pr-3 py-1.5 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none text-xs"
          />
        </div>
      </div>

      {/* Notices Table */}
      <div className="bg-white border border-gov-gray-300 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gov-gray-100 text-gov-navy uppercase text-[10px] tracking-wider border-b border-gov-gray-300">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Issuing Authority / Cell</th>
                <th className="py-3 px-4">Notice Title & Summary</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-gray-200 text-slate-700">
              {filteredNotices.map((n) => (
                <tr key={n.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gov-navy whitespace-nowrap align-top">
                    {n.date}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-600 align-top max-w-xs">
                    {n.department}
                  </td>
                  <td className="py-3 px-4 space-y-1 align-top">
                    <div className="font-bold text-gov-navy text-sm flex items-center gap-2">
                      <span>{n.title}</span>
                      {n.isImportant && (
                        <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.2 rounded border border-rose-300 shrink-0">
                          HIGH PRIORITY
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {n.summary}
                    </p>
                  </td>
                  <td className="py-3 px-4 align-top whitespace-nowrap">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">
                      {n.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right align-top whitespace-nowrap">
                    <button
                      onClick={() => alert(`Downloading document: ${n.title} (${n.pdfFileSize})`)}
                      className="inline-flex items-center gap-1 text-gov-navy hover:text-gov-navyLight font-bold border border-gov-gray-300 hover:bg-slate-100 px-2.5 py-1 rounded transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-gov-saffron" />
                      <span>PDF ({n.pdfFileSize})</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
