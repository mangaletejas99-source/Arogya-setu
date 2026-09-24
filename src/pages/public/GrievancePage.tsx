import React, { useState } from 'react';
import { MOCK_GRIEVANCES, GrievanceRecord } from '../../data/mockGrievances';
import { StatusBadge } from '../../components/common/StatusBadge';
import { FileText, Search, Send, CheckCircle2, Clock, AlertTriangle, Building2, UserCheck } from 'lucide-react';

export const GrievancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lodge' | 'track'>('lodge');
  const [grievances, setGrievances] = useState<GrievanceRecord[]>(MOCK_GRIEVANCES);

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [district, setDistrict] = useState('Nashik');
  const [facility, setFacility] = useState('Primary Health Centre – Trimbakeshwar');
  const [category, setCategory] = useState<GrievanceRecord['category']>('Medicine Non-Availability');
  const [description, setDescription] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Track state
  const [searchId, setSearchId] = useState('AS-GRV-2026-8492');
  const [foundGrievance, setFoundGrievance] = useState<GrievanceRecord | null>(
    MOCK_GRIEVANCES[0]
  );

  const handleLodgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `AS-GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrievance: GrievanceRecord = {
      id: newId,
      complainantName: name,
      mobile,
      district,
      facilityName: facility,
      category,
      submissionDate: new Date().toISOString().slice(0, 10),
      description,
      status: 'Submitted',
      assignedOfficer: 'District Quality Assurance Nodal Officer, ' + district,
      officialRemarks: 'Grievance registered into State Public Health Redressal Registry. Designated Medical Officer notified.'
    };

    setGrievances([newGrievance, ...grievances]);
    setSubmittedId(newId);
    setFoundGrievance(newGrievance);
    setSearchId(newId);
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = grievances.find(
      (g) => g.id.toLowerCase() === searchId.trim().toLowerCase()
    );
    setFoundGrievance(found || null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Citizen Care & Accountability
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gov-navy mt-1">
          Public Health Grievance Redressal Portal
        </h1>
        <p className="text-sm text-gov-gray-600 mt-1">
          Lodge and monitor complaints regarding public hospital services, medicine shortages, or scheme implementation.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-gov-gray-300 text-xs font-bold">
        <button
          onClick={() => setActiveTab('lodge')}
          className={`py-3 px-6 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'lodge'
              ? 'border-gov-navy text-gov-navy bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Lodge New Grievance</span>
        </button>

        <button
          onClick={() => setActiveTab('track')}
          className={`py-3 px-6 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'track'
              ? 'border-gov-navy text-gov-navy bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Track Grievance Status</span>
        </button>
      </div>

      {/* Tab 1: Lodge Grievance */}
      {activeTab === 'lodge' && (
        <div className="bg-white border border-gov-gray-300 rounded-lg p-6 shadow-xs text-xs">
          {submittedId ? (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-lg p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="text-lg font-bold text-emerald-900">
                Grievance Lodged Successfully!
              </h2>
              <p className="text-xs text-slate-700">
                Your complaint has been allocated a unique tracking docket number:
              </p>
              <div className="text-xl font-mono font-black text-gov-navy bg-white inline-block px-4 py-1.5 rounded border border-slate-300">
                {submittedId}
              </div>
              <p className="text-[11px] text-slate-500">
                An SMS confirmation has been dispatched to {mobile}. Action timeline: 7 working days.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('track')}
                  className="bg-gov-navy text-white px-5 py-2 rounded font-bold hover:bg-gov-navyLight"
                >
                  Track Docket Status Now →
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLodgeSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="grievance-name" className="block font-semibold text-slate-700 mb-1">
                    Complainant Full Name *
                  </label>
                  <input
                    id="grievance-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="grievance-mobile" className="block font-semibold text-slate-700 mb-1">
                    Mobile Number (for SMS Tracking) *
                  </label>
                  <input
                    id="grievance-mobile"
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98220 00000"
                    className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="grievance-district" className="block font-semibold text-slate-700 mb-1">
                    District *
                  </label>
                  <select
                    id="grievance-district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  >
                    <option value="Nashik">Nashik</option>
                    <option value="Dhule">Dhule</option>
                    <option value="Jalgaon">Jalgaon</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="grievance-category" className="block font-semibold text-slate-700 mb-1">
                    Grievance Category *
                  </label>
                  <select
                    id="grievance-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
                  >
                    <option value="Medicine Non-Availability">Medicine Non-Availability / Shortage</option>
                    <option value="Staff Behaviour & Absence">Staff Absence / Rude Conduct</option>
                    <option value="Facility Infrastructure">Facility Cleanliness / Infrastructure</option>
                    <option value="Scheme Cashless Issue">Scheme Denial / Cashless Denial</option>
                    <option value="Long Queue / Delay">Long Queue / Unreasonable Delay</option>
                    <option value="Other">Other Grievance</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="grievance-facility" className="block font-semibold text-slate-700 mb-1">
                  Name of Health Facility Concerned *
                </label>
                <input
                  id="grievance-facility"
                  type="text"
                  required
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                  placeholder="e.g. Primary Health Centre – Trimbakeshwar or District Hospital Nashik"
                  className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="grievance-desc" className="block font-semibold text-slate-700 mb-1">
                  Detailed Description of the Complaint *
                </label>
                <textarea
                  id="grievance-desc"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide date, time, counter number, and exact issue encountered..."
                  className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-gov-navy text-white px-6 py-2.5 rounded font-bold text-xs hover:bg-gov-navyLight transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Official Grievance</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab 2: Track Status */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          <form onSubmit={handleTrackSearch} className="bg-white p-4 border border-gov-gray-300 rounded-lg shadow-xs flex gap-2 text-xs">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Grievance Docket ID (e.g. AS-GRV-2026-8492)..."
              className="flex-1 p-2 border border-gov-gray-300 rounded font-mono uppercase focus:ring-1 focus:ring-gov-navy focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gov-navy text-white px-5 py-2 rounded font-bold hover:bg-gov-navyLight flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Track Docket</span>
            </button>
          </form>

          {foundGrievance ? (
            <div className="bg-white border border-gov-gray-300 rounded-lg p-6 shadow-xs space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gov-gray-200 pb-3">
                <div>
                  <div className="font-mono font-bold text-gov-navy text-sm">
                    Docket ID: {foundGrievance.id}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Filed on: {foundGrievance.submissionDate} by {foundGrievance.complainantName}
                  </div>
                </div>
                <StatusBadge status={foundGrievance.status} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Concerned Facility:</span>
                  <div className="font-bold text-gov-navy mt-0.5">{foundGrievance.facilityName}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Category:</span>
                  <div className="font-bold text-slate-800 mt-0.5">{foundGrievance.category}</div>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700">Complaint Details:</span>
                <p className="mt-1 text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                  {foundGrievance.description}
                </p>
              </div>

              {/* Resolution & Officer Remarks */}
              <div className="border-t border-slate-200 pt-3 space-y-2">
                <div className="flex items-center gap-1.5 text-gov-navy font-bold">
                  <UserCheck className="w-4 h-4 text-gov-saffron" />
                  <span>Assigned Action Authority: {foundGrievance.assignedOfficer}</span>
                </div>

                {foundGrievance.officialRemarks && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-emerald-950">
                    <span className="font-bold uppercase text-[10px] text-emerald-800">
                      Official Department Resolution Remarks:
                    </span>
                    <p className="mt-1 text-xs leading-relaxed">
                      {foundGrievance.officialRemarks}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white border border-gov-gray-200 rounded-lg text-slate-500 text-xs">
              No grievance record found with docket number "{searchId}".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
