import fs from 'fs';
import path from 'path';

export default {
  async afterCreate(event: any) {
    const { result } = event;

    try {
      // 1. Send Email to ADMIN
      const adminTemplatePath = path.resolve(process.cwd(), 'src/templates/booking-email.html');
      if (fs.existsSync(adminTemplatePath)) {
        let adminHtml = fs.readFileSync(adminTemplatePath, 'utf8');
        adminHtml = adminHtml
          .replace('[fullName]', result.fullName || '')
          .replace(/\[email\]/g, result.email || '')
          .replace('[phone]', result.phone || '')
          .replace('[pincode]', result.pincode || '')
          .replace('[material]', result.material || '')
          .replace('[quantity]', result.quantity || '');

        await strapi.plugins['email'].services.email.send({
          to: process.env.ADMIN_EMAIL || 'infinitasadvisory@gmail.com',
          subject: `New Booking Request for ${result.material || 'Material'}`,
          html: adminHtml,
        });
        console.log("✅ Admin booking email sent");
      }

      // 2. Send "Thank You" Email to CUSTOMER
      const customerTemplatePath = path.resolve(process.cwd(), 'src/templates/thanks-booking.html');
      if (fs.existsSync(customerTemplatePath) && result.email) {
        let customerHtml = fs.readFileSync(customerTemplatePath, 'utf8');
        customerHtml = customerHtml
          .replace('[fullName]', result.fullName || '')
          .replace('[material]', result.material || '')
          .replace('[quantity]', result.quantity || '');

        await strapi.plugins['email'].services.email.send({
          to: result.email,
          subject: `Booking Confirmation - ${result.material || 'Sai Saranya Enterprises'}`,
          html: customerHtml,
        });
        console.log("✅ Customer booking email sent to:", result.email);
      }

    } catch (error) {
      console.error("❌ Booking email failed:", error);
    }
  },
};