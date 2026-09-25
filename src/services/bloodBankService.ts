export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UrgencyLevel = 'Critical — Immediate' | 'High — Within 1 Hour' | 'Normal — Within 6 Hours';
export type SortMode = 'nearest' | 'most-units' | 'recently-updated';

export interface BloodBank {
  id: string;
  name: string;
  distanceKm: number;
  address: string;
  phone: string;
  district: string;
  bloodGroup: BloodGroup;
  availableUnits: number;
  lastUpdatedMinutesAgo: number;
  open: boolean;
  emergencySupport: boolean;
}

export interface BloodRequest {
  id: string;
  patientId: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  hospital: string;
  bloodBank: string;
  urgency: UrgencyLevel;
  requestedAt: string;
  status: 'Pending' | 'Confirmed' | 'Fulfilled' | 'Cancelled';
}

export const BLOOD_GROUP_OPTIONS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const URGENCY_OPTIONS: UrgencyLevel[] = [
  'Critical — Immediate',
  'High — Within 1 Hour',
  'Normal — Within 6 Hours',
];

export const BLOOD_COMPATIBILITY: Record<BloodGroup, BloodGroup[]> = {
  'A+': ['A+', 'AB+'],
  'A-': ['A+', 'A-', 'AB+', 'AB-'],
  'B+': ['B+', 'AB+'],
  'B-': ['B+', 'B-', 'AB+', 'AB-'],
  'AB+': ['AB+'],
  'AB-': ['AB+', 'AB-'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
};

const DEMO_BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-nashik-civil',
    name: 'Nashik District Blood Centre',
    distanceKm: 2.4,
    address: 'Old Agra Road, Nashik District Hospital Campus',
    phone: '+91 253 241 5520',
    district: 'Nashik',
    bloodGroup: 'O+',
    availableUnits: 6,
    lastUpdatedMinutesAgo: 18,
    open: true,
    emergencySupport: true,
  },
  {
    id: 'bb-satana',
    name: 'Satana Blood Bank',
    distanceKm: 5.1,
    address: 'Main Road, Satana, Nashik',
    phone: '+91 2550 224 410',
    district: 'Nashik',
    bloodGroup: 'A+',
    availableUnits: 4,
    lastUpdatedMinutesAgo: 41,
    open: true,
    emergencySupport: true,
  },
  {
    id: 'bb-dhule',
    name: 'Dhule Civil Hospital Blood Unit',
    distanceKm: 7.8,
    address: 'Civil Hospital Road, Dhule',
    phone: '+91 2562 280 420',
    district: 'Dhule',
    bloodGroup: 'B+',
    availableUnits: 3,
    lastUpdatedMinutesAgo: 63,
    open: false,
    emergencySupport: true,
  },
  {
    id: 'bb-jalgaon',
    name: 'Jalgaon Red Cross Blood Bank',
    distanceKm: 9.3,
    address: 'Rabindranath Tagore Road, Jalgaon',
    phone: '+91 2576 345 900',
    district: 'Jalgaon',
    bloodGroup: 'AB+',
    availableUnits: 2,
    lastUpdatedMinutesAgo: 25,
    open: true,
    emergencySupport: false,
  },
  {
    id: 'bb-niphad',
    name: 'Niphad Community Blood Centre',
    distanceKm: 3.7,
    address: 'Sinnar Naka, Niphad, Nashik',
    phone: '+91 253 239 9981',
    district: 'Nashik',
    bloodGroup: 'A-',
    availableUnits: 5,
    lastUpdatedMinutesAgo: 12,
    open: true,
    emergencySupport: true,
  },
  {
    id: 'bb-yeola',
    name: 'Yeola Rural Blood Support Unit',
    distanceKm: 6.2,
    address: 'Nandgaon Road, Yeola, Nashik',
    phone: '+91 2547 233 112',
    district: 'Nashik',
    bloodGroup: 'O-',
    availableUnits: 2,
    lastUpdatedMinutesAgo: 35,
    open: true,
    emergencySupport: false,
  },
];

