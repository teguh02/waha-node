import { BaseModule } from './BaseModule';

/**
 * Module for managing WhatsApp contacts
 */
export class ContactsModule extends BaseModule {
  /**
   * Get all contacts
   */
  async listAll(
    session: string,
    limit?: number,
    offset?: number,
    sortBy?: string,
    sortOrder?: string
  ): Promise<any[]> {
    const params: any = { session };
    if (limit !== undefined) params.limit = limit;
    if (offset !== undefined) params.offset = offset;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;

    return this.get('/api/contacts/all', params);
  }

  /**
   * Get a specific contact
   */
  async getContact(session: string, contactId: string): Promise<any> {
    const params = { session, contactId };
    return this.request('GET', '/api/contacts', params);
  }

  /**
   * Update a contact
   */
  async update(session: string, chatId: string, firstName: string, lastName: string): Promise<any> {
    const data = { firstName, lastName };
    return this.put(`/api/${session}/contacts/${chatId}`, data);
  }

  /**
   * Check if a phone number exists in WhatsApp
   */
  async checkExists(session: string, phone: string): Promise<any> {
    const params = { session, phone };
    return this.get('/api/contacts/check-exists', params);
  }

  /**
   * Get contact's "about" information
   */
  async getAbout(session: string, contactId: string): Promise<any> {
    const params = { session, contactId };
    return this.get('/api/contacts/about', params);
  }

  /**
   * Get contact's profile picture
   */
  async getProfilePicture(session: string, contactId: string, refresh: boolean = false): Promise<any> {
    const params: any = { session, contactId };
    if (refresh) params.refresh = true;
    return this.get('/api/contacts/profile-picture', params);
  }

  /**
   * Block a contact
   */
  async block(session: string, chatId: string): Promise<any> {
    const data = { session, chatId };
    return this.post('/api/contacts/block', data);
  }

  /**
   * Unblock a contact
   */
  async unblock(session: string, chatId: string): Promise<any> {
    const data = { session, chatId };
    return this.post('/api/contacts/unblock', data);
  }
}

