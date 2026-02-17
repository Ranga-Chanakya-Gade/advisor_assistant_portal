import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCustomerIntelligence, getLifeStageMilestones, getRetentionRiskScores, getCoverageAdequacy } from '../services/serviceNowAPI';

const CustomerIntelligenceContext = createContext();

export const useCustomerIntelligence = () => {
  const context = useContext(CustomerIntelligenceContext);
  if (!context) {
    throw new Error('useCustomerIntelligence must be used within CustomerIntelligenceProvider');
  }
  return context;
};

export const CustomerIntelligenceProvider = ({ children }) => {
  const [intelligence, setIntelligence] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [retentionRisks, setRetentionRisks] = useState({});
  const [coverageAdequacy, setCoverageAdequacy] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch customer intelligence data
  const fetchCustomerIntelligence = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCustomerIntelligence(customerId);
      setIntelligence(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch customer intelligence');
      console.error('Customer intelligence error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch life-stage milestones
  const fetchMilestones = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLifeStageMilestones(filters);
      setMilestones(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch milestones');
      console.error('Milestones error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch retention risk scores
  const fetchRetentionRisk = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRetentionRiskScores(customerId);
      setRetentionRisks(prev => ({ ...prev, [customerId]: data }));
    } catch (err) {
      setError(err.message || 'Failed to fetch retention risk');
      console.error('Retention risk error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch coverage adequacy
  const fetchCoverageAdequacy = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCoverageAdequacy(customerId);
      setCoverageAdequacy(prev => ({ ...prev, [customerId]: data }));
    } catch (err) {
      setError(err.message || 'Failed to fetch coverage adequacy');
      console.error('Coverage adequacy error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Voice command handler
  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('show milestones') || lowerCommand.includes('life stage')) {
      return { action: 'SHOW_MILESTONES', data: milestones };
    }

    if (lowerCommand.includes('retention risk') || lowerCommand.includes('lapse risk')) {
      return { action: 'SHOW_RETENTION_RISKS', data: retentionRisks };
    }

    if (lowerCommand.includes('coverage gap') || lowerCommand.includes('coverage adequacy')) {
      return { action: 'SHOW_COVERAGE_ADEQUACY', data: coverageAdequacy };
    }

    return null;
  };

  const value = {
    intelligence,
    milestones,
    retentionRisks,
    coverageAdequacy,
    loading,
    error,
    fetchCustomerIntelligence,
    fetchMilestones,
    fetchRetentionRisk,
    fetchCoverageAdequacy,
    handleVoiceCommand
  };

  return (
    <CustomerIntelligenceContext.Provider value={value}>
      {children}
    </CustomerIntelligenceContext.Provider>
  );
};

export default CustomerIntelligenceContext;
