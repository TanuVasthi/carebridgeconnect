
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
};

type ProfileContextType = {
  emergencyContacts: EmergencyContact[];
  addEmergencyContact: (contact: EmergencyContact) => void;
  removeEmergencyContact: (id: string) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Family Member', phone: '(555) 555-5551' },
    { id: '2', name: 'Neighbor', phone: '(555) 555-5552' },
  ]);

  const addEmergencyContact = (contact: EmergencyContact) => {
    setEmergencyContacts(prev => [...prev, contact]);
  };

  const removeEmergencyContact = (id: string) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const value = {
    emergencyContacts,
    addEmergencyContact,
    removeEmergencyContact,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
