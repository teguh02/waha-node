# WAHA Node.js

**Unofficial** Node.js client library for [WAHA (WhatsApp HTTP API)](https://waha.devlike.pro) - a powerful solution to interact with WhatsApp Web through HTTP API.

[![Unofficial](https://img.shields.io/badge/Status-Unofficial-red.svg)](https://github.com/teguh02/waha-node)
[![Node Version](https://img.shields.io/badge/node-14+-blue.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![WAHA](https://img.shields.io/badge/WAHA-2025.9-orange.svg)](https://waha.devlike.pro)
[![npm version](https://img.shields.io/npm/v/waha-node.svg)](https://www.npmjs.com/package/waha-node)
[![npm downloads](https://img.shields.io/npm/dm/waha-node.svg)](https://www.npmjs.com/package/waha-node)

## Features

✅ **Complete API Coverage** - Support for all WAHA endpoints
- 📤 **Send Messages**: Text, Image, Video, Voice, File, Location, Contact, Poll
- 📥 **Receive Messages**: Webhooks and Event Handling
- 💬 **Chats Management**: List, Archive, Read, Delete
- 👤 **Contacts Management**: Get, Update, Block, Check Existence
- 👥 **Groups Management**: Create, Manage, Admin Controls
- 🟢 **Status Management**: Send and Manage WhatsApp Status
- 📢 **Channels Management**: Create and Manage Channels
- 🔐 **Session Management**: Create, Start, Stop, QR Code
- And much more!

✅ **Simple & Intuitive** - Clean, modern API design
✅ **TypeScript Support** - Full TypeScript definitions
✅ **Error Handling** - Comprehensive error handling
✅ **Documentation** - Complete documentation and examples

## Installation

```bash
npm install waha-node
```

Or using yarn:

```bash
yarn add waha-node
```

Or using pnpm:

```bash
pnpm add waha-node
```

Or install from source:

```bash
git clone https://github.com/teguh02/waha-node.git
cd waha-node
npm install
npm run build
```

## Quick Start

### 1. Start WAHA Server

First, you need to have WAHA server running. Follow the [Quick Start Guide](https://waha.devlike.pro/docs/overview/quick-start/):

```bash
docker pull devlikeapro/waha
docker run -it --env-file .env -v "$(pwd)/sessions:/app/.sessions" --rm -p 3000:3000 --name waha devlikeapro/waha
```

### 2. Use the Node.js Client

```typescript
import { WahaClient } from 'waha-node';

// Initialize the client
const client = new WahaClient(
  'http://localhost:3000',
  'your-api-key-here'  // Optional, if you set WAHA_API_KEY
);

// Send a text message
const result = await client.messages.sendText(
  'default',
  '1234567890@c.us',
  'Hello from Node.js! 👋'
);

console.log(result);
```

### 3. Create Session with QR Code

```typescript
// Create a new session
const session = await client.sessions.create(
  'my_session',
  {
    webhooks: [{
      url: 'https://your-webhook-url.com/webhook',
      events: ['message']
    }]
  }
);

// Get QR code for authentication
const qrCode = await client.sessions.getQr('my_session', 'image', true);
console.log(`QR Code (Base64): ${qrCode.data}`);

// Scan the QR code with your WhatsApp app
// The session status will change to WORKING
```

### 4. Receive Messages with Webhooks

Create a webhook server (example with Express):

```typescript
import express from 'express';
import { WahaClient } from 'waha-node';

const app = express();
const client = new WahaClient('http://localhost:3000', 'your-api-key');

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const data = req.body;
  
  if (data.event === 'message') {
    const payload = data.payload;
    const fromNumber = payload.from;
    const messageText = payload.body || '';
    
    console.log(`Received: ${messageText} from ${fromNumber}`);
    
    // Reply to the message
    await client.messages.sendText(
      data.session,
      fromNumber,
      `You said: ${messageText}`
    );
  }
  
  res.json({ status: 'ok' });
});

app.listen(3001, () => {
  console.log('Webhook server running on port 3001');
});
```

## Complete Examples

### Send Different Types of Messages

```typescript
import { WahaClient } from 'waha-node';

const client = new WahaClient('http://localhost:3000', 'your-api-key');

// Send text message
await client.messages.sendText(
  'default',
  '1234567890@c.us',
  'Hello World!'
);

// Send image with URL
await client.messages.sendImage(
  'default',
  '1234567890@c.us',
  { url: 'https://example.com/image.jpg', mimetype: 'image/jpeg' },
  'Check this out!'
);

// Send image from file
await client.messages.sendImage(
  'default',
  '1234567890@c.us',
  'path/to/image.jpg',
  'My image'
);

// Send video
await client.messages.sendVideo(
  'default',
  '1234567890@c.us',
  { url: 'https://example.com/video.mp4', mimetype: 'video/mp4' }
);

// Send voice message
await client.messages.sendVoice(
  'default',
  '1234567890@c.us',
  { url: 'https://example.com/voice.opus', mimetype: 'audio/ogg; codecs=opus' }
);

// Send document
await client.messages.sendFile(
  'default',
  '1234567890@c.us',
  { url: 'https://example.com/document.pdf', mimetype: 'application/pdf' }
);

// Send location
await client.messages.sendLocation(
  'default',
  '1234567890@c.us',
  38.8937255,
  -77.0969763,
  'My Location'
);

// Send contact
await client.messages.sendContact(
  'default',
  '1234567890@c.us',
  [{
    fullName: 'John Doe',
    organization: 'Company',
    phoneNumber: '+91 11111 11111',
    whatsappId: '911111111111'
  }]
);

// Send poll
await client.messages.sendPoll(
  'default',
  '1234567890@c.us',
  {
    name: 'How are you?',
    options: ['Awesome!', 'Good!', 'Not bad!'],
    multipleAnswers: false
  }
);
```

### Manage Sessions

```typescript
// List all active sessions
const sessions = await client.sessions.list();

// List all sessions including stopped ones
const allSessions = await client.sessions.list(true);

// Get specific session
const session = await client.sessions.getSession('default');

// Create session
const newSession = await client.sessions.create('my_session', { webhooks: [] });

// Start session
await client.sessions.start('my_session');

// Stop session
await client.sessions.stop('my_session');

// Restart session
await client.sessions.restart('my_session');

// Logout session
await client.sessions.logout('my_session');

// Delete session
await client.sessions.delete('my_session');

// Get QR code
const qr = await client.sessions.getQr('default', 'image', true);

// Request pairing code
const codeInfo = await client.sessions.requestCode('default', '12132132130');
console.log(`Pairing code: ${codeInfo.code}`);
```

### Manage Chats

```typescript
// List all chats
const chats = await client.chats.list('default');

// Get chat picture
const picture = await client.chats.getPicture('default', '1234567890@c.us');

// Archive chat
await client.chats.archive('default', '1234567890@c.us');

// Unarchive chat
await client.chats.unarchive('default', '1234567890@c.us');

// Mark as unread
await client.chats.unread('default', '1234567890@c.us');

// Read messages
await client.chats.readMessages('default', '1234567890@c.us');

// Get messages
const messages = await client.chats.getMessages('default', '1234567890@c.us', 100);

// Get specific message
const message = await client.chats.getMessage('default', '1234567890@c.us', 'message_id_here');

// Delete chat
await client.chats.delete('default', '1234567890@c.us');
```

### Manage Contacts

```typescript
// List all contacts
const contacts = await client.contacts.listAll('default');

// Get specific contact
const contact = await client.contacts.getContact('default', '1234567890');

// Update contact
await client.contacts.update('default', '1234567890@c.us', 'John', 'Doe');

// Check if phone exists
const result = await client.contacts.checkExists('default', '1234567890');
if (result.numberExists) {
  console.log(`Chat ID: ${result.chatId}`);
}

// Get contact about
const about = await client.contacts.getAbout('default', '1234567890');

// Get profile picture
const profilePic = await client.contacts.getProfilePicture('default', '1234567890');

// Block contact
await client.contacts.block('default', '1234567890@c.us');

// Unblock contact
await client.contacts.unblock('default', '1234567890@c.us');
```

### Manage Groups

```typescript
// List all groups
const groups = await client.groups.list('default');

// Get specific group
const group = await client.groups.get('default', '1234567890@g.us');

// Create group
const newGroup = await client.groups.create('default', 'My New Group', ['1234567890@c.us']);

// Update group name
await client.groups.updateSubject('default', '1234567890@g.us', 'Updated Name');

// Update group description
await client.groups.updateDescription('default', '1234567890@g.us', 'Description');

// Get invite code
const inviteCode = await client.groups.getInviteCode('default', '1234567890@g.us');

// Revoke invite code
await client.groups.revokeInviteCode('default', '1234567890@g.us');

// Get participants
const participants = await client.groups.getParticipants('default', '1234567890@g.us');

// Add participants
await client.groups.addParticipants('default', '1234567890@g.us', ['9876543210@c.us']);

// Remove participants
await client.groups.removeParticipants('default', '1234567890@g.us', ['9876543210@c.us']);

// Promote to admin
await client.groups.promoteAdmin('default', '1234567890@g.us', ['9876543210@c.us']);

// Demote from admin
await client.groups.demoteAdmin('default', '1234567890@g.us', ['9876543210@c.us']);

// Leave group
await client.groups.leave('default', '1234567890@g.us');
```

### Manage Status (Stories)

```typescript
// Send text status
await client.status.sendText('default', 'My status update');

// Send image status
await client.status.sendImage('default', { url: 'https://example.com/image.jpg', mimetype: 'image/jpeg' });

// Send video status
await client.status.sendVideo('default', { url: 'https://example.com/video.mp4', mimetype: 'video/mp4' });

// Send voice status
await client.status.sendVoice('default', { url: 'https://example.com/voice.opus', mimetype: 'audio/ogg; codecs=opus' });

// Delete status
await client.status.delete('default', 'message_id_here');

// Get new message ID
const messageId = await client.status.getNewMessageId('default');
```

### Manage Channels

```typescript
// List all channels
const channels = await client.channels.list('default');

// Get specific channel
const channel = await client.channels.get('default', 'channel_id');

// Create channel
const newChannel = await client.channels.create('default', 'My Channel', 'Description');

// Get channel messages
const messages = await client.channels.getMessages('default', 'channel_id', 100);

// Delete channel
await client.channels.delete('default', 'channel_id');
```

### Message Reactions and Actions

```typescript
// Add reaction
await client.messages.addReaction('default', 'message_id_here', '👍');

// Remove reaction
await client.messages.addReaction('default', 'message_id_here', '');

// Star message
await client.messages.starMessage('default', '1234567890@c.us', 'message_id_here');

// Unstar message
await client.messages.starMessage('default', '1234567890@c.us', 'message_id_here', false);

// Edit message
await client.messages.editMessage('default', '1234567890@c.us', 'message_id_here', 'Updated message');

// Delete message
await client.messages.deleteMessage('default', '1234567890@c.us', 'message_id_here');

// Forward message
await client.messages.forwardMessage('default', '1234567890@c.us', 'message_id_here');

// Pin message
await client.messages.pinMessage('default', '1234567890@c.us', 'message_id_here');

// Unpin message
await client.messages.unpinMessage('default', '1234567890@c.us', 'message_id_here');
```

## Error Handling

```typescript
import { WahaClient, WahaAuthenticationException, WahaNotFoundException } from 'waha-node';

try {
  const client = new WahaClient('http://localhost:3000', 'wrong-key');
  const result = await client.messages.sendText('default', '1234567890@c.us', 'Hello');
} catch (error) {
  if (error instanceof WahaAuthenticationException) {
    console.log('Authentication failed');
  } else if (error instanceof WahaNotFoundException) {
    console.log('Resource not found');
  } else {
    console.log('Error:', error.message);
  }
}
```

## Requirements

- Node.js 14.0+
- axios library
- WAHA server running (see [Quick Start Guide](https://waha.devlike.pro/docs/overview/quick-start/))

## Documentation

- [WAHA Documentation](https://waha.devlike.pro)
- [WAHA GitHub](https://github.com/devlikeapro/waha)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

- npm Package: [https://www.npmjs.com/package/waha-node](https://www.npmjs.com/package/waha-node)
- GitHub Issues: [https://github.com/teguh02/waha-node/issues](https://github.com/teguh02/waha-node/issues)
- WAHA Documentation: [https://waha.devlike.pro](https://waha.devlike.pro)

## Important Disclaimer

**This is an UNOFFICIAL community project** and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with:
- WhatsApp LLC or any of its subsidiaries or affiliates
- WAHA (devlikeapro) team

The official WhatsApp website can be found at [whatsapp.com](https://whatsapp.com).  
The official WAHA documentation can be found at [waha.devlike.pro](https://waha.devlike.pro).

"WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.

### Usage Warning

This library interacts with WhatsApp through unofficial means. There are risks associated with using unofficial WhatsApp clients:
- Account suspension or banning
- Security risks
- Data privacy concerns
- No official support

Use at your own risk. For business applications, we recommend using the [official WhatsApp Business API](https://developers.facebook.com/docs/whatsapp).

