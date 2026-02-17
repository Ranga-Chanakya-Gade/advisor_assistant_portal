import React, { createContext, useContext, useState } from 'react';
import { getMeetingPrepData, getClientSnapshot, getExposureView, getCompetitorQuotes, getUpgradeEligibility } from '../services/serviceNowAPI';

const MeetingPrepContext = createContext();

export const useMeetingPrep = () => {
  const context = useContext(MeetingPrepContext);
  if (!context) {
    throw new Error('useMeetingPrep must be used within MeetingPrepProvider');
  }
  return context;
};

export const MeetingPrepProvider = ({ children }) => {
  const [prepData, setPrepData] = useState({});
  const [clientSnapshots, setClientSnapshots] = useState({});
  const [exposureViews, setExposureViews] = useState({});
  const [competitorQuotes, setCompetitorQuotes] = useState({});
  const [upgradeEligibility, setUpgradeEligibility] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch full meeting prep data
  const fetchMeetingPrep = async (appointmentId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMeetingPrepData(appointmentId);
      setPrepData(prev => ({ ...prev, [appointmentId]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch meeting prep data');
      console.error('Meeting prep error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch client snapshot
  const fetchClientSnapshot = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getClientSnapshot(customerId);
      setClientSnapshots(prev => ({ ...prev, [customerId]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch client snapshot');
      console.error('Client snapshot error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch exposure view
  const fetchExposureView = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExposureView(customerId);
      setExposureViews(prev => ({ ...prev, [customerId]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch exposure view');
      console.error('Exposure view error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch competitor quotes
  const fetchCompetitorQuotes = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCompetitorQuotes(customerId);
      setCompetitorQuotes(prev => ({ ...prev, [customerId]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch competitor quotes');
      console.error('Competitor quotes error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch upgrade eligibility
  const fetchUpgradeEligibility = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUpgradeEligibility(customerId);
      setUpgradeEligibility(prev => ({ ...prev, [customerId]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch upgrade eligibility');
      console.error('Upgrade eligibility error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Voice command handler
  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('prepare meeting') || lowerCommand.includes('meeting prep')) {
      return { action: 'PREPARE_MEETING' };
    }

    if (lowerCommand.includes('client snapshot') || lowerCommand.includes('customer snapshot')) {
      return { action: 'SHOW_CLIENT_SNAPSHOT' };
    }

    if (lowerCommand.includes('exposure view') || lowerCommand.includes('show exposure')) {
      return { action: 'SHOW_EXPOSURE_VIEW' };
    }

    return null;
  };

  const value = {
    prepData,
    clientSnapshots,
    exposureViews,
    competitorQuotes,
    upgradeEligibility,
    loading,
    error,
    fetchMeetingPrep,
    fetchClientSnapshot,
    fetchExposureView,
    fetchCompetitorQuotes,
    fetchUpgradeEligibility,
    handleVoiceCommand
  };

  return (
    <MeetingPrepContext.Provider value={value}>
      {children}
    </MeetingPrepContext.Provider>
  );
};

export default MeetingPrepContext;
