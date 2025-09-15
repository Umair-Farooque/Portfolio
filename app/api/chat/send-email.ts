import type { NextApiRequest, NextApiResponse } from 'next';
import emailjs from 'emailjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, title } = req.body;

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      { user_name: name, user_email: email, message: title },
      process.env.EMAILJS_PUBLIC_KEY!
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('EmailJS Error:', err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
}
