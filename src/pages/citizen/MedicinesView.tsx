import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_MEDICINES, MedicineInventory, StockStatus } from '../../data/mockMedicines';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Pill, Search, MapPin, AlertTriangle, Building2, Filter, Clock, CheckCircle } from 'lucide-react';

export const MedicinesView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialFacility = searchParams.get('facility') || '';

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Essential NCD', 'Antibiotic', 'Maternal & Child', 'Emergency & Analgesic', 'Respiratory'];

  const filteredMedicines = MOCK_MEDICINES.filter((med) => {
    const matchesStatus = statusFilter === 'All' || med.stockStatus === statusFilter;
    const matchesCategory = categoryFilter === 'All' || med.category === categoryFilter;
    const matchesFacility = !initialFacility || med.facilityId === initialFacility;
    const matchesQ =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.facilityName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesFacility && matchesQ;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          e-Aushadhi Public Health Drug Inventory
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1">
          Medicine Stock Availability & Pharmacy Finder
        </h1>
        <p className="text-xs text-slate-600">
          Check real-time stock levels of essential generic medicines across Sub-Centres, PHCs, and District Civil Hospitals.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-gov-gray-300 rounded-lg shadow-xs space-y-3 text-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by drug name (e.g., Metformin, Paracetamol, IFA)..."
              className="w-full pl-9 pr-3 py-1.5 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
            />
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Status:
            </span>
            {['All', 'Available', 'Low Stock', 'Out of Stock'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  statusFilter === st
                    ? 'bg-gov-navy text-white'
                    : 'bg-gov-gray-100 text-gov-gray-700 hover:bg-gov-gray-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-slate-500 mr-1">Therapeutic Class:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-slate-500 text-[11px]">{filteredMedicines.length} batches listed</span>
        </div>
      </div>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedicines.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gov-gray-300 rounded-lg p-4 shadow-xs flex flex-col justify-between hover:border-gov-navy transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <StatusBadge status={item.stockStatus} size="sm" />
              </div>

              <h2 className="font-bold text-gov-navy text-sm">
                {item.name}
              </h2>
              <div className="text-[11px] text-slate-500 italic mt-0.5">
                Generic: {item.genericName}
              </div>

              {/* Facility & Location info */}
              <div className="mt-3 bg-slate-50 p-2.5 rounded border border-slate-200 text-xs space-y-1">
                <div className="font-semibold text-slate-800 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-gov-navy" />
                  <span>{item.facilityName}</span>
                </div>
                <div className="text-slate-500 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gov-saffron" />
                  <span>{item.distanceKm} km away from your registered village</span>
                </div>
              </div>

              {/* Quantity Count */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-slate-100/70 p-2 rounded">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Available Stock</div>
                  <div className="text-base font-extrabold text-gov-navy">
                    {item.availableQuantity} {item.unit}
                  </div>
                </div>
                <div className="bg-slate-100/70 p-2 rounded">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Buffer Min.</div>
                  <div className="text-base font-bold text-slate-600">
                    {item.thresholdLevel} {item.unit}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Updated: {item.lastUpdated}</span>
              </span>
              <span>Exp: {item.batchExpiry}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
