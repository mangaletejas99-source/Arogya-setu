import React, { createContext, useContext, useState } from 'react';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'appointment' | 'queue' | 'lab' | 'referral' | 'medicine' | 'announcement';
  priority: 'normal' | 'urgent' | 'emergency';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-1',
    title: 'Live OPD Queue Token Active',
    message: 'Your token #18 is currently 5 positions away from consultation at Civil Hospital Nashik OPD Room 4.',
    timestamp: '10 mins ago',
    category: 'queue',
    priority: 'urgent',
    read: false,
  },
  {
    id: 'NOTIF-2',
    title: 'Diagnostic Blood Chemistry Report Ready',
    message: 'Complete Blood Count (CBC) and Lipid Profile results are available for digital download.',
    timestamp: '1 hour ago',
    category: 'lab',
    priority: 'normal',
    read: false,
  },
  {
    id: 'NOTIF-3',
    title: 'Referral Case Accepted',
    message: 'District Hospital Nashik accepted referral for Cardiology evaluation from PHC Trimbakeshwar.',
    timestamp: 'Yesterday',
    category: 'referral',
    priority: 'normal',
    read: true,
  },
  {
    id: 'NOTIF-4',
    title: 'Vaccination Drive & Deworming Notice',
    message: 'Special National Deworming Day camp scheduled this Thursday at all village Sub-Centres.',
    timestamp: '2 days ago',
    category: 'announcement',
    priority: 'normal',
    read: true,
  }
];

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'read' | 'timestamp'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'read' | 'timestamp'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
