const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
    const { name, email, phone, message, serviceName } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Ruhiya Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_CONTACT_EMAIL,
            replyTo: email,
            subject: serviceName
                ? `Service Enquiry: ${serviceName} from ${name}`
                : `New Contact Enquiry from ${name}`,
            html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f9f8f5; border-radius: 12px; overflow: hidden; border: 1px solid #e8e0d0;">
                    <div style="background: linear-gradient(135deg, #245e2f 0%, #3a8a48 100%); padding: 32px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">Ruhiya Wellness</h1>
                        <p style="color: #c8e6c9; margin: 8px 0 0; font-size: 14px;">
                            ${serviceName ? `Enquiry for ${serviceName}` : 'New Contact Enquiry'}
                        </p>
                    </div>
                    <div style="padding: 32px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            ${serviceName ? `
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e8e0d0; color: #7a6a55; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; width: 130px;">Service</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e8e0d0; color: #245e2f; font-weight: 700;">${serviceName}</td>
                            </tr>
                            ` : ''}
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e8e0d0; color: #7a6a55; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; width: 130px;">Full Name</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e8e0d0; color: #2c2c2c; font-weight: 600;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e8e0d0; color: #7a6a55; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e8e0d0; color: #2c2c2c;"><a href="mailto:${email}" style="color: #245e2f;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e8e0d0; color: #7a6a55; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e8e0d0; color: #2c2c2c;">${phone || '<em style="color:#aaa">Not provided</em>'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; color: #7a6a55; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Message</td>
                                <td style="padding: 12px 0; color: #2c2c2c; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="background: #f0ebe3; padding: 20px 32px; text-align: center; font-size: 12px; color: #9a8a75;">
                        This email was sent from the Ruhiya Website form. Reply directly to reach ${name}.
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Your message has been sent successfully!' });

    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
};

module.exports = { sendContactEmail };
