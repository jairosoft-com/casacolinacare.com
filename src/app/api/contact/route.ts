import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { buildContactEmailHtml } from '@/lib/email';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  relationship?: string;
  message?: string;
}

function validateContactForm(body: ContactFormBody) {
  const errors: string[] = [];

  const firstName = body.firstName?.trim() ?? '';
  const lastName = body.lastName?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  const relationship = body.relationship?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (!firstName || firstName.length > 50) {
    errors.push('First name is required (1-50 characters).');
  }
  if (!lastName || lastName.length > 50) {
    errors.push('Last name is required (1-50 characters).');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('A valid email address is required.');
  }
  if (phone && !/^\+?[\d\s().-]{7,20}$/.test(phone)) {
    errors.push('Phone number format is invalid.');
  }
  if (relationship.length > 100) {
    errors.push('Relationship must be 100 characters or less.');
  }
  if (!message || message.length > 2000) {
    errors.push('Message is required (1-2000 characters).');
  }

  return {
    errors,
    data: { firstName, lastName, email, phone, relationship, message },
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactFormBody;
    const { errors, data } = validateContactForm(body);

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.join(' ') },
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from: 'Casa Colina Care <onboarding@resend.dev>',
      to: 'kriss@casacolinacare.com',
      replyTo: data.email,
      subject: `New Consultation Request from ${data.firstName} ${data.lastName}`,
      html: buildContactEmailHtml(data),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        {
          success: false,
          message:
            'Something went wrong. Please try again or call us directly.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch soon.",
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again or call us directly.',
      },
      { status: 500 },
    );
  }
}