const DEMO_BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: 'ABH-BLD-2026-00121',
    patientId: 'PAT-1001',
    patientName: 'Aarav Patil',
    bloodGroup: 'O+',
    unitsRequired: 2,
    hospital: 'Nashik District Hospital',
    bloodBank: 'Nashik District Blood Centre',
    urgency: 'High — Within 1 Hour',
    requestedAt: '2026-09-24T08:45:00.000Z',
    status: 'Pending',
  },
  {
    id: 'ABH-BLD-2026-00118',
    patientId: 'PAT-1003',
    patientName: 'Meera Shinde',
    bloodGroup: 'A-',
    unitsRequired: 1,
    hospital: 'Sakri Community Hospital',
    bloodBank: 'Niphad Community Blood Centre',
    urgency: 'Normal — Within 6 Hours',
    requestedAt: '2026-09-23T13:10:00.000Z',
    status: 'Confirmed',
  },
];

export const getCompatibleBloodGroups = (bloodGroup: BloodGroup): BloodGroup[] =>
  BLOOD_COMPATIBILITY[bloodGroup] ?? [bloodGroup];

export const getNearbyBloodBanks = ({
  bloodGroup,
  location = 'Nashik',
  requiredUnits = 1,
  openNow = false,
  emergencyOnly = false,
  distanceLimitKm = 10,
  sortBy = 'nearest',
}: {
  bloodGroup: BloodGroup;
  location?: string;
  requiredUnits?: number;
  openNow?: boolean;
  emergencyOnly?: boolean;
  distanceLimitKm?: number;
  sortBy?: SortMode;
}): BloodBank[] => {
  const compatible = new Set(getCompatibleBloodGroups(bloodGroup));

  const filtered = DEMO_BLOOD_BANKS.filter((bank) => {
    const groupMatch = compatible.has(bank.bloodGroup);
    const locationMatch = !location || location === 'All' || bank.district.toLowerCase().includes(location.toLowerCase()) || bank.address.toLowerCase().includes(location.toLowerCase());
    const unitsMatch = bank.availableUnits >= requiredUnits;
    const openMatch = !openNow || bank.open;
    const emergencyMatch = !emergencyOnly || bank.emergencySupport;
    const distanceMatch = bank.distanceKm <= distanceLimitKm;

    return groupMatch && locationMatch && unitsMatch && openMatch && emergencyMatch && distanceMatch;
  });

  return filtered.sort((left, right) => {
    if (sortBy === 'most-units') {
      return right.availableUnits - left.availableUnits || left.distanceKm - right.distanceKm;
    }
    if (sortBy === 'recently-updated') {
      return left.lastUpdatedMinutesAgo - right.lastUpdatedMinutesAgo || left.distanceKm - right.distanceKm;
    }
    return left.distanceKm - right.distanceKm || right.availableUnits - left.availableUnits;
  });
};

export const createBloodRequest = (input: {
  patientId: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  hospital: string;
  bloodBank: string;
  urgency: UrgencyLevel;
}): BloodRequest => {
  const nextNumber = DEMO_BLOOD_REQUESTS.length + 1;
  const requestId = `ABH-BLD-2026-${String(10000 + nextNumber).slice(-5)}`;

  const request: BloodRequest = {
    id: requestId,
    patientId: input.patientId,
    patientName: input.patientName,
    bloodGroup: input.bloodGroup,
    unitsRequired: input.unitsRequired,
    hospital: input.hospital,
    bloodBank: input.bloodBank,
    urgency: input.urgency,
    requestedAt: new Date().toISOString(),
    status: 'Pending',
  };

  DEMO_BLOOD_REQUESTS.unshift(request);
  return request;
};

export const getBloodRequestHistory = (): BloodRequest[] => [...DEMO_BLOOD_REQUESTS];
