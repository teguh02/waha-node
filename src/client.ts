import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  WahaException,
  WahaAuthenticationException,
  WahaNotFoundException,
  WahaRateLimitException,
  WahaServerException,
} from './exceptions';
import { SessionsModule } from './modules/SessionsModule';
import { MessagesModule } from './modules/MessagesModule';
import { ChatsModule } from './modules/ChatsModule';
import { ContactsModule } from './modules/ContactsModule';
import { GroupsModule } from './modules/GroupsModule';
import { StatusModule } from './modules/StatusModule';
import { ProfileModule } from './modules/ProfileModule';
import { ChannelsModule } from './modules/ChannelsModule';

/**
 * WAHA (WhatsApp HTTP API) Node.js Client
 * 
 * This is the main client class that provides a high-level interface
 * to interact with the WAHA server.
 * 
 * @example
 * ```typescript
 * import { WahaClient } from 'waha-node';
 * 
 * const client = new WahaClient('http://localhost:3000', 'your-api-key');
 * 
 * // Send a text message
 * const result = await client.messages.sendText(
 *   'default',
 *   '1234567890@c.us',
 *   'Hello, World!'
 * );
 * ```
 */
export class WahaClient {
  protected baseUrl: string;
  private apiKey?: string;
  private timeout: number;
  private axiosInstance!: AxiosInstance;

  public sessions: SessionsModule;
  public messages: MessagesModule;
  public chats: ChatsModule;
  public contacts: ContactsModule;
  public groups: GroupsModule;
  public status: StatusModule;
  public profile: ProfileModule;
  public channels: ChannelsModule;

  /**
   * Initialize the WAHA client
   * 
   * @param baseUrl Base URL of the WAHA server
   * @param apiKey API key for authentication
   * @param timeout Request timeout in seconds
   */
  constructor(baseUrl: string = 'http://localhost:3000', apiKey?: string, timeout: number = 30000) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.apiKey = apiKey;
    this.timeout = timeout;

    this.setupAxiosInstance();

    // Initialize sub-modules
    this.sessions = new SessionsModule(this);
    this.messages = new MessagesModule(this);
    this.chats = new ChatsModule(this);
    this.contacts = new ContactsModule(this);
    this.groups = new GroupsModule(this);
    this.status = new StatusModule(this);
    this.profile = new ProfileModule(this);
    this.channels = new ChannelsModule(this);
  }

  private setupAxiosInstance(): void {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.apiKey) {
      headers['X-Api-Key'] = this.apiKey;
    }

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers,
    });
  }

  /**
   * Make a request to the WAHA API
   * 
   * @param method HTTP method (GET, POST, PUT, DELETE)
   * @param endpoint API endpoint (e.g., "/api/sessions")
   * @param params URL parameters
   * @param jsonData JSON body data
   * @returns Response data
   */
  async request(
    method: string,
    endpoint: string,
    params?: Record<string, any>,
    jsonData?: any
  ): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.request({
        method,
        url: endpoint,
        params,
        data: jsonData,
      });
      return this.handleResponse(response);
    } catch (error: any) {
      if (error.response) {
        return this.handleResponse(error.response);
      }
      throw new WahaException(`Request failed: ${error.message}`);
    }
  }

  private handleResponse(response: AxiosResponse): any {
    const statusCode = response.status;
    const contentType = response.headers['content-type'] || '';

    // Handle different status codes
    if (statusCode === 401) {
      throw new WahaAuthenticationException(
        'Authentication failed. Please check your API key.'
      );
    } else if (statusCode === 404) {
      throw new WahaNotFoundException('Resource not found');
    } else if (statusCode === 429) {
      throw new WahaRateLimitException('Rate limit exceeded. Please try again later.');
    } else if (statusCode >= 500) {
      const errorMsg = response.data?.message || 'Server error';
      throw new WahaServerException(`${errorMsg} (Status: ${statusCode})`);
    }

    // Handle successful responses
    if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
      if (contentType.includes('application/json')) {
        return response.data;
      } else if (contentType.includes('image/') || contentType.includes('application/octet-stream')) {
        return response.data;
      } else {
        return response.data;
      }
    }

    // Handle other error codes
    if (statusCode >= 400) {
      const errorMsg = response.data?.message || 'Unknown error';
      throw new WahaException(`${errorMsg} (Status: ${statusCode})`);
    }

    return response.data;
  }

  /**
   * Make a GET request
   */
  async get(endpoint: string, params?: Record<string, any>): Promise<any> {
    return this.request('GET', endpoint, params);
  }

  /**
   * Make a POST request
   */
  async post(endpoint: string, jsonData?: any): Promise<any> {
    return this.request('POST', endpoint, undefined, jsonData);
  }

  /**
   * Make a PUT request
   */
  async put(endpoint: string, jsonData?: any): Promise<any> {
    return this.request('PUT', endpoint, undefined, jsonData);
  }

  /**
   * Make a DELETE request
   */
  async delete(endpoint: string): Promise<any> {
    return this.request('DELETE', endpoint);
  }
}

