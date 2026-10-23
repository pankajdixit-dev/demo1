import { sendContactEmail } from '../server/mailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    const result = await sendContactEmail({ name, email, subject, message });
    return res.status(200).json({
      success: true,
      message: 'Your message has been delivered to Pankaj Dixit via email!',
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Serverless Contact Handler Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send message.'
    });
  }
}
