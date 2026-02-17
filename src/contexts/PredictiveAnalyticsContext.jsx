import React, { createContext, useContext, useState } from 'react';
import { getPredictiveInsights, getLapseRiskIndicators, getCrossSellOpportunities, getEngagementTrends } from '../services/serviceNowAPI';

const PredictiveAnalyticsContext = createContext();

export const usePredictiveAnalytics = () => {
  const context = useContext(PredictiveAnalyticsContext);
  if (!context) {
    throw new Error('usePredictiveAnalytics must be used within PredictiveAnalyticsProvider');
  }
  return context;
};

export const PredictiveAnalyticsProvider = ({ children }) => {
  const [insights, setInsights] = useState({});
  const [lapseRisks, setLapseRisks] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [engagementTrends, setEngagementTrends] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch predictive insights
  const fetchInsights = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPredictiveInsights(customerId);
      setInsights(prev => ({ ...prev, [customerId]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch predictive insights');
      console.error('Predictive insights error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch lapse risk indicators
  const fetchLapseRisks = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLapseRiskIndicators(filters);
      setLapseRisks(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch lapse risks');
      console.error('Lapse risk error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch cross-sell opportunities
  const fetchOpportunities = async (advisorId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCrossSellOpportunities(advisorId);
      setOpportunities(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch opportunities');
      console.error('Opportunities error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch engagement trends
  const fetchEngagementTrends = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEngagementTrends(customerId);
      setEngagementTrends(prev => ({ ...prev, [customerId]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch engagement trends');
      console.error('Engagement trends error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Voice command handler
  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('show insights') || lowerCommand.includes('predictive insights')) {
      return { action: 'SHOW_INSIGHTS', data: insights };
    }

    if (lowerCommand.includes('lapse risk') || lowerCommand.includes('retention risk')) {
      return { action: 'SHOW_LAPSE_RISKS', data: lapseRisks };
    }

    if (lowerCommand.includes('opportunities') || lowerCommand.includes('cross sell')) {
      return { action: 'SHOW_OPPORTUNITIES', data: opportunities };
    }

    if (lowerCommand.includes('engagement trends') || lowerCommand.includes('show trends')) {
      return { action: 'SHOW_ENGAGEMENT_TRENDS', data: engagementTrends };
    }

    return null;
  };

  const value = {
    insights,
    lapseRisks,
    opportunities,
    engagementTrends,
    loading,
    error,
    fetchInsights,
    fetchLapseRisks,
    fetchOpportunities,
    fetchEngagementTrends,
    handleVoiceCommand
  };

  return (
    <PredictiveAnalyticsContext.Provider value={value}>
      {children}
    </PredictiveAnalyticsContext.Provider>
  );
};

export default PredictiveAnalyticsContext;
