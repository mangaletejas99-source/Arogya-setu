import React, { useState } from 'react';
import { useOffline, PendingSyncItem } from '../../context/OfflineContext';
import { FolderSync, Wifi, WifiOff, RefreshCw, Plus, CheckCircle2, Clock, FileText } from 'lucide-react';

export const OfflineSyncView: React.FC = () => {
  const { isOnline, toggleConnectivity, pendingItems, queueOfflineItem, syncNow, isSyncing, lastSyncTime } = useOffline();

  const [patientName, setPatientName] = useState('');
  const [visitType, setVisitType] = useState<PendingSyncItem['type']>('followup');
  const [systolicBp, setSystolicBp] = useState('130');
  const [diastolicBp, setDiastolicBp] = useState('84');
  const [fetalHeartRate, setFetalHeartRate] = useState('140');
  const [observations, setObservations] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  const handleCreateOfflineRecord = (e: React.FormEvent) => {
    e.preventDefault();
    queueOfflineItem({
      type: visitType,
      patientName,
      data: {
        bp: `${systolicBp}/${diastolicBp} mmHg`,
        fetalHeartRate: fetalHeartRate ? `${fetalHeartRate} bpm` : undefined,
        observations
      }
    });

    setPatientName('');
    setObservations('');
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3500);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
            Rural Disconnected Operations
          </span>
          <h1 className="text-2xl font-bold text-gov-navy mt-1">
            Offline Field Records & Cloud Synchronization
          </h1>
          <p className="text-xs text-slate-600">
            Records stored securely in device local storage during zero-network field visits. Synchronizes automatically when network returns.
          </p>
        </div>

        {/* Connectivity Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleConnectivity}
            className={`px-4 py-2 rounded font-bold flex items-center gap-2 border transition-all ${
              isOnline
                ? 'bg-emerald-50 text-emerald-900 border-emerald-400'
                : 'bg-amber-100 text-amber-900 border-amber-400'
            }`}
          >
            {isOnline ? <Wifi className="w-4 h-4 text-emerald-600" /> : <WifiOff className="w-4 h-4 text-amber-700" />}
            <span>Mode: {isOnline ? 'Online' : 'Offline'} (Click to Toggle)</span>
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div className="bg-slate-50 border border-slate-300 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FolderSync className="w-5 h-5 text-gov-navy" />
            <span className="font-bold text-gov-navy text-sm">Local Storage Buffer</span>
          </div>
          <p className="text-slate-600 text-xs">
            {pendingItems.length} records pending synchronization to the State Public Health Registry.
          </p>
          {lastSyncTime && (
            <div className="text-[11px] text-slate-500">
              Last successful sync: <strong>{lastSyncTime}</strong>
            </div>
          )}
        </div>

        <button
          onClick={() => syncNow()}
          disabled={isSyncing || pendingItems.length === 0 || !isOnline}
          className="bg-gov-saffron hover:bg-[#c24615] text-white px-5 py-2.5 rounded font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-40 shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Synchronizing Data...' : 'Sync Now with Cloud'}</span>
        </button>
      </div>

      {addedNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Record stored safely in offline local storage buffer.</span>
        </div>
      )}

      {/* Form: Add Field Record while offline */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gov-gray-200 pb-2">
          <Plus className="w-4 h-4 text-gov-navy" />
          <h2 className="font-bold text-gov-navy text-sm uppercase tracking-wider">
            Log Field Health Visit (Offline Ready)
          </h2>
        </div>

        <form onSubmit={handleCreateOfflineRecord} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Manisha Ahire"
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Visit / Screening Type *</label>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value as any)}
                className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
              >
                <option value="followup">Antenatal Care (ANC) Field Checkup</option>
                <option value="vitals">Hypertension & Diabetes NCD Vitals</option>
                <option value="triage">Child Malnutrition & Immunisation Check</option>
                <option value="referral">Community Referral Notification</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
            <div>
              <label className="block text-slate-600 mb-1">Systolic BP (mmHg)</label>
              <input
                type="number"
                value={systolicBp}
                onChange={(e) => setSystolicBp(e.target.value)}
                className="w-full p-1.5 border border-slate-300 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Diastolic BP (mmHg)</label>
              <input
                type="number"
                value={diastolicBp}
                onChange={(e) => setDiastolicBp(e.target.value)}
                className="w-full p-1.5 border border-slate-300 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Fetal Heart Rate (bpm)</label>
              <input
                type="number"
                value={fetalHeartRate}
                onChange={(e) => setFetalHeartRate(e.target.value)}
                placeholder="140"
                className="w-full p-1.5 border border-slate-300 rounded bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Field Clinical Observations & Advice</label>
            <input
              type="text"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="e.g. Advised IFA tablets; mild pedal oedema noted. Scheduled for PHC ultrasound."
              className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gov-navy text-white px-5 py-2.5 rounded font-bold hover:bg-gov-navyLight transition-colors flex items-center gap-2 shadow-sm"
            >
              <FolderSync className="w-4 h-4" />
              <span>Save to Device Storage Buffer</span>
            </button>
          </div>
        </form>
      </div>

      {/* List of Pending Items in Local Storage */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
          <h3 className="font-bold text-gov-navy text-sm uppercase tracking-wider">
            Current Pending Records Awaiting Transmission
          </h3>
          <span className="text-slate-500 font-semibold">{pendingItems.length} Records</span>
        </div>

        {pendingItems.length > 0 ? (
          <div className="divide-y divide-slate-200">
            {pendingItems.map((item) => (
              <div key={item.id} className="py-3 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gov-navy text-[11px]">{item.id}</span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.2 rounded uppercase">
                      {item.type}
                    </span>
                    <span className="text-slate-400 text-[10px]">{item.timestamp}</span>
                  </div>
                  <div className="font-bold text-slate-800 text-xs">{item.patientName}</div>
                  <div className="text-[11px] text-slate-600">
                    {JSON.stringify(item.data).replace(/["{}]/g, ' ')}
                  </div>
                </div>

                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded shrink-0">
                  Pending Sync
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            No records pending. Device storage is in sync with cloud database.
          </div>
        )}
      </div>
    </div>
  );
};
