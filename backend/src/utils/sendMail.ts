import nodemailer from 'nodemailer';

type MailOptions = {
    email: string;
    subject: string;
    message: string;
};

const sendMail = async (options: MailOptions): Promise<void> => {
    const host: string | undefined = process.env.SMPT_HOST;
    const port: number | undefined = process.env.SMPT_PORT ? parseInt(process.env.SMPT_PORT) : undefined;

    if (!host || !port) {
        throw new Error("SMTP host or port is not defined in environment variables");
    }

    const transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.EmailId,
            pass: process.env.Email_Password,
        },
    });

    const mailOptions = {
        from: process.env.EmailId,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;
