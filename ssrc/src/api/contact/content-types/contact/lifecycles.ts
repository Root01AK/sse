import fs from 'fs';
import path from 'path';

export default {
  async afterCreate(event: any) {
    const { result } = event;

    try {
      // 1. Send Email to ADMIN
      const adminTemplatePath = path.resolve(process.cwd(), 'src/templates/contact-email.html');
      if (fs.existsSync(adminTemplatePath)) {
        let adminHtml = fs.readFileSync(adminTemplatePath, 'utf8');
        adminHtml = adminHtml
          .replace('[FirstName]', result.FirstName || '')
          .replace('[LastName]', result.LastName || '')
          .replace(/\[Email\]/g, result.Email || '')
          .replace('[Message]', result.Message || '');

        await strapi.plugins['email'].services.email.send({
          to: process.env.ADMIN_EMAIL || 'infinitasadvisory@gmail.com',
          subject: `New Contact Inquiry from ${result.FirstName || 'Unknown'}`,
          html: adminHtml,
        });
        console.log("✅ Admin contact email sent");
      }

      // 2. Send "Thank You" Email to CUSTOMER
      const customerTemplatePath = path.resolve(process.cwd(), 'src/templates/thanks-contact.html');
      if (fs.existsSync(customerTemplatePath) && result.Email) {
        let customerHtml = fs.readFileSync(customerTemplatePath, 'utf8');
        customerHtml = customerHtml
          .replace('[FirstName]', result.FirstName || '')
          .replace('[Message]', result.Message || '');

        await strapi.plugins['email'].services.email.send({
          to: result.Email,
          subject: "Thank you for contacting Sai Saranya Enterprises",
          html: customerHtml,
        });
        console.log("✅ Customer thank you email sent to:", result.Email);
      }

    } catch (error) {
      console.error("❌ Contact email failed:", error);
    }
  },
};