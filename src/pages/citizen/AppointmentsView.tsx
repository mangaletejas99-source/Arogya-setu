import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_DOCTORS, Doctor } from '../../data/mockDoctors';
import { MOCK_FACILITIES } from '../../data/mockFacilities';
import { MOCK_APPOINTMENTS, Appointment } from '../../data/mockAppointments';
import { Calendar, Clock, User, Building2, CheckCircle2, Search, ArrowRight, Printer, AlertCircle } from 'lucide-react';
import { QueueTracker } from '../../components/clinical/QueueTracker';

export const AppointmentsView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialFacilityId = searchParams.get('facility') || '';

  const [selectedFacility, setSelectedFacility] = useState(initialFacilityId || 'FAC-NSK-01');
  const [selectedDoctorId, setSelectedDoctorId] = useState('DOC-PATIL-01');
  const [selectedDate, setSelectedDate] = useState('2026-09-20');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [appointmentMode, setAppointmentMode] = useState<'In-Person OPD' | 'Teleconsultation'>('In-Person OPD');

  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(MOCK_APPOINTMENTS[0]);

  const availableDoctors = MOCK_DOCTORS.filter(
    (d) => !selectedFacility || d.facilityId === selectedFacility
  );

  const selectedDoctor = MOCK_DOCTORS.find((d) => d.id === selectedDoctorId) || availableDoctors[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const facilityObj = MOCK_FACILITIES.find((f) => f.id === selectedFacility);
    const newApt: Appointment = {
      id: `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: 'Ramesh D. Jadhav',
      patientAbha: '91-4829-1048-2910',
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      facilityId: selectedFacility,
      facilityName: facilityObj?.name || 'District Civil Hospital, Nashik',
      roomNo: selectedDoctor.roomNo,
      date: selectedDate,
      slotTime: selectedSlot,
      tokenNumber: Math.floor(14 + Math.random() * 12),
      currentServingToken: 8,
      status: 'confirmed',
      mode: appointmentMode,
    };

    setAppointmentsList([newApt, ...appointmentsList]);
    setBookedAppointment(newApt);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
            Hospital Outpatient Department (OPD)
          </span>
          <h1 className="text-2xl font-bold text-gov-navy mt-1">
            Book Doctor Consultation & Token Registration
          </h1>
          <p className="text-xs text-slate-600">
            Select government hospital, specialist department, and obtain your instant digital queue token.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form: Booking Engine (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs text-xs space-y-4">
          <h2 className="text-sm font-bold text-gov-navy border-b border-gov-gray-200 pb-2 uppercase tracking-wider">
            Outpatient (OPD) Slot Selection
          </h2>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {/* Consultation Mode */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Consultation Mode *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAppointmentMode('In-Person OPD')}
                  className={`p-2.5 rounded border text-left flex items-center gap-2 transition-colors ${
                    appointmentMode === 'In-Person OPD'
                      ? 'border-gov-navy bg-blue-50/50 font-bold text-gov-navy'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-gov-navy" />
                  <span>In-Person OPD (Hospital Visit)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAppointmentMode('Teleconsultation')}
                  className={`p-2.5 rounded border text-left flex items-center gap-2 transition-colors ${
                    appointmentMode === 'Teleconsultation'
                      ? 'border-gov-navy bg-blue-50/50 font-bold text-gov-navy'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <Clock className="w-4 h-4 text-gov-saffron" />
                  <span>e-Sanjeevani (Teleconsultation)</span>
                </button>
              </div>
            </div>

            {/* Select Facility */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Healthcare Facility *</label>
              <select
                value={selectedFacility}
                onChange={(e) => {
                  setSelectedFacility(e.target.value);
                  const firstDoc = MOCK_DOCTORS.find(d => d.facilityId === e.target.value);
                  if (firstDoc) setSelectedDoctorId(firstDoc.id);
                }}
                className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
              >
                {MOCK_FACILITIES.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name} ({fac.level} - {fac.district})
                  </option>
                ))}
              </select>
            </div>

            {/* Select Doctor */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Consulting Physician & Specialty *</label>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none font-medium"
              >
                {availableDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.specialty} ({doc.roomNo})
                  </option>
                ))}
              </select>
              {selectedDoctor && (
                <div className="mt-1.5 p-2 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600 flex justify-between">
                  <span>Timings: <strong>{selectedDoctor.opdTimings}</strong></span>
                  <span>Days: {selectedDoctor.availableDays.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">OPD Date *</label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min="2026-09-19"
                  className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Time Window *</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
                >
                  <option value="09:00 AM">09:00 AM - 10:00 AM (Early Morning)</option>
                  <option value="10:30 AM">10:30 AM - 11:30 AM (Mid Morning)</option>
                  <option value="12:00 PM">12:00 PM - 01:00 PM (Afternoon)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gov-navy text-white rounded font-bold hover:bg-gov-navyLight transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm Appointment & Generate Token</span>
            </button>
          </form>
        </div>

        {/* Right Panel: Confirmed Booking Slip & Live Token Tracker (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {bookedAppointment && (
            <div className="bg-white border-2 border-gov-navy rounded-lg p-5 shadow-md text-xs space-y-4">
              <div className="flex items-center justify-between border-b-2 border-gov-saffron pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gov-green" />
                  <span className="font-bold text-gov-navy text-sm">Confirmed OPD Slip</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="text-gov-navy hover:underline flex items-center gap-1 font-semibold text-[11px] no-print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>

              {/* Token Display Banner */}
              <div className="bg-gov-navy text-white p-4 rounded-lg text-center">
                <div className="text-[11px] uppercase font-semibold text-slate-300">Allocated OPD Token</div>
                <div className="text-4xl font-extrabold tracking-tight mt-1">#{bookedAppointment.tokenNumber}</div>
                <div className="text-xs text-amber-300 font-semibold mt-1">
                  Estimated Waiting Time: ~{Math.max(0, bookedAppointment.tokenNumber - bookedAppointment.currentServingToken) * 7} mins
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-3 rounded border border-slate-200 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Docket Number:</span>
                  <strong className="font-mono text-gov-navy">{bookedAppointment.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <strong>{bookedAppointment.patientName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hospital:</span>
                  <strong className="text-right">{bookedAppointment.facilityName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consultant:</span>
                  <strong>{bookedAppointment.doctorName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consultation Room:</span>
                  <strong className="text-gov-navy">{bookedAppointment.roomNo}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Schedule:</span>
                  <strong>{bookedAppointment.date} at {bookedAppointment.slotTime}</strong>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-amber-50 p-2.5 rounded border border-amber-200">
                Please present this token at the OPD nursing station 15 minutes before your slot time. Biometric/ABHA verification will occur at entry.
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Embedded Live Queue Tracker Component */}
      {bookedAppointment && (
        <div className="pt-2">
          <QueueTracker initialAppointment={bookedAppointment} />
        </div>
      )}
    </div>
  );
};
