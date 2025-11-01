import { BaseModule } from './BaseModule';
import * as fs from 'fs';

/**
 * Module for managing WhatsApp Status (Stories)
 */
export class StatusModule extends BaseModule {
  /**
   * Send a text status
   */
  async sendText(session: string, text: string): Promise<any> {
    const data = { text };
    return this.post(`/api/${session}/status/text`, data);
  }

  /**
   * Send an image status
   */
  async sendImage(session: string, file: any, caption?: string): Promise<any> {
    let fileData = file;

    if (typeof file === 'string') {
      const fileContent = fs.readFileSync(file);
      const base64 = fileContent.toString('base64');
      fileData = { data: base64, mimetype: 'image/jpeg', filename: file };
    }

    const data: any = { file: fileData };
    if (caption) data.caption = caption;

    return this.post(`/api/${session}/status/image`, data);
  }

  /**
   * Send a voice status
   */
  async sendVoice(session: string, file: any): Promise<any> {
    let fileData = file;

    if (typeof file === 'string') {
      const fileContent = fs.readFileSync(file);
      const base64 = fileContent.toString('base64');
      fileData = { data: base64, mimetype: 'audio/ogg; codecs=opus', filename: file };
    }

    const data = { file: fileData };
    return this.post(`/api/${session}/status/voice`, data);
  }

  /**
   * Send a video status
   */
  async sendVideo(session: string, file: any, caption?: string): Promise<any> {
    let fileData = file;

    if (typeof file === 'string') {
      const fileContent = fs.readFileSync(file);
      const base64 = fileContent.toString('base64');
      fileData = { data: base64, mimetype: 'video/mp4', filename: file };
    }

    const data: any = { file: fileData };
    if (caption) data.caption = caption;

    return this.post(`/api/${session}/status/video`, data);
  }

  /**
   * Delete a status
   */
  async deleteStatus(session: string, messageId: string): Promise<any> {
    const data = { messageId };
    return this.post(`/api/${session}/status/delete`, data);
  }

  /**
   * Get new status message ID
   */
  async getNewMessageId(session: string): Promise<any> {
    return this.get(`/api/${session}/status/new-message-id`);
  }
}

