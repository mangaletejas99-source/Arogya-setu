export interface DistrictMetric {
  district: string;
  populationLakhs: number;
  activeFacilities: number;
  opdVisitsToday: number;
  teleconsultsToday: number;
  referralSuccessRate: number;
  medicineAvailabilityPercent: number;
  highRiskFollowUpPercent: number;
  activeDengueCases: number;
}

export const DISTRICT_METRICS: DistrictMetric[] = [
  {
    district: 'Nashik',
    populationLakhs: 61.1,
    activeFacilities: 124,
    opdVisitsToday: 8420,
    teleconsultsToday: 1420,
    referralSuccessRate: 88.4,
    medicineAvailabilityPercent: 94.2,
    highRiskFollowUpPercent: 91.5,
    activeDengueCases: 42
  },
  {
    district: 'Pune',
    populationLakhs: 94.3,
    activeFacilities: 186,
    opdVisitsToday: 14500,
    teleconsultsToday: 3200,
    referralSuccessRate: 91.2,
    medicineAvailabilityPercent: 96.0,
    highRiskFollowUpPercent: 93.0,
    activeDengueCases: 78
  },
  {
    district: 'Dhule',
    populationLakhs: 20.5,
    activeFacilities: 54,
    opdVisitsToday: 3120,
    teleconsultsToday: 580,
    referralSuccessRate: 82.1,
    medicineAvailabilityPercent: 88.5,
    highRiskFollowUpPercent: 84.2,
    activeDengueCases: 19
  },
  {
    district: 'Jalgaon',
    populationLakhs: 42.3,
    activeFacilities: 98,
    opdVisitsToday: 5400,
    teleconsultsToday: 890,
    referralSuccessRate: 84.6,
    medicineAvailabilityPercent: 90.1,
    highRiskFollowUpPercent: 87.0,
    activeDengueCases: 34
  },
  {
    district: 'Ahmednagar',
    populationLakhs: 45.4,
    activeFacilities: 106,
    opdVisitsToday: 6200,
    teleconsultsToday: 1100,
    referralSuccessRate: 86.0,
    medicineAvailabilityPercent: 91.8,
    highRiskFollowUpPercent: 89.4,
    activeDengueCases: 28
  },
  {
    district: 'Nagpur',
    populationLakhs: 46.5,
    activeFacilities: 112,
    opdVisitsToday: 7800,
    teleconsultsToday: 1650,
    referralSuccessRate: 89.0,
    medicineAvailabilityPercent: 93.5,
    highRiskFollowUpPercent: 90.2,
    activeDengueCases: 51
  },
  {
    district: 'Chhatrapati Sambhajinagar',
    populationLakhs: 37.0,
    activeFacilities: 84,
    opdVisitsToday: 4900,
    teleconsultsToday: 920,
    referralSuccessRate: 85.3,
    medicineAvailabilityPercent: 89.7,
    highRiskFollowUpPercent: 86.8,
    activeDengueCases: 31
  }
];

export const DISEASE_TRENDS = [
  { month: 'Apr', hypertension: 42000, diabetes: 38000, dengue: 450, acuteRespiratory: 52000, maternalHighRisk: 8200 },
  { month: 'May', hypertension: 43500, diabetes: 39100, dengue: 620, acuteRespiratory: 48000, maternalHighRisk: 8400 },
  { month: 'Jun', hypertension: 44200, diabetes: 39800, dengue: 1400, acuteRespiratory: 59000, maternalHighRisk: 8600 },
  { month: 'Jul', hypertension: 45000, diabetes: 40200, dengue: 3200, acuteRespiratory: 74000, maternalHighRisk: 8900 },
  { month: 'Aug', hypertension: 45800, diabetes: 41000, dengue: 4800, acuteRespiratory: 81000, maternalHighRisk: 9100 },
  { month: 'Sep (P)', hypertension: 46200, diabetes: 41600, dengue: 3900, acuteRespiratory: 76000, maternalHighRisk: 9250 }
];

export const FACILITY_TIER_METRICS = [
  { tier: 'Sub-Centres', count: 10420, dailyVisits: 83000, avgWaitMins: 8, teleconsultActive: true },
  { tier: 'Primary Health Centres (PHC)', count: 1840, dailyVisits: 110000, avgWaitMins: 18, teleconsultActive: true },
  { tier: 'Rural Hospitals (RH)', count: 360, dailyVisits: 45000, avgWaitMins: 25, teleconsultActive: true },
  { tier: 'District Hospitals (DH)', count: 36, dailyVisits: 52000, avgWaitMins: 38, teleconsultActive: true },
  { tier: 'Government Medical Colleges', count: 28, dailyVisits: 64000, avgWaitMins: 50, teleconsultActive: true }
];
