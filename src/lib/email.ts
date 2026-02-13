interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  relationship?: string;
  message: string;
}

export function buildContactEmailHtml(data: ContactFormData): string {
  const rows = [
    { label: 'Name', value: `${data.firstName} ${data.lastName}` },
    { label: 'Email', value: data.email },
    ...(data.phone ? [{ label: 'Phone', value: data.phone }] : []),
    ...(data.relationship
      ? [{ label: 'Relationship to Resident', value: data.relationship }]
      : []),
    { label: 'Message', value: data.message },
  ];

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0D7377; border-bottom: 2px solid #0D7377; padding-bottom: 10px;">
        New Consultation Request
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            row => `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top; width: 180px; color: #555;">
              ${row.label}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">
              ${row.label === 'Message' ? row.value.replace(/\n/g, '<br>') : row.value}
            </td>
          </tr>
        `,
          )
          .join('')}
      </table>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        This message was sent from the Casa Colina Care website contact form.
      </p>
    </div>
  `.trim();
}
