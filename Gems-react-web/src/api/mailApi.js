import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_4z2sdn5';
const TEMPLATE_ID = 'template_7jtcaf9';
const PUBLIC_KEY = 'saNyNUuA0AmZ8aps1';

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: 'New Message from Website',
      message: formData.message,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    
    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};
