import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { recipients, subject, message } = await request.json();

    // Validation
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'At least one recipient is required' },
        { status: 400 }
      );
    }

    if (!subject || subject.trim() === '') {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      );
    }

    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = recipients.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { error: `Invalid email addresses: ${invalidEmails.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Gmail credentials not found in environment variables');
      return NextResponse.json(
        { error: 'Email service not configured. GMAIL_USER and GMAIL_PASS are required.' },
        { status: 500 }
      );
    }

    // Create Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Send email to each recipient
    const emailResults = [];
    const errors = [];

    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: `Missouri Soybean Association <${process.env.GMAIL_USER}>`,
          to: recipient,
          subject: subject.trim(),
          html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>${message.trim().replace(/\n/g, '<br>')}</p>
          </div>`,
          text: message.trim(),
        };

        const info = await transporter.sendMail(mailOptions);
        
        emailResults.push({ 
          recipient, 
          success: true, 
          messageId: info.messageId 
        });
      } catch (error) {
        errors.push({ 
          recipient, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    // Return results
    if (errors.length > 0 && emailResults.length === 0) {
      // All emails failed
      return NextResponse.json(
        { 
          error: 'Failed to send emails',
          details: errors
        },
        { status: 500 }
      );
    }

    if (errors.length > 0) {
      // Some emails failed
      return NextResponse.json(
        { 
          success: true,
          sent: emailResults.length,
          failed: errors.length,
          results: emailResults,
          errors: errors
        },
        { status: 200 }
      );
    }

    // All emails sent successfully
    return NextResponse.json(
      { 
        success: true,
        sent: emailResults.length,
        results: emailResults,
        message: `Email sent successfully to ${emailResults.length} recipient(s)`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

