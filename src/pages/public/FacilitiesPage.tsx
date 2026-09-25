import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { MOCK_FACILITIES, HealthFacility } from '../../data/mockFacilities';
import { healthcareImages } from '../../data/healthcareImages';
import { Building2, Search, MapPin, Phone, Clock, Bed, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);

  const filteredFacilities = MOCK_FACILITIES.filter((fac) => {
    const matchesLevel = selectedLevel === 'All' || fac.level === selectedLevel;
    const matchesDistrict = selectedDistrict === 'All' || fac.district === selectedDistrict;
    const matchesEmergency = !emergencyOnly || fac.emergencyAvailable;
    const matchesQ =
      fac.name.toLowerCase().includes(query.toLowerCase()) ||
      fac.taluka.toLowerCase().includes(query.toLowerCase()) ||
      fac.address.toLowerCase().includes(query.toLowerCase());
    return matchesLevel && matchesDistrict && matchesEmergency && matchesQ;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Public Healthcare Infrastructure Directory
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gov-navy mt-1">
          Health Facilities & Hospitals
        </h1>
        <p className="text-sm text-gov-gray-600 mt-1">
          Explore Sub-Centres, Primary Health Centres, Rural Hospitals, and District Civil Hospitals across Maharashtra.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { title: 'PHC', image: healthcareImages.phc },
          { title: 'Rural Hospital', image: healthcareImages.ruralHospital },
          { title: 'District Hospital', image: healthcareImages.districtHospital },
          { title: 'Mobile Medical Unit', image: healthcareImages.mobileMedicalUnit }
        ].map((facility) => (
          <div key={facility.title} className="overflow-hidden rounded-xl border border-gov-gray-200 bg-white shadow-sm">
            <ImageWithFallback src={facility.image} alt={facility.title} className="h-40 w-full object-cover" />
            <div className="p-3 text-sm font-bold text-gov-navy">{facility.title}</div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-gov-gray-300 rounded-lg shadow-xs space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Search Facility Name or Location</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Nashik, Sakri, Trimbakeshwar, Sassoon..."
                className="w-full pl-9 pr-3 py-1.5 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Facility Tier Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-1.5 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
            >
              <option value="All">All Tiers</option>
              <option value="Sub-Centre">Sub-Centre (HWC)</option>
              <option value="PHC">Primary Health Centre (PHC)</option>
              <option value="Rural Hospital">Rural Hospital / CHC</option>
              <option value="District Hospital">District Civil Hospital</option>
              <option value="Medical College">Government Medical College</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-1.5 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
            >
              <option value="All">All Districts</option>
              <option value="Nashik">Nashik</option>
              <option value="Dhule">Dhule</option>
              <option value="Jalgaon">Jalgaon</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
        </div>

        {/* Checkbox for Emergency Only */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
            <input
              type="checkbox"
              checked={emergencyOnly}
              onChange={(e) => setEmergencyOnly(e.target.checked)}
              className="rounded text-gov-navy focus:ring-gov-navy border-gray-300"
            />
            <span>Show only facilities with 24x7 Emergency / Trauma Casualty</span>
          </label>
          <span className="text-slate-500">{filteredFacilities.length} Facilities Found</span>
        </div>
      </div>

      {/* Facilities Cards List */}
      <div className="space-y-4">
        {filteredFacilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs hover:border-gov-navy transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              
              {/* Left Details */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-gov-navy text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {fac.level}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    District: <strong>{fac.district}</strong> ({fac.taluka})
                  </span>
                  {fac.emergencyAvailable && (
                    <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-rose-600" /> 24x7 Emergency
                    </span>
                  )}
                  {fac.icuAvailable && (
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      ICU Available
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-gov-navy">
                  {fac.name}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gov-saffron" />
                    <span>{fac.address} ({fac.distanceKm} km away)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gov-green" />
                    <span>{fac.phone}</span>
                  </div>
                </div>

                {/* Available Services Pills */}
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                  {fac.services.map((srv) => (
                    <span
                      key={srv}
                      className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Operational Metrics & Booking Action */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-between gap-3 border-t lg:border-t-0 lg:border-l border-slate-200 pt-3 lg:pt-0 lg:pl-6 shrink-0 text-xs">
                <div className="grid grid-cols-2 gap-2 text-right w-full sm:w-auto">
                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Beds</div>
                    <div className="text-base font-bold text-gov-navy">{fac.beds} Beds</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">OPD Wait</div>
                    <div className="text-base font-bold text-amber-700">~{fac.currentWaitMinutes} mins</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <Link
                    to={`/citizen/appointments?facility=${encodeURIComponent(fac.id)}`}
                    className="bg-gov-navy text-white px-3.5 py-1.5 rounded font-bold text-xs hover:bg-gov-navyLight transition-colors flex items-center gap-1"
                  >
                    <span>Book OPD</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to={`/citizen/medicines?facility=${encodeURIComponent(fac.id)}`}
                    className="border border-gov-gray-300 hover:bg-slate-100 text-gov-gray-800 px-3 py-1.5 rounded font-semibold text-xs"
                  >
                    Drug Stock
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
