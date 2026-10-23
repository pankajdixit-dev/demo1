import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendContactEmail, getTransporter } from './server/mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom Vite plugin to handle /api/contact directly in dev server with full CORS support
function contactApiPlugin() {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Base CORS headers for all /api requests
        if (req.url && req.url.startsWith('/api/')) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }
        }

        const cleanUrl = req.url ? req.url.split('?')[0].replace(/\/+$/, '') : '';

        // POST /api/contact
        if (req.method === 'POST' && cleanUrl === '/api/contact') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              console.log('[Vite API] Received /api/contact submission from:', data.email);
              const result = await sendContactEmail(data);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Your message has been delivered to Pankaj Dixit via email!',
                  messageId: result.messageId,
                  inquiryId: result.inquiryId
                })
              );
            } catch (err) {
              console.error('[Vite API Error]', err.message);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 400;
              res.end(
                JSON.stringify({
                  success: false,
                  message: err.message || 'Failed to send email'
                })
              );
            }
          });
          return;
        }

        // GET /api/health
        if (req.method === 'GET' && cleanUrl === '/api/health') {
          try {
            const transporter = getTransporter();
            await transporter.verify();
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ status: 'ok', smtp: 'connected', receiver: 'pankaj.dixit9070@gmail.com' }));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ status: 'error', error: err.message }));
          }
          return;
        }

        // GET /api/inquiries
        if (req.method === 'GET' && cleanUrl === '/api/inquiries') {
          try {
            const inquiriesPath = path.join(__dirname, 'server', 'inquiries.json');
            let data = [];
            if (fs.existsSync(inquiriesPath)) {
              data = JSON.parse(fs.readFileSync(inquiriesPath, 'utf-8') || '[]');
            }
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, count: data.length, inquiries: data }));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contactApiPlugin()]
});
