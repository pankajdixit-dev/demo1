import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');

// Initialize inquiries.json if not present
if (!fs.existsSync(INQUIRIES_FILE)) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to initialize inquiries.json:', e.message);
  }
}

// Function to safely save inquiry to disk
function saveInquiryToDisk(inquiry) {
  try {
    let list = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      list = JSON.parse(raw || '[]');
    }
    list.unshift(inquiry); // newest first
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
    console.log(`[STORAGE] Saved inquiry to disk: ${inquiry.id} (${inquiry.name} - ${inquiry.email})`);
  } catch (err) {
    console.error('[STORAGE ERROR] Could not save inquiry to disk:', err.message);
  }
}

// Create reusable Gmail SMTP transporter
export function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS?.replace(/\s+/g, ''); // strip spaces

  if (!user || !pass) {
    throw new Error('SMTP credentials missing. Please set EMAIL_USER and EMAIL_PASS in .env');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass
    }
  });
}

/**
 * Send contact enquiry email to Pankaj and confirmation email to the visitor
 */
export async function sendContactEmail({ name, email, subject, message }) {
  console.log(`\n========================================`);
  console.log(`[CONTACT RECEIVED] Incoming form submission:`);
  console.log(`  Name:    ${name}`);
  console.log(`  Email:   ${email}`);
  console.log(`  Subject: ${subject}`);
  console.log(`  Message: ${message}`);
  console.log(`========================================`);

  // Input validation
  if (!name || !email || !message) {
    throw new Error('Name, email, and message are required fields.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email address format.');
  }

  const transporter = getTransporter();
  const receiverEmail = process.env.CONTACT_RECEIVER || process.env.EMAIL_USER || 'pankaj.dixit9070@gmail.com';
  const cleanedSubject = (subject && subject.trim()) || 'New Portfolio Inquiry';
  const inquiryId = `INQ-${Date.now().toString().slice(-5)}`;
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  // Save to disk first so no enquiry is EVER lost
  const inquiryRecord = {
    id: inquiryId,
    timestamp,
    name,
    email,
    subject: cleanedSubject,
    message,
    receiver: receiverEmail,
    createdAt: new Date().toISOString()
  };
  saveInquiryToDisk(inquiryRecord);

  // 1. Email HTML content
  const notificationHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%); padding: 28px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; color: #ffffff; letter-spacing: -0.5px; font-weight: 700; }
        .header p { margin: 6px 0 0; font-size: 14px; color: rgba(255,255,255,0.9); }
        .badge { display: inline-block; background: rgba(0,0,0,0.25); color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-top: 8px; font-family: monospace; }
        .body { padding: 28px 24px; }
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .info-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #1e293b; }
        .info-label { color: #94a3b8; font-weight: 600; width: 130px; }
        .info-value { color: #f8fafc; }
        .info-value a { color: #38bdf8; text-decoration: none; font-weight: 500; }
        .message-label { font-size: 14px; font-weight: 600; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .message-box { background: #0b0f19; border: 1px solid #334155; border-left: 4px solid #6366f1; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap; }
        .reply-btn-wrap { text-align: center; margin-top: 28px; }
        .reply-btn { display: inline-block; background: #3b82f6; color: #ffffff !important; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
        .footer { padding: 16px 24px; background: #0c1222; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>📬 New Portfolio Enquiry Received</h1>
          <p>Someone reached out through your portfolio contact page</p>
          <span class="badge">Reference: #${inquiryId}</span>
        </div>
        <div class="body">
          <table class="info-table">
            <tr>
              <td class="info-label">Sender Name:</td>
              <td class="info-value"><strong>${name}</strong></td>
            </tr>
            <tr>
              <td class="info-label">Sender Email:</td>
              <td class="info-value"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td class="info-label">Subject:</td>
              <td class="info-value"><strong>${cleanedSubject}</strong></td>
            </tr>
            <tr>
              <td class="info-label">Received At:</td>
              <td class="info-value">${timestamp}</td>
            </tr>
          </table>

          <div class="message-label">Enquiry Message:</div>
          <div class="message-box">${message}</div>

          <div class="reply-btn-wrap">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(cleanedSubject)}" class="reply-btn">
              Reply to ${name} (${email}) &rarr;
            </a>
          </div>
        </div>
        <div class="footer">
          Pankaj Dixit Portfolio &bull; Vishnupuri, Indore (M.P.) &bull; Automated SMTP Relay
        </div>
      </div>
    </body>
    </html>
  `;

  const notificationText = `
New Portfolio Enquiry [${inquiryId}]
==============================
From: ${name} (${email})
Subject: ${cleanedSubject}
Time: ${timestamp}

Message:
${message}

Reply directly to: ${email}
  `.trim();

  // Determine recipients:
  // We send the notification to Pankaj (receiverEmail).
  // If the user typed a different email in the form, we ALSO send a copy so they can verify receipt in that inbox too!
  const recipients = [receiverEmail];
  if (email.toLowerCase() !== receiverEmail.toLowerCase()) {
    recipients.push(email);
  }

  console.log(`[SMTP] Sending enquiry notification to: ${recipients.join(', ')}...`);

  const info = await transporter.sendMail({
    from: `"Pankaj Dixit Portfolio" <${process.env.EMAIL_USER}>`,
    to: recipients.join(', '),
    replyTo: `"${name}" <${email}>`,
    subject: `📩 [#${inquiryId}] New Enquiry from ${name}: ${cleanedSubject}`,
    text: notificationText,
    html: notificationHtml
  });

  console.log(`[SMTP SUCCESS] Main email sent! Message ID: ${info.messageId}`);

  // Send polite confirmation auto-reply to the visitor (fire and forget, non-blocking)
  transporter.sendMail({
    from: `"Pankaj Dixit" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for contacting Pankaj Dixit! [Ref: #${inquiryId}]`,
    text: `Hi ${name},\n\nThank you for reaching out through my portfolio website. I have received your message regarding "${cleanedSubject}" and will get back to you shortly.\n\nBest regards,\nPankaj Dixit\nFull Stack Developer\n+91 8962129815`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px;">
        <div style="max-width: 580px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden; padding: 28px;">
          <h2 style="color: #38bdf8; margin-top: 0;">Hi ${name},</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">
            Thank you for reaching out through my portfolio website! I have received your message regarding <strong>"${cleanedSubject}"</strong>.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1;">
            I am currently reviewing your inquiry and will reply to you as soon as possible.
          </p>
          <div style="margin: 20px 0; padding: 14px 18px; background: #0b0f19; border-left: 3px solid #38bdf8; border-radius: 6px;">
            <p style="margin: 0; font-size: 13px; color: #94a3b8;"><strong>A copy of your message:</strong></p>
            <p style="margin: 6px 0 0; font-size: 14px; color: #e2e8f0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 14px; color: #cbd5e1; margin-top: 24px;">
            Best regards,<br>
            <strong style="color: #ffffff;">Pankaj Dixit</strong><br>
            <span style="font-size: 13px; color: #94a3b8;">Full Stack MERN Developer</span><br>
            <span style="font-size: 13px; color: #94a3b8;">Indore, Madhya Pradesh | +91 8962129815</span>
          </p>
        </div>
      </body>
      </html>
    `
  }).catch((err) => {
    console.warn('[SMTP AUTO-REPLY] Auto-reply notification:', err.message);
  });

  return { success: true, messageId: info.messageId, inquiryId };
}
