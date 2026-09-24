import React, { useState } from 'react';
import { MOCK_REFERRALS } from '../../data/mockReferrals';
import { ReferralPipeline } from '../../components/clinical/ReferralPipeline';
import { Share2, Building2, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ReferralStatusView: React.FC = () => {
  const [referrals, setReferrals] = useState(MOCK_REFERRALS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Continuity of Care Network
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1">
          Referral Tracking Chain
        </h1>
        <p className="text-xs text-slate-600">
          Track inter-facility clinical escalations from Sub-Centres to District Civil Hospitals with closed-loop feedback.
        </p>
      </div>

      <div className="space-y-6">
        {referrals.map((ref) => (
          <ReferralPipeline key={ref.id} referral={ref} />
        ))}
      </div>
    </div>
  );
};
