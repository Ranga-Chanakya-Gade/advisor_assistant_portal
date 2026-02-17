import React, { createContext, useContext, useState } from 'react';
import { generateIncomeIllustration, getIncomeProjections, validateSuitability, generateRegulatoryReport } from '../services/serviceNowAPI';

const IllustrationContext = createContext();

export const useIllustration = () => {
  const context = useContext(IllustrationContext);
  if (!context) {
    throw new Error('useIllustration must be used within IllustrationProvider');
  }
  return context;
};

export const IllustrationProvider = ({ children }) => {
  const [currentIllustration, setCurrentIllustration] = useState(null);
  const [projections, setProjections] = useState([]);
  const [suitabilityReport, setSuitabilityReport] = useState(null);
  const [regulatoryReport, setRegulatoryReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create new income illustration
  const createIllustration = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateIncomeIllustration(params);
      setCurrentIllustration(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to create illustration');
      console.error('Illustration creation error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch income projections for scenario
  const fetchProjections = async (scenarioId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIncomeProjections(scenarioId);
      setProjections(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch projections');
      console.error('Projections error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Validate suitability
  const checkSuitability = async (illustrationId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await validateSuitability(illustrationId);
      setSuitabilityReport(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to validate suitability');
      console.error('Suitability validation error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Generate regulatory report
  const generateReport = async (illustrationId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateRegulatoryReport(illustrationId);
      setRegulatoryReport(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to generate report');
      console.error('Report generation error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Voice command handler
  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('create illustration') || lowerCommand.includes('new illustration')) {
      return { action: 'CREATE_ILLUSTRATION' };
    }

    if (lowerCommand.includes('show projections') || lowerCommand.includes('income projections')) {
      return { action: 'SHOW_PROJECTIONS', data: projections };
    }

    if (lowerCommand.includes('validate suitability') || lowerCommand.includes('check suitability')) {
      return { action: 'VALIDATE_SUITABILITY' };
    }

    if (lowerCommand.includes('generate report') || lowerCommand.includes('regulatory report')) {
      return { action: 'GENERATE_REPORT' };
    }

    return null;
  };

  const value = {
    currentIllustration,
    projections,
    suitabilityReport,
    regulatoryReport,
    loading,
    error,
    createIllustration,
    fetchProjections,
    checkSuitability,
    generateReport,
    handleVoiceCommand
  };

  return (
    <IllustrationContext.Provider value={value}>
      {children}
    </IllustrationContext.Provider>
  );
};

export default IllustrationContext;
