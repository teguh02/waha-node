import { BaseModule } from './BaseModule';

/**
 * Module for managing WhatsApp groups
 */
export class GroupsModule extends BaseModule {
  /**
   * Get all groups
   */
  async list(session: string): Promise<any[]> {
    return this.request('GET', `/api/${session}/groups`);
  }

  /**
   * Get count of groups
   */
  async getCount(session: string): Promise<any> {
    return this.request('GET', `/api/${session}/groups/count`);
  }

  /**
   * Get a specific group
   */
  async getGroup(session: string, groupId: string): Promise<any> {
    return this.request('GET', `/api/${session}/groups/${groupId}`);
  }

  /**
   * Create a new group
   */
  async create(session: string, subject: string, participants?: string[]): Promise<any> {
    const data: any = { subject };
    if (participants) data.participants = participants;

    return this.post(`/api/${session}/groups`, data);
  }

  /**
   * Leave a group
   */
  async leave(session: string, groupId: string): Promise<any> {
    return this.post(`/api/${session}/groups/${groupId}/leave`);
  }

  /**
   * Update group subject (name)
   */
  async updateSubject(session: string, groupId: string, subject: string): Promise<any> {
    const data = { subject };
    return this.put(`/api/${session}/groups/${groupId}/subject`, data);
  }

  /**
   * Update group description
   */
  async updateDescription(session: string, groupId: string, description: string): Promise<any> {
    const data = { description };
    return this.put(`/api/${session}/groups/${groupId}/description`, data);
  }

  /**
   * Get group invite code
   */
  async getInviteCode(session: string, groupId: string): Promise<any> {
    return this.request('GET', `/api/${session}/groups/${groupId}/invite-code`);
  }

  /**
   * Revoke group invite code
   */
  async revokeInviteCode(session: string, groupId: string): Promise<any> {
    return this.post(`/api/${session}/groups/${groupId}/invite-code/revoke`);
  }

  /**
   * Get group picture
   */
  async getPicture(session: string, groupId: string, acceptJson: boolean = false): Promise<any> {
    const endpoint = `/api/${session}/groups/${groupId}/picture`;

    if (acceptJson) {
      return this.request('GET', endpoint);
    }

    return this.request('GET', endpoint);
  }

  /**
   * Get group participants
   */
  async getParticipants(session: string, groupId: string): Promise<any[]> {
    return this.request('GET', `/api/${session}/groups/${groupId}/participants`);
  }

  /**
   * Add participants to a group
   */
  async addParticipants(session: string, groupId: string, participants: string[]): Promise<any> {
    const data = { participants };
    return this.post(`/api/${session}/groups/${groupId}/participants/add`, data);
  }

  /**
   * Remove participants from a group
   */
  async removeParticipants(session: string, groupId: string, participants: string[]): Promise<any> {
    const data = { participants };
    return this.post(`/api/${session}/groups/${groupId}/participants/remove`, data);
  }

  /**
   * Promote participants to admin
   */
  async promoteAdmin(session: string, groupId: string, participants: string[]): Promise<any> {
    const data = { participants };
    return this.post(`/api/${session}/groups/${groupId}/admin/promote`, data);
  }

  /**
   * Demote participants from admin
   */
  async demoteAdmin(session: string, groupId: string, participants: string[]): Promise<any> {
    const data = { participants };
    return this.post(`/api/${session}/groups/${groupId}/admin/demote`, data);
  }
}

