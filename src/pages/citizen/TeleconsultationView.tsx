import React from 'react';
import { MOCK_CITIZEN_RECORD } from '../../data/mockCitizens';
import { TeleconsultationRoom } from '../../components/clinical/TeleconsultationRoom';

export const TeleconsultationView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          National Health Mission Telemedicine
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1">
          e-Sanjeevani Assisted Teleconsultation
        </h1>
        <p className="text-xs text-slate-600">
          Hub-and-spoke consultation bridging rural Sub-Centres with Specialist Doctors at District Civil Hospitals.
        </p>
      </div>

      {/* Embedded Teleconsultation Room */}
      <TeleconsultationRoom patient={MOCK_CITIZEN_RECORD} />
    </div>
  );
};
