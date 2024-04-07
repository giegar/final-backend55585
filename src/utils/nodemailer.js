import nodemailer from "nodemailer";

export const sendEmail = async (email, url) => {
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD
            }
        })

        const result = transporter.sendMail({
            from: 'Bambú Eco Cosmetica',
            to: "gise0133@gmail.com",//`${email}`,
            subject: "Cambiar contraseña",
            html: htmlTemplate(email, url)    
        })
    }catch(error) {
        throw error;
    }
}

const htmlTemplate = (email, url) => {
    const title = "Cambiar contraseña en Bambu Eco Cosmetica"
    const link = url;

    return `
        <body style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                <h2 style="color: #007bff;">${title}</h2>
                <p style="color: #333333;">Estimado ${email},</p>
                <p style="color: #333333;">Hemos recibido una solicitud para restablecer tu contraseña. Si no solicitaste esto, puedes ignorar este correo electrónico.</p>
                <p style="color: #333333;">Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
                <p><a href=${link} style="text-decoration: none; color: #007bff; font-weight: bold;">Restablecer contraseña</a></p>
                <p style="color: #333333;">Si el enlace anterior no funciona, copia y pega la siguiente URL en la barra de direcciones de tu navegador:</p>
                <p style="color: #333333;">${link}</p>
                <p style="color: #333333;">Gracias,</p>
                <p style="color: #333333;">Equipo de Bambu Eco Cosmetica</p>
            </div>
        </body>`
}