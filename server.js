import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { sendContactEmail, getTransporter } from './server/mailer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check & SMTP Status
app.get('/api/health', async (req, res) => {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    res.json({ status: 'ok', smtp: 'connected', receiver: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER });
  } catch (err) {
    res.status(500).json({ status: 'error', smtp: 'failed', error: err.message });
  }
});

// Contact Form Submission Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are all required.'
      });
    }

    const result = await sendContactEmail({ name, email, subject, message });
    res.json({
      success: true,
      message: 'Your message has been delivered to Pankaj Dixit via email!',
      messageId: result.messageId,
      inquiryId: result.inquiryId
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send message. Please try again or email directly.'
    });
  }
});

// View all saved inquiries
app.get('/api/inquiries', (req, res) => {
  try {
    const inquiriesPath = path.join(__dirname, 'server', 'inquiries.json');
    if (fs.existsSync(inquiriesPath)) {
      const data = JSON.parse(fs.readFileSync(inquiriesPath, 'utf-8') || '[]');
      res.json({ success: true, count: data.length, inquiries: data });
    } else {
      res.json({ success: true, count: 0, inquiries: [] });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve frontend in production if dist exists
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP configured for: ${process.env.EMAIL_USER}`);
});
