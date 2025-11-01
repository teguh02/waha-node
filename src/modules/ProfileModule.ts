import { WahaClient } from '../client';

/**
 * Module for managing WhatsApp profile
 */
export class ProfileModule {
  private client: WahaClient;

  constructor(client: WahaClient) {
    this.client = client;
  }

  /**
   * Get profile picture URL
   */
  getPictureUrl(session: string): string {
    // Access protected property - we need to cast or use a getter
    // For now, using a direct property access assuming baseUrl is protected
    const baseUrl = (this.client as any).baseUrl;
    return `${baseUrl}/api/${session}/profile/picture`;
  }
}

