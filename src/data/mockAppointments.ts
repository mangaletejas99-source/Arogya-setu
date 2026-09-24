export interface Appointment {
  id: string;
  patientName: string;
  patientAbha: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  facilityId: string;
  facilityName: string;
  roomNo: string;
  date: string;
  slotTime: string;
  tokenNumber: number;
  currentServingToken: number;
  status: 'confirmed' | 'in-consultation' | 'completed' | 'cancelled';
  mode: 'In-Person OPD' | 'Teleconsultation';
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-2026-0918',
    patientName: 'Ramesh D. Jadhav',
    patientAbha: '91-4829-1048-2910',
    doctorId: 'DOC-PATIL-01',
    doctorName: 'Dr. Ananya Patil',
    specialty: 'General Medicine & Diabetology',
    facilityId: 'FAC-NSK-01',
    facilityName: 'District Civil Hospital, Nashik',
    roomNo: 'OPD Room 4',
    date: '2026-09-19',
    slotTime: '10:30 AM',
    tokenNumber: 18,
    currentServingToken: 13,
    status: 'confirmed',
    mode: 'In-Person OPD'
  },
  {
    id: 'APT-2026-0810',
    patientName: 'Ramesh D. Jadhav',
    patientAbha: '91-4829-1048-2910',
    doctorId: 'DOC-JADH-05',
    doctorName: 'Dr. Meenal Jadhav',
    specialty: 'General Public Health & Preventive Care',
    facilityId: 'FAC-TRM-02',
    facilityName: 'Primary Health Centre – Trimbakeshwar',
    roomNo: 'Room 1',
    date: '2026-08-20',
    slotTime: '11:00 AM',
    tokenNumber: 9,
    currentServingToken: 9,
    status: 'completed',
    mode: 'In-Person OPD'
  }
];

export const calculateQueueMetrics = (apt: Appointment) => {
  const peopleAhead = Math.max(0, apt.tokenNumber - apt.currentServingToken);
  const avgMinutesPerPatient = 7;
  const estimatedWaitMinutes = peopleAhead * avgMinutesPerPatient;
  return {
    peopleAhead,
    estimatedWaitMinutes,
    isNext: peopleAhead === 1,
    isCurrent: peopleAhead === 0,
  };
};
