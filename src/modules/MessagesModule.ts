import { BaseModule } from './BaseModule';
import * as fs from 'fs';

/**
 * Module for sending and receiving WhatsApp messages
 */
export class MessagesModule extends BaseModule {
  /**
   * Send a text message
   */
  async sendText(
    session: string,
    chatId: string,
    text: string,
    replyTo?: string,
    mentions?: string[],
    linkPreview: boolean = true,
    linkPreviewHighQuality: boolean = false
  ): Promise<any> {
    const data: any = {
      session,
      chatId,
      text,
    };

    if (replyTo) data.reply_to = replyTo;
    if (mentions) data.mentions = mentions;
    if (!linkPreview) data.linkPreview = false;
    if (linkPreviewHighQuality) data.linkPreviewHighQuality = true;

    return this.post('/api/sendText', data);
  }

  /**
   * Mark message(s) as seen
   */
  async sendSeen(
    session: string,
    chatId: string,
    messageIds?: string[],
    participant?: string
  ): Promise<any> {
    const data: any = { session, chatId };

    if (messageIds) data.messageIds = messageIds;
    if (participant) data.participant = participant;

    return this.post('/api/sendSeen', data);
  }

  /**
   * Send an image
   */
  async sendImage(session: string, chatId: string, file: any, caption?: string): Promise<any> {
    let fileData = file;

    if (typeof file === 'string') {
      const fileContent = fs.readFileSync(file);
      const base64 = fileContent.toString('base64');
      fileData = { data: base64, mimetype: 'image/jpeg', filename: file };
    }

    const data: any = { session, chatId, file: fileData };

    if (caption) data.caption = caption;

    return this.post('/api/sendImage', data);
  }

  /**
   * Send a video
   */
  async sendVideo(
    session: string,
    chatId: string,
    file: any,
    caption?: string,
    asNote: boolean = false,
    convert: boolean = false
  ): Promise<any> {
    let fileData = file;

    if (typeof file === 'string') {
      const fileContent = fs.readFileSync(file);
      const base64 = fileContent.toString('base64');
      fileData = { data: base64, mimetype: 'video/mp4', filename: file };
    }

    const data: any = { session, chatId, file: fileData };

    if (caption) data.caption = caption;
    if (asNote) data.asNote = true;
    if (convert) data.convert = true;

    return this.post('/api/sendVideo', data);
  }

  /**
   * Send a voice message
   */
  async sendVoice(session: string, chatId: string, file: any, convert: boolean = false): Promise<any> {
    let fileData = file;

    if (typeof file === 'string') {
      const fileContent = fs.readFileSync(file);
      const base64 = fileContent.toString('base64');
      fileData = { data: base64, mimetype: 'audio/ogg; codecs=opus', filename: file };
    }

    const data: any = { session, chatId, file: fileData };

    if (convert) data.convert = true;

    return this.post('/api/sendVoice', data);
  }

  /**
   * Send a file (document)
   */
  async sendFile(session: string, chatId: string, file: any, caption?: string): Promise<any> {
    let fileData = file;

    if (typeof file === 'string') {
      const fileContent = fs.readFileSync(file);
      const base64 = fileContent.toString('base64');
      fileData = { data: base64, mimetype: 'application/octet-stream', filename: file };
    }

    const data: any = { session, chatId, file: fileData };

    if (caption) data.caption = caption;

    return this.post('/api/sendFile', data);
  }

  /**
   * Send a location
   */
  async sendLocation(
    session: string,
    chatId: string,
    latitude: number,
    longitude: number,
    title?: string
  ): Promise<any> {
    const data: any = { session, chatId, latitude, longitude };

    if (title) data.title = title;

    return this.post('/api/sendLocation', data);
  }

  /**
   * Send contact(s) (vCard)
   */
  async sendContact(session: string, chatId: string, contacts: any[]): Promise<any> {
    const data = { session, chatId, contacts };
    return this.post('/api/sendContactVcard', data);
  }

  /**
   * Send a poll
   */
  async sendPoll(session: string, chatId: string, poll: any): Promise<any> {
    const data = { session, chatId, poll };
    return this.post('/api/sendPoll', data);
  }

  /**
   * Forward a message
   */
  async forwardMessage(session: string, chatId: string, messageId: string): Promise<any> {
    const data = { session, chatId, messageId };
    return this.post('/api/forwardMessage', data);
  }

  /**
   * Add a reaction to a message
   */
  async addReaction(session: string, messageId: string, reaction: string): Promise<any> {
    const data = { session, messageId, reaction };
    return this.put('/api/reaction', data);
  }

  /**
   * Star or unstar a message
   */
  async starMessage(session: string, chatId: string, messageId: string, star: boolean = true): Promise<any> {
    const data = { session, chatId, messageId, star };
    return this.put('/api/star', data);
  }

  /**
   * Edit a message
   */
  async editMessage(
    session: string,
    chatId: string,
    messageId: string,
    text: string,
    linkPreview: boolean = true
  ): Promise<any> {
    const data: any = { text };
    if (!linkPreview) data.linkPreview = false;

    return this.put(`/api/${session}/chats/${chatId}/messages/${messageId}`, data);
  }

  /**
   * Delete a message
   */
  async deleteMessage(session: string, chatId: string, messageId: string): Promise<any> {
    return this.request('DELETE', `/api/${session}/chats/${chatId}/messages/${messageId}`);
  }

  /**
   * Pin a message
   */
  async pinMessage(session: string, chatId: string, messageId: string): Promise<any> {
    return this.post(`/api/${session}/chats/${chatId}/messages/${messageId}/pin`);
  }

  /**
   * Unpin a message
   */
  async unpinMessage(session: string, chatId: string, messageId: string): Promise<any> {
    return this.post(`/api/${session}/chats/${chatId}/messages/${messageId}/unpin`);
  }
}

