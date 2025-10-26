import { Resend } from 'resend';
import { logger } from '../config/logger.js';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send trial access code email
 */
export const sendTrialAccessEmail = async (email, accessCode, expiresAt) => {
  try {
    const expiresDate = new Date(expiresAt).toLocaleString('pt-BR');

    const { data, error } = await resend.emails.send({
      from: 'NEPTUNO ONSHORE <onboarding@neptunodescom.com>',
      to: [email],
      subject: 'Seu Código de Acesso Trial - NEPTUNO ONSHORE',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .code-box { background: white; border: 2px dashed #2563eb; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
              .code { font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px; }
              .info-box { background: #e0f2fe; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
              .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚀 NEPTUNO ONSHORE</h1>
                <p>Plataforma Profissional de PDI para Descomissionamento</p>
              </div>

              <div class="content">
                <h2>Bem-vindo ao Trial de 72 horas!</h2>

                <p>Olá! 👋</p>

                <p>Obrigado por se inscrever no <strong>NEPTUNO ONSHORE</strong>. Seu período de teste de 72 horas começa agora!</p>

                <div class="code-box">
                  <p style="margin: 0; color: #666; font-size: 14px;">SEU CÓDIGO DE ACESSO</p>
                  <div class="code">${accessCode}</div>
                </div>

                <div class="info-box">
                  <strong>⏰ Válido até:</strong> ${expiresDate}<br>
                  <strong>📧 Email:</strong> ${email}
                </div>

                <h3>Como usar:</h3>
                <ol>
                  <li>Acesse: <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}">${process.env.FRONTEND_URL || 'http://localhost:5173'}</a></li>
                  <li>Insira seu email: <code>${email}</code></li>
                  <li>Cole o código de acesso acima</li>
                  <li>Explore a plataforma por 72 horas!</li>
                </ol>

                <h3>O que você pode fazer:</h3>
                <ul>
                  <li>✅ Criar até 5 projetos de PDI</li>
                  <li>✅ Testar todos os tipos de ativos (Poços, Estações, Dutos, Tanques)</li>
                  <li>✅ Upload de documentos</li>
                  <li>✅ Gerar PDFs profissionais</li>
                  <li>✅ Explorar o Wizard Adaptativo</li>
                </ul>

                <center>
                  <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="btn">
                    ACESSAR PLATAFORMA
                  </a>
                </center>

                <div class="info-box">
                  <strong>💡 Dica:</strong> Aproveite para testar a geração de PDI para diferentes tipos de ativos. O sistema se adapta automaticamente!
                </div>
              </div>

              <div class="footer">
                <p>NEPTUNO ONSHORE v3.0 - Descomissionamento Terrestre Profissional</p>
                <p>Este é um email automático. Não responda.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      logger.error('Resend email error:', error);
      throw error;
    }

    logger.info(`Trial email sent to ${email}, ID: ${data.id}`);
    return data;

  } catch (error) {
    logger.error('Failed to send trial email:', error);
    throw new Error('Falha ao enviar email de acesso');
  }
};

/**
 * Send admin notification
 */
export const sendAdminNotification = async (newUserEmail) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'tadeu@neptunodescom.com';

    await resend.emails.send({
      from: 'NEPTUNO ONSHORE <notifications@neptunodescom.com>',
      to: [adminEmail],
      subject: `🆕 Novo Trial Iniciado - ${newUserEmail}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Novo usuário trial cadastrado!</h2>
          <p><strong>Email:</strong> ${newUserEmail}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
          <p><strong>Validade:</strong> 72 horas</p>
          <hr>
          <p>Acesse o painel admin para mais detalhes.</p>
        </div>
      `,
    });

    logger.info(`Admin notification sent for new user: ${newUserEmail}`);
  } catch (error) {
    logger.warn('Failed to send admin notification:', error);
    // Don't throw - admin notification is not critical
  }
};

export default {
  sendTrialAccessEmail,
  sendAdminNotification,
};
