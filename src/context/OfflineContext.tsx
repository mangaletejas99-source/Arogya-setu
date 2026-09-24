import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PendingSyncItem {
  id: string;
  type: 'visit' | 'triage' | 'prescription' | 'vitals' | 'followup' | 'referral';
  patientName: string;
  timestamp: string;
  data: any;
}

interface OfflineContextType {
  isOnline: boolean;
  toggleConnectivity: () => void;
  pendingItems: PendingSyncItem[];
  queueOfflineItem: (item: Omit<PendingSyncItem, 'id' | 'timestamp'>) => void;
  syncNow: () => Promise<number>;
  isSyncing: boolean;
  lastSyncTime: string | null;
}

const STORAGE_KEY = 'arogya_setu_pending_sync';

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [pendingItems, setPendingItems] = useState<PendingSyncItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [
        {
          id: 'SYNC-101',
          type: 'followup',
          patientName: 'Kavita Shinde (High-Risk ANC)',
          timestamp: '2026-09-19 14:10',
          data: { bp: '138/88', fetalHeartRate: '142 bpm', hb: '9.8 gm/dl' }
        },
        {
          id: 'SYNC-102',
          type: 'vitals',
          patientName: 'Babanrao Pawar (Elderly HTN)',
          timestamp: '2026-09-19 14:35',
          data: { bp: '150/94', sugarRandom: '162 mg/dl' }
        }
      ];
    } catch {
      return [];
    }
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>('19 Sep 2026, 02:00 PM');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingItems));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [pendingItems]);

  const toggleConnectivity = () => {
    setIsOnline(prev => !prev);
  };

  const queueOfflineItem = (item: Omit<PendingSyncItem, 'id' | 'timestamp'>) => {
    const newItem: PendingSyncItem = {
      ...item,
      id: `SYNC-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setPendingItems(prev => [newItem, ...prev]);
  };

  const syncNow = async (): Promise<number> => {
    if (!isOnline) {
      alert('Cannot sync while Offline. Please switch back to Online mode.');
      return 0;
    }
    setIsSyncing(true);
    // Simulate network transmission to public health cloud
    await new Promise(resolve => setTimeout(resolve, 1500));
    const count = pendingItems.length;
    setPendingItems([]);
    setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today');
    setIsSyncing(false);
    return count;
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        toggleConnectivity,
        pendingItems,
        queueOfflineItem,
        syncNow,
        isSyncing,
        lastSyncTime,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) throw new Error('useOffline must be used within OfflineProvider');
  return context;
};
