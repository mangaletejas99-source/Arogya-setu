import React, { useState } from 'react';
import { DIAGNOSTIC_CATALOG, MOCK_DIAGNOSTIC_ORDERS, DiagnosticOrder } from '../../data/mockDiagnostics';
import { MOCK_CITIZEN_RECORD } from '../../data/mockCitizens';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { TestTube, Search, Download, Calendar, CheckCircle2, Clock, FileText, AlertCircle } from 'lucide-react';

export const DiagnosticsView: React.FC = () => {
  const [orders, setOrders] = useState<DiagnosticOrder[]>(MOCK_DIAGNOSTIC_ORDERS);
  const [activeReportModal, setActiveReportModal] = useState<boolean>(false);
  const [testSearch, setTestSearch] = useState('');
  const [bookedTestNotice, setBookedTestNotice] = useState<string | null>(null);

  const sampleReport = MOCK_CITIZEN_RECORD.diagnosticReports[0];

  const handleBookTest = (testName: string) => {
    const newOrder: DiagnosticOrder = {
      id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
      testId: 'TST-NEW',
      testName,
      category: 'Pathology & Biochemistry',
      patientName: 'Ramesh D. Jadhav',
      patientAbha: '91-4829-1048-2910',
      prescribedByDoctor: 'Dr. Ananya Patil',
      facilityName: 'District Civil Hospital Pathology Lab, Nashik',
      requestDate: new Date().toISOString().slice(0, 10),
      status: 'Requested',
      sampleCollectionTime: 'Awaiting lab slot allocation'
    };

    setOrders([newOrder, ...orders]);
    setBookedTestNotice(`Diagnostic order for "${testName}" booked successfully.`);
    setTimeout(() => setBookedTestNotice(null), 4000);
  };

  const filteredCatalog = DIAGNOSTIC_CATALOG.filter((t) =>
    t.name.toLowerCase().includes(testSearch.toLowerCase()) ||
    t.category.toLowerCase().includes(testSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Diagnostic Coordination & Laboratory Information System (LIS)
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1">
          Diagnostics & Laboratory Test Tracking
        </h1>
        <p className="text-xs text-slate-600">
          Book pathology, biochemistry, and radiology tests at public health centres and access verified digital reports.
        </p>
      </div>

      {bookedTestNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{bookedTestNotice}</span>
        </div>
      )}

      {/* Active Diagnostic Orders Tracking Table */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
          <h2 className="text-sm font-bold text-gov-navy uppercase tracking-wider">
            Your Active Diagnostic Test Orders
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            {orders.length} Prescribed Tests
          </span>
        </div>

        <div className="divide-y divide-gov-gray-200 text-xs">
          {orders.map((ord) => (
            <div key={ord.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-gov-navy">{ord.id}</span>
                  <StatusBadge status={ord.status} size="sm" />
                  <span className="text-slate-500 text-[11px]">Requested: {ord.requestDate}</span>
                </div>
                <div className="font-bold text-gov-navy text-sm">{ord.testName}</div>
                <div className="text-slate-600 text-[11px]">
                  Prescribed by: <strong>{ord.prescribedByDoctor}</strong> • Lab: {ord.facilityName}
                </div>
                {ord.sampleCollectionTime && (
                  <div className="text-slate-500 text-[11px]">
                    Status Note: {ord.sampleCollectionTime}
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {ord.status === 'Result Available' ? (
                  <button
                    onClick={() => setActiveReportModal(true)}
                    className="bg-gov-navy text-white px-3.5 py-1.5 rounded text-xs font-bold hover:bg-gov-navyLight flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Verified Report</span>
                  </button>
                ) : (
                  <span className="text-slate-500 text-xs italic bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                    Sample Processing
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Diagnostics Test Directory */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-gray-200 pb-2">
          <div>
            <h3 className="font-bold text-gov-navy uppercase tracking-wider text-sm">
              Public Health Test Catalog & Booking
            </h3>
            <p className="text-[11px] text-slate-500">Free diagnostics provided under National Free Diagnostic Service Initiative.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="search"
              value={testSearch}
              onChange={(e) => setTestSearch(e.target.value)}
              placeholder="Search test name..."
              className="w-full pl-9 pr-3 py-1.5 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredCatalog.map((t) => (
            <div key={t.id} className="p-3 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase">
                  <span>{t.category}</span>
                  <span>{t.turnaroundHours}h Result</span>
                </div>
                <h4 className="font-bold text-gov-navy text-xs mt-1 leading-snug">{t.name}</h4>
                <div className="text-[11px] text-slate-600 mt-1">
                  Sample: {t.sampleType}
                </div>
                {t.fastingRequired && (
                  <span className="inline-block mt-1 bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 rounded">
                    12h Fasting Required
                  </span>
                )}
              </div>

              <button
                onClick={() => handleBookTest(t.name)}
                className="w-full py-1.5 bg-white border border-gov-navy text-gov-navy rounded font-bold hover:bg-gov-navy hover:text-white transition-colors text-[11px]"
              >
                + Request Test Slot
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Lab Report Modal (Digital PDF style) */}
      {activeReportModal && (
        <Modal
          isOpen={true}
          onClose={() => setActiveReportModal(false)}
          title={`Verified Laboratory Report: ${sampleReport.testName}`}
          subtitle={`${sampleReport.facility} • Signed by ${sampleReport.doctor}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-3 rounded border border-slate-200 grid grid-cols-2 gap-2 text-[11px]">
              <div>Patient: <strong>{MOCK_CITIZEN_RECORD.name}</strong></div>
              <div>ABHA ID: <strong className="font-mono">{MOCK_CITIZEN_RECORD.abhaId}</strong></div>
              <div>Prescribed: {sampleReport.prescribedDate}</div>
              <div>Reported Date: <strong>{sampleReport.resultDate}</strong></div>
            </div>

            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                <tr>
                  <th className="p-2 border-b">Parameter</th>
                  <th className="p-2 border-b">Measured Value</th>
                  <th className="p-2 border-b">Reference Range</th>
                  <th className="p-2 border-b">Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sampleReport.readings.map((r, i) => (
                  <tr key={i} className={r.isAbnormal ? 'bg-amber-50 font-bold text-amber-950' : ''}>
                    <td className="p-2">{r.parameter}</td>
                    <td className="p-2">
                      {r.value} {r.isAbnormal && <span className="text-amber-800 text-[10px] ml-1">(HIGH)</span>}
                    </td>
                    <td className="p-2 text-slate-500">{r.normalRange}</td>
                    <td className="p-2 text-slate-500">{r.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded text-blue-900">
              <span className="font-bold text-[10px] uppercase block mb-0.5">Pathologist Impression:</span>
              <p className="text-xs">{sampleReport.impression}</p>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
              <span className="text-[11px] text-slate-400">Digitally verified and timestamped on ABDM LIS</span>
              <button
                onClick={() => alert("Report downloaded.")}
                className="bg-gov-navy text-white px-4 py-2 rounded font-bold hover:bg-gov-navyLight flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Report PDF</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
