import { BaseModule } from './BaseModule';

/**
 * Module for managing WhatsApp chats
 */
export class ChatsModule extends BaseModule {
  /**
   * Get all chats
   */
  async list(session: string, limit?: number, offset?: number): Promise<any[]> {
    const params: any = {};
    if (limit !== undefined) params.limit = limit;
    if (offset !== undefined) params.offset = offset;

    return this.get(`/api/${session}/chats`, Object.keys(params).length > 0 ? params : undefined);
  }

  /**
   * Get chats overview
   */
  async getOverview(session: string): Promise<any> {
    return this.get(`/api/${session}/chats/overview`);
  }

  /**
   * Get chat picture
   */
  async getPicture(session: string, chatId: string, acceptJson: boolean = false): Promise<any> {
    const endpoint = `/api/${session}/chats/${chatId}/picture`;

    if (acceptJson) {
      return this.request('GET', endpoint);
    }

    return this.get(endpoint);
  }

  /**
   * Mark chat as unread
   */
  async unread(session: string, chatId: string): Promise<any> {
    return this.post(`/api/${session}/chats/${chatId}/unread`);
  }

  /**
   * Archive a chat
   */
  async archive(session: string, chatId: string): Promise<any> {
    return this.post(`/api/${session}/chats/${chatId}/archive`);
  }

  /**
   * Unarchive a chat
   */
  async unarchive(session: string, chatId: string): Promise<any> {
    return this.post(`/api/${session}/chats/${chatId}/unarchive`);
  }

  /**
   * Delete a chat
   */
  async deleteChat(session: string, chatId: string): Promise<any> {
    return this.request('DELETE', `/api/${session}/chats/${chatId}`);
  }

  /**
   * Read messages in a chat
   */
  async readMessages(session: string, chatId: string, messageIds?: string[]): Promise<any> {
    const data: any = {};
    if (messageIds) data.messageIds = messageIds;

    return this.post(`/api/${session}/chats/${chatId}/messages/read`, data);
  }

  /**
   * Get messages from a chat
   */
  async getMessages(session: string, chatId: string, limit?: number, downloadMedia: boolean = false): Promise<any[]> {
    const params: any = {};
    if (limit !== undefined) params.limit = limit;
    if (downloadMedia) params.downloadMedia = true;

    return this.get(`/api/${session}/chats/${chatId}/messages`, Object.keys(params).length > 0 ? params : undefined);
  }

  /**
   * Get a specific message by ID
   */
  async getMessage(session: string, chatId: string, messageId: string, downloadMedia: boolean = false): Promise<any> {
    const params: any = {};
    if (downloadMedia) params.downloadMedia = true;

    return this.get(`/api/${session}/chats/${chatId}/messages/${messageId}`, Object.keys(params).length > 0 ? params : undefined);
  }
}

