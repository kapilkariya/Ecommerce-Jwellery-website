import sendmail from './sendmail.js';

const send = async (person, mail, amount, address) => {
  if (person === 'client') {
    return sendmail(
      mail,
      'Thanks for your order 🛒',
      `Thank you for your order!\n\nOrder total: ₹${amount}\n\nDelivery address:\n${address.firstname} ${address.lastname}\n${address.street}\n${address.city}, ${address.state} - ${address.zipcode}\nPhone: ${address.phone}\n\nWe will deliver your order soon.`,
      `<h2>Thank you for your order 🛒</h2><p><strong>Order total:</strong> ₹${amount}</p><h3>Delivery address</h3><p>${address.firstname} ${address.lastname}<br/>${address.street}<br/>${address.city}, ${address.state} - ${address.zipcode}<br/><strong>Phone:</strong> ${address.phone}</p><p>We will deliver your order soon.</p>`
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL2?.trim();
  if (!adminEmail) throw new Error('Admin order notifications are not configured. Set ADMIN_EMAIL2.');

  return sendmail(
    adminEmail,
    '🛒 New Order Received',
    `New order received.\n\nCustomer: ${address.firstname} ${address.lastname}\nPhone: ${address.phone}\nTotal: ₹${amount}\n\nDelivery address:\n${address.street}\n${address.city}, ${address.state} - ${address.zipcode}`,
    `<h2>🛒 New Order Received</h2><p><strong>Customer:</strong> ${address.firstname} ${address.lastname}<br/><strong>Phone:</strong> ${address.phone}</p><p><strong>Order total:</strong> ₹${amount}</p><p><strong>Delivery address:</strong><br/>${address.street}<br/>${address.city}, ${address.state} - ${address.zipcode}</p>`
  );
};

export default send;
