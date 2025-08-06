import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {

        const newUserId = String(userId);
        console.log(email);
        console.log(emailType);


        // create a hashed token 
        const hashedToken = await bcrypt.hash(newUserId, 10)

        console.log(`Hashed Token: ${hashedToken}`);

        // storing hashed token in database 

        if (emailType == 'VERIFY') {

            // Logic to store the hashed token in the database
            const user = await User.findByIdAndUpdate(newUserId,
                {
                    verifyEmailToken: hashedToken,
                    verifyEmailTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
                },
                { new: true }
            )
            if (!user) {
                throw new Error("User not found")
            }
        }
        else if (emailType == 'RESET') {
            // Logic to store the hashed token in the database
            const user = await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
                },
                { new: true }
            )
        }


        //create a transport for sending email
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b2212d0fa96e59",
                pass: "a4435a361dc7eb"
            }
        });


        const mailOptions = {
            from: 'xyz@gmail.com',
            to: 'bakop58405@nicext.com',
            subject: emailType == 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"></a>
                   here to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.
                   ${process.env.DOMAIN}/verifyemail/token=${hashedToken}</p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);

        if (!mailResponse) {
            throw new Error("Failed to send email")
        }

        return mailResponse


    } catch (error) {

    }

}