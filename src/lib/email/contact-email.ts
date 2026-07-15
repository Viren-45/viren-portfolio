// src/lib/email/contact-email.ts
export function contactEmailHtml({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background: #0D1117; color: #E8E8E8; padding: 32px;">
        <div style="max-width: 560px; margin: 0 auto; background: #0A121E; border: 1px solid rgba(201,168,76,0.2); border-radius: 12px; padding: 32px;">
          <h2 style="color: #C9A84C; margin: 0 0 24px;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: rgba(232,232,232,0.5); font-size: 12px; width: 80px;">Name</td>
              <td style="padding: 8px 0; color: #E8E8E8; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: rgba(232,232,232,0.5); font-size: 12px;">Email</td>
              <td style="padding: 8px 0; color: #E8E8E8; font-size: 14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: rgba(232,232,232,0.5); font-size: 12px;">Subject</td>
              <td style="padding: 8px 0; color: #E8E8E8; font-size: 14px;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(232,232,232,0.08);">
            <p style="color: rgba(232,232,232,0.5); font-size: 12px; margin: 0 0 8px;">Message</p>
            <p style="color: #E8E8E8; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(232,232,232,0.08);">
            <p style="color: rgba(232,232,232,0.3); font-size: 11px; margin: 0;">
              Sent from your portfolio contact form
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
