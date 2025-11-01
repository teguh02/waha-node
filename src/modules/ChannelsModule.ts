import { BaseModule } from './BaseModule';

/**
 * Module for managing WhatsApp Channels
 */
export class ChannelsModule extends BaseModule {
  /**
   * List all channels
   */
  async list(session: string): Promise<any[]> {
    return this.request('GET', `/api/${session}/channels`);
  }

  /**
   * Get a specific channel
   */
  async getChannel(session: string, channelId: string): Promise<any> {
    return this.request('GET', `/api/${session}/channels/${channelId}`);
  }

  /**
   * Create a new channel
   */
  async create(session: string, name: string, description?: string): Promise<any> {
    const data: any = { name };
    if (description) data.description = description;

    return this.post(`/api/${session}/channels`, data);
  }

  /**
   * Delete a channel
   */
  async deleteChannel(session: string, channelId: string): Promise<any> {
    return this.request('DELETE', `/api/${session}/channels/${channelId}`);
  }

  /**
   * Get messages from a channel
   */
  async getMessages(session: string, channelId: string, limit?: number): Promise<any[]> {
    const params: any = {};
    if (limit !== undefined) params.limit = limit;

    return this.request('GET', `/api/${session}/chats/${channelId}/messages`, Object.keys(params).length > 0 ? params : undefined);
  }
}

