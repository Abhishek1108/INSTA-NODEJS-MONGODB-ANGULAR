const nodemailer=require('nodemailer');
const {APP_KEY} =require("../secrets");

module.exports= async function emailSender(OTP,userEmail){

    let transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        secure: true, 
        auth: {
          user: "abhisheksinghtanwar1@gmail.com", 
          pass: APP_KEY, 
        },
      });
    
    
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: userEmail, // list of receivers
        subject: "RESET PASSWORD", // Subject line
        text: "Hello ", // plain text body
        html: `<b>Your OTP to reset Your Password </b><p>${OTP}</p>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
   

}