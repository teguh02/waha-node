/**
 * WAHA Node.js - Unofficial WhatsApp HTTP API Client
 * 
 * A complete, unofficial Node.js implementation for WAHA (WhatsApp HTTP API) that provides
 * a simple and intuitive interface to interact with WhatsApp through the WAHA server.
 * 
 * @example
 * Basic usage:
 * 
 * ```typescript
 * import { WahaClient } from 'waha-node';
 * 
 * const client = new WahaClient(
 *   'http://localhost:3000',
 *   'your-api-key'
 * );
 * 
 * // Send a text message
 * const result = await client.messages.sendText(
 *   'default',
 *   '1234567890@c.us',
 *   'Hello, World!'
 * );
 * 
 * // Get all sessions
 * const sessions = await client.sessions.list();
 * ```
 */

export const VERSION = '1.0.0';
export const AUTHOR = 'Teguh Rijanandi';

export { WahaClient } from './client';
export {
  WahaException,
  WahaAuthenticationException,
  WahaSessionException,
  WahaNotFoundException,
  WahaRateLimitException,
  WahaServerException,
} from './exceptions';

