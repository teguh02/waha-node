import { WahaClient } from '../client';

/**
 * Base class for all WAHA modules
 * Provides common functionality for sub-modules
 */
export abstract class BaseModule {
  protected client: WahaClient;

  constructor(client: WahaClient) {
    this.client = client;
  }

  /**
   * Make a request through the client
   */
  protected request(method: string, endpoint: string, params?: Record<string, any>, jsonData?: any): Promise<any> {
    return this.client.request(method, endpoint, params, jsonData);
  }

  /**
   * Make a GET request
   */
  protected get(endpoint: string, params?: Record<string, any>): Promise<any> {
    return this.client.get(endpoint, params);
  }

  /**
   * Make a POST request
   */
  protected post(endpoint: string, jsonData?: any): Promise<any> {
    return this.client.post(endpoint, jsonData);
  }

  /**
   * Make a PUT request
   */
  protected put(endpoint: string, jsonData?: any): Promise<any> {
    return this.client.put(endpoint, jsonData);
  }

  /**
   * Make a DELETE request
   */
  protected delete(endpoint: string): Promise<any> {
    return this.client.delete(endpoint);
  }
}

