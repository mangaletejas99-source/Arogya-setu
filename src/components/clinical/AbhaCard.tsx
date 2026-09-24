import React from 'react';
import { PatientHealthRecord } from '../../data/mockCitizens';
import { Shield, QrCode, Download, Printer, CheckCircle } from 'lucide-react';

interface AbhaCardProps {
  record: PatientHealthRecord;
}

export const AbhaCard: React.FC<AbhaCardProps> = ({ record }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-gray-200 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
              Ayushman Bharat Digital Mission (ABDM)
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Verified ABHA
            </span>
          </div>
          <h2 className="text-base font-bold text-gov-navy mt-0.5">
            Digital Health Account Card (ABHA)
          </h2>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gov-gray-300 rounded text-xs font-semibold text-gov-gray-700 hover:bg-gov-gray-50"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
          <button
            onClick={() => alert("Digital ABHA Card downloaded to device storage.")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gov-navy text-white rounded text-xs font-semibold hover:bg-gov-navyLight"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Card</span>
          </button>
        </div>
      </div>

      {/* The Physical Card Replica */}
      <div className="max-w-md mx-auto bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-2 border-gov-navy rounded-xl p-4 shadow-md text-gov-gray-900 relative overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b-2 border-gov-saffron pb-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gov-navy text-white flex items-center justify-center font-bold text-sm">
              <Shield className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gov-gray-600 tracking-wider uppercase leading-none">
                National Health Authority Prototype
              </div>
              <div className="text-xs font-black text-gov-navy tracking-tight leading-snug">
                ABHA Health Card (आयुष्मान भारत)
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-gov-saffron text-white px-1.5 py-0.5 rounded">
            DEMO
          </span>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-3 gap-3 items-center">
          {/* Photo placeholder */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="w-24 h-28 bg-slate-200 border-2 border-slate-300 rounded flex flex-col items-center justify-center text-slate-500 text-[10px] font-medium p-2 text-center">
              <span>Patient Photo</span>
              <span className="text-[9px] text-slate-400 mt-1">Verified e-KYC</span>
            </div>
          </div>

          {/* Details */}
          <div className="col-span-2 space-y-1.5 text-xs">
            <div>
              <div className="text-[10px] text-gov-gray-500 font-semibold uppercase">Name</div>
              <div className="font-bold text-gov-navy text-sm leading-none">{record.name}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] text-gov-gray-500 font-semibold uppercase">ABHA Address</div>
                <div className="font-semibold text-slate-700 truncate">{record.abhaAddress}</div>
              </div>
              <div>
                <div className="text-[10px] text-gov-gray-500 font-semibold uppercase">Blood Group</div>
                <div className="font-bold text-rose-700">{record.bloodGroup}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] text-gov-gray-500 font-semibold uppercase">Year of Birth</div>
                <div className="font-medium text-slate-700">{record.dob.slice(0, 4)} ({record.gender})</div>
              </div>
              <div>
                <div className="text-[10px] text-gov-gray-500 font-semibold uppercase">Mobile</div>
                <div className="font-medium text-slate-700">{record.mobile}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Bottom Strip with ABHA ID & QR */}
        <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between bg-slate-100/80 -mx-4 -mb-4 px-4 py-2">
          <div>
            <div className="text-[10px] font-bold text-gov-gray-600 uppercase">ABHA Number</div>
            <div className="text-sm font-mono font-extrabold text-gov-navy tracking-wider">
              {record.abhaId}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <QrCode className="w-9 h-9 text-slate-800 p-0.5 bg-white border border-slate-300 rounded" />
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-slate-500">
        This ABHA ID enables seamless consent-based health records sharing across public health centres and civil hospitals.
      </div>
    </div>
  );
};
