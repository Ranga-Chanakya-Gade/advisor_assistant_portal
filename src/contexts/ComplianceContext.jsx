import React, { createContext, useContext, useState } from 'react';
import { getComplianceDocuments, generateDisclosures, assembleDocuments, getAuditTrail } from '../services/serviceNowAPI';

const ComplianceContext = createContext();

export const useCompliance = () => {
  const context = useContext(ComplianceContext);
  if (!context) {
    throw new Error('useCompliance must be used within ComplianceProvider');
  }
  return context;
};

export const ComplianceProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [disclosures, setDisclosures] = useState({});
  const [assembledDocs, setAssembledDocs] = useState({});
  const [auditTrails, setAuditTrails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch compliance documents
  const fetchDocuments = async (customerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getComplianceDocuments(customerId);
      setDocuments(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch compliance documents');
      console.error('Compliance documents error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Generate disclosures
  const createDisclosures = async (transactionType) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateDisclosures(transactionType);
      setDisclosures(prev => ({ ...prev, [transactionType]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to generate disclosures');
      console.error('Disclosures generation error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Assemble documents for appointment
  const assembleDocsForAppointment = async (appointmentId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await assembleDocuments(appointmentId);
      setAssembledDocs(prev => ({ ...prev, [appointmentId]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to assemble documents');
      console.error('Document assembly error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch audit trail
  const fetchAuditTrail = async (documentId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAuditTrail(documentId);
      setAuditTrails(prev => ({ ...prev, [documentId]: data }));
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch audit trail');
      console.error('Audit trail error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Voice command handler
  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('show documents') || lowerCommand.includes('compliance documents')) {
      return { action: 'SHOW_DOCUMENTS', data: documents };
    }

    if (lowerCommand.includes('generate disclosures') || lowerCommand.includes('create disclosures')) {
      return { action: 'GENERATE_DISCLOSURES' };
    }

    if (lowerCommand.includes('assemble documents') || lowerCommand.includes('prepare documents')) {
      return { action: 'ASSEMBLE_DOCUMENTS' };
    }

    if (lowerCommand.includes('audit trail') || lowerCommand.includes('show audit')) {
      return { action: 'SHOW_AUDIT_TRAIL' };
    }

    return null;
  };

  const value = {
    documents,
    disclosures,
    assembledDocs,
    auditTrails,
    loading,
    error,
    fetchDocuments,
    createDisclosures,
    assembleDocsForAppointment,
    fetchAuditTrail,
    handleVoiceCommand
  };

  return (
    <ComplianceContext.Provider value={value}>
      {children}
    </ComplianceContext.Provider>
  );
};

export default ComplianceContext;
