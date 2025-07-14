import axios from 'axios';

/**
 * Test Data Service - Centralized service for generating test data via MCP server
 */
export class TestDataService {
  private static readonly MCP_BASE_URL = 'http://localhost:3001/generate';

  /**
   * Generate test data for creating new leads
   * @param count Number of lead records to generate
   * @returns Promise<Array> Array of lead data objects
   */
  static async getCreateLeadData(count: number = 1) {
    const response = await axios.post(this.MCP_BASE_URL, {
      feature: 'create_lead',
      count
    });
    return response.data;
  }

  /**
   * Generate test data for updating existing leads
   * @param count Number of update lead records to generate
   * @returns Promise<Array> Array of update lead data objects with old/new values
   */
  static async getUpdateLeadData(count: number = 1) {
    const response = await axios.post(this.MCP_BASE_URL, {
      feature: 'update_lead', 
      count
    });
    return response.data;
  }

  /**
   * Generate test data for deleting leads
   * @param count Number of delete lead records to generate
   * @returns Promise<Array> Array of lead IDs for deletion
   */
  static async getDeleteLeadData(count: number = 1) {
    const response = await axios.post(this.MCP_BASE_URL, {
      feature: 'delete_lead',
      count
    });
    return response.data;
  }

  /**
   * Generate test data for merging leads
   * @param count Number of merge lead pairs to generate
   * @returns Promise<Array> Array of merge data with from/to lead IDs
   */
  static async getMergeLeadData(count: number = 1) {
    const response = await axios.post(this.MCP_BASE_URL, {
      feature: 'merge_lead',
      count
    });
    return response.data;
  }
}
