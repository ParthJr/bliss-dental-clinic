import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'consultation-api-handler',
        configureServer(server) {
          server.middlewares.use('/api/consultation', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk: Buffer) => {
                body += chunk.toString();
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);

                  // Server-side validation
                  if (!data.fullName || data.fullName.trim().length < 2) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Full name must be at least 2 characters.' }));
                    return;
                  }

                  const phoneCleaned = (data.mobileNumber || '')
                    .replace(/[\s\-]/g, '')
                    .replace(/^(\+91|91)/, '');
                  if (!/^[6-9]\d{9}$/.test(phoneCleaned)) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(
                      JSON.stringify({
                        error: 'Please provide a valid 10-digit Indian mobile number.',
                      })
                    );
                    return;
                  }

                  if (!data.serviceId || !data.preferredDate || !data.consent) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(
                      JSON.stringify({
                        error: 'Service selection, preferred date, and consent are mandatory.',
                      })
                    );
                    return;
                  }

                  // Anti-bot honeypot check
                  if (data.honeypot) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Spam validation check failed.' }));
                    return;
                  }

                  const referenceId = `BLISS-${Date.now().toString().slice(-6)}`;
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: true,
                      referenceId,
                      message:
                        'Your consultation request has been received. The clinic team will contact you to confirm availability.',
                    })
                  );
                } catch {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Invalid JSON request payload.' }));
                }
              });
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
