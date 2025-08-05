# EmailJS Setup Guide

To enable actual email sending functionality for the contact form, follow these steps:

## 1. Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Verify your email address

## 2. Set Up Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" or "Outlook" (recommended for personal use)
4. Connect your email account (gourav8jain@gmail.com)
5. Note down the **Service ID** (e.g., `service_xxxxxxx`)

## 3. Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Contact Form Message from {{from_name}}

Hello Gourav,

You have received a new message from your portfolio website:

**From:** {{from_name}} ({{from_email}})
**Subject:** {{subject}}

**Message:**
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note down the **Template ID** (e.g., `template_xxxxxxx`)

## 4. Get Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

## 5. Update JavaScript Code

Replace the placeholder values in `script.js`:

```javascript
// Replace these values with your actual EmailJS credentials
emailjs.init('YOUR_PUBLIC_KEY'); // Your EmailJS public key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Your service and template IDs
```

## 6. Test the Form

1. Deploy your website
2. Fill out the contact form
3. Submit and verify you receive the email

## Alternative: Use Formspree

If you prefer a simpler solution, you can use Formspree:

1. Go to [Formspree](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Update the form action in HTML:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Security Notes

- Never expose your EmailJS private keys in client-side code
- Use environment variables for production deployments
- Consider rate limiting to prevent spam
- Monitor your email service for any issues

## Troubleshooting

- Check browser console for JavaScript errors
- Verify EmailJS credentials are correct
- Ensure email service is properly connected
- Test with different email addresses 