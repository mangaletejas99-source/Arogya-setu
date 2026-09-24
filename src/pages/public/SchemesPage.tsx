import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { MOCK_SCHEMES, HealthScheme } from '../../data/mockSchemes';
import { Award, Search, Filter, CheckCircle2, FileText, ExternalLink, ShieldAlert, ArrowRight } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const SchemesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalScheme, setActiveModalScheme] = useState<HealthScheme | null>(null);

  const categories = ['All', 'Health Insurance', 'Maternal Health', 'Senior Citizens'];

  const filteredSchemes = MOCK_SCHEMES.filter((scheme) => {
    const matchesCat = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesQ =
      scheme.name.toLowerCase().includes(query.toLowerCase()) ||
      scheme.shortCode.toLowerCase().includes(query.toLowerCase()) ||
      scheme.benefits.some(b => b.toLowerCase().includes(query.toLowerCase()));
    return matchesCat && matchesQ;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Social Health Protection & Entitlements
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gov-navy mt-1">
          Government Health & Welfare Schemes
        </h1>
        <p className="text-sm text-gov-gray-600 mt-1">
          Comprehensive guide to public health financial protection schemes including PM-JAY, MJPJAY, PMSMA, and Ayushman Vaya Vandana.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4">
        <div className="overflow-hidden rounded-2xl border border-gov-gray-300 bg-white shadow-sm">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
            alt="Public health workers guiding beneficiaries at a government health outreach camp"
            className="h-64 w-full object-cover"
          />
        </div>
        <div className="rounded-2xl border border-gov-gray-200 bg-slate-50 p-5 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gov-saffron">PROTOTYPE / DEMO</div>
          <h2 className="mt-2 text-lg font-bold text-gov-navy">Government health scheme access</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Support for maternal care, chronic disease screening, preventive care, and rural public health awareness pathways under the social protection architecture.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {[
          { title: 'Maternal & Child Care', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80' },
          { title: 'Rural Care Programs', image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80' },
          { title: 'Preventive Health', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895977?auto=format&fit=crop&w=900&q=80' },
          { title: 'Community Awareness', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80' },
          { title: 'Health Schemes', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80' }
        ].map((item) => (
          <div key={item.title} className="overflow-hidden rounded-xl border border-gov-gray-200 bg-white shadow-sm">
            <ImageWithFallback src={item.image} alt={item.title} className="h-32 w-full object-cover" />
            <div className="p-3 text-xs font-bold text-gov-navy">{item.title}</div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 border border-gov-gray-300 rounded-lg shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-gov-navy text-white'
                  : 'bg-gov-gray-100 text-gov-gray-700 hover:bg-gov-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scheme (e.g., PM-JAY, Senior, Cashless)..."
            className="w-full pl-9 pr-3 py-1.5 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none text-xs"
          />
        </div>
      </div>

      {/* Schemes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs flex flex-col justify-between hover:border-gov-navy transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {scheme.category}
                </span>
                <span className="text-xs font-bold text-gov-navy uppercase tracking-wider">
                  {scheme.shortCode}
                </span>
              </div>

              <h2 className="text-base font-bold text-gov-navy leading-snug">
                {scheme.name}
              </h2>

              <div className="mt-3 bg-emerald-50/60 border border-emerald-200 rounded p-2.5">
                <div className="text-[10px] text-emerald-900 font-semibold uppercase">Financial Entitlement</div>
                <div className="text-sm font-bold text-emerald-800 mt-0.5">{scheme.coverageAmount}</div>
              </div>

              {/* Eligibility checklist preview */}
              <div className="mt-3 text-xs space-y-1">
                <div className="font-semibold text-slate-700 text-[11px]">Key Eligibility Criteria:</div>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {scheme.eligibility.map((el, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gov-green shrink-0 mt-0.5" />
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <button
                onClick={() => setActiveModalScheme(scheme)}
                className="bg-gov-navy text-white px-3.5 py-1.5 rounded font-bold hover:bg-gov-navyLight transition-colors flex items-center gap-1"
              >
                <span>View Full Application Process</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-[11px] font-medium"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail Modal */}
      {activeModalScheme && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModalScheme(null)}
          title={activeModalScheme.name}
          subtitle={`Scheme ID: ${activeModalScheme.shortCode} • Category: ${activeModalScheme.category}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="bg-emerald-50 border border-emerald-300 p-3 rounded">
              <div className="font-bold text-emerald-900 text-xs">Benefit Coverage:</div>
              <div className="text-base font-bold text-emerald-800 mt-1">
                {activeModalScheme.coverageAmount}
              </div>
            </div>

            <div>
              <div className="font-bold text-gov-navy text-xs uppercase mb-1">Key Benefits & Hospital Packages:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {activeModalScheme.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold text-gov-navy text-xs uppercase mb-1">Documents Required for e-KYC:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {activeModalScheme.documentsRequired.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded space-y-1">
              <div className="font-bold text-gov-navy text-xs uppercase">How to Apply / Claim:</div>
              <p className="text-slate-700 leading-relaxed">
                {activeModalScheme.applicationProcess}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Assistance available at all Ayushman Mitra counters (Dial 14555)
              </span>
              <button
                onClick={() => alert("Application form checklist saved to device.")}
                className="bg-gov-navy text-white px-4 py-2 rounded text-xs font-bold hover:bg-gov-navyLight"
              >
                Download Document Checklist
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
