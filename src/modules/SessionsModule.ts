import { BaseModule } from './BaseModule';

/**
 * Module for managing WAHA sessions
 * A session represents a WhatsApp account connected to WAHA
 */
export class SessionsModule extends BaseModule {
  /**
   * List all sessions
   * 
   * @param allSessions If true, returns all sessions including STOPPED ones
   * @returns List of session information
   */
  async list(allSessions: boolean = false): Promise<any[]> {
    const params = allSessions ? { all: true } : undefined;
    return this.get('/api/sessions', params);
  }

  /**
   * Get session information
   * 
   * @param sessionName Name of the session
   * @returns Session information
   */
  async getSession(sessionName: string): Promise<any> {
    return this.request('GET', `/api/sessions/${sessionName}`);
  }

  /**
   * Create a new session
   * 
   * @param name Session name (optional, will be auto-generated if not provided)
   * @param config Session configuration (optional)
   * @param start Whether to start the session immediately (default: true)
   * @returns Created session information
   */
  async create(name?: string, config?: any, start: boolean = true): Promise<any> {
    const data: any = {};
    if (name) data.name = name;
    if (config) data.config = config;
    if (!start) data.start = false;

    return this.post('/api/sessions', data);
  }

  /**
   * Update session configuration
   * 
   * @param sessionName Name of the session
   * @param config New configuration (full config required)
   * @returns Updated session information
   */
  async update(sessionName: string, config: any): Promise<any> {
    const data = { name: sessionName, config };
    return this.request('PUT', `/api/sessions/${sessionName}`, undefined, data);
  }

  /**
   * Start a session
   * 
   * @param sessionName Name of the session
   * @returns Session information
   */
  async start(sessionName: string): Promise<any> {
    return this.post(`/api/sessions/${sessionName}/start`);
  }

  /**
   * Stop a session
   * 
   * @param sessionName Name of the session
   * @returns Session information
   */
  async stop(sessionName: string): Promise<any> {
    return this.post(`/api/sessions/${sessionName}/stop`);
  }

  /**
   * Restart a session
   * 
   * @param sessionName Name of the session
   * @returns Session information
   */
  async restart(sessionName: string): Promise<any> {
    return this.post(`/api/sessions/${sessionName}/restart`);
  }

  /**
   * Logout from a session
   * 
   * @param sessionName Name of the session
   * @returns Logout result
   */
  async logout(sessionName: string): Promise<any> {
    return this.post(`/api/sessions/${sessionName}/logout`);
  }

  /**
   * Delete a session
   * 
   * @param sessionName Name of the session
   * @returns Delete result
   */
  async delete(sessionName: string): Promise<any> {
    return this.request('DELETE', `/api/sessions/${sessionName}`);
  }

  /**
   * Get information about the associated account for the session
   * 
   * @param sessionName Name of the session
   * @returns Account information or null if not authenticated
   */
  async getMe(sessionName: string): Promise<any> {
    return this.get(`/api/sessions/${sessionName}/me`);
  }

  /**
   * Get QR code for pairing WhatsApp
   * 
   * @param sessionName Name of the session
   * @param format QR format ('image' or 'raw')
   * @param acceptJson If true, returns JSON with base64 data
   * @returns QR code data (binary, base64, or raw value)
   */
  async getQr(sessionName: string, format: string = 'image', acceptJson: boolean = false): Promise<any> {
    const endpoint = `/api/${sessionName}/auth/qr`;
    const params = { format };

    if (acceptJson || format === 'raw') {
      return this.request('GET', endpoint, params);
    }

    return this.request('GET', endpoint, params);
  }

  /**
   * Request authentication code for pairing
   * 
   * @param sessionName Name of the session
   * @param phoneNumber Phone number to pair with
   * @returns Pairing code information
   */
  async requestCode(sessionName: string, phoneNumber: string): Promise<any> {
    const data = { phoneNumber };
    return this.post(`/api/${sessionName}/auth/request-code`, data);
  }

  /**
   * Get screenshot of the session
   * 
   * @param sessionName Name of the session
   * @param acceptJson If true, returns JSON with base64 data
   * @returns Screenshot data (binary or base64)
   */
  async getScreenshot(sessionName: string, acceptJson: boolean = false): Promise<any> {
    const endpoint = '/api/screenshot';
    const params = { session: sessionName };

    if (acceptJson) {
      return this.request('GET', endpoint, params);
    }

    return this.request('GET', endpoint, params);
  }
}

