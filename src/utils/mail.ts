import { createTransport } from 'nodemailer';

const emailSender = async(mailOptions: object)=> {
    try {
        const transport = createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          
          const info = await transport.sendMail(mailOptions);
          console.log(`Email sent ${ info.messageId }`);
    } catch (err) {
        if(err instanceof Error) {
            console.log(err.message)
        }
    }
}

export default emailSender;