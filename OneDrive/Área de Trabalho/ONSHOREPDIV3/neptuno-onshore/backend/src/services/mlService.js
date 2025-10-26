import axios from 'axios';
import { logger } from '../config/logger.js';

const ML_API_URL = process.env.ML_API_URL || 'http://localhost:8000';
const ML_API_KEY = process.env.ML_API_KEY || 'dev-key';

/**
 * Generate PDI content using ML API
 * @param {Object} projectData - Project data
 * @returns {Promise<Object>} Generated PDI content
 */
export const generatePDIContent = async (projectData) => {
  try {
    logger.info('Calling ML API for PDI generation...');

    const response = await axios.post(
      `${ML_API_URL}/api/generate-pdi`,
      {
        assetType: projectData.assetType,
        projectData: {
          name: projectData.name,
          fieldName: projectData.fieldName,
          basin: projectData.basin,
          operator: projectData.operator,
          location: projectData.location,
          technicalData: projectData.technicalData,
          environmentalData: projectData.environmentalData,
          methodology: projectData.methodology,
          estimatedCost: projectData.estimatedCost,
          estimatedDuration: projectData.estimatedDuration
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': ML_API_KEY
        },
        timeout: 30000 // 30 seconds
      }
    );

    logger.info('ML API response received successfully');

    return response.data;
  } catch (error) {
    logger.error('ML API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    // If ML service is down, throw error to trigger fallback
    throw new Error(`ML Service Error: ${error.message}`);
  }
};

/**
 * Health check for ML API
 * @returns {Promise<boolean>} ML API health status
 */
export const checkMLHealth = async () => {
  try {
    const response = await axios.get(`${ML_API_URL}/health`, {
      timeout: 5000
    });

    return response.status === 200;
  } catch (error) {
    logger.warn('ML API health check failed:', error.message);
    return false;
  }
};

/**
 * Get ML model info
 * @returns {Promise<Object>} Model information
 */
export const getMLModelInfo = async () => {
  try {
    const response = await axios.get(`${ML_API_URL}/api/model-info`, {
      headers: {
        'X-API-Key': ML_API_KEY
      },
      timeout: 5000
    });

    return response.data;
  } catch (error) {
    logger.error('Failed to get ML model info:', error.message);
    return null;
  }
};

export default {
  generatePDIContent,
  checkMLHealth,
  getMLModelInfo
};
