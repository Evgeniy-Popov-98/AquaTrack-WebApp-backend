// src/utils/sendMail.js

// import nodemailer from 'nodemailer';

// import { SMTP } from '../constants/constants.js';
// import { env } from './env.js';

// const transporter = nodemailer.createTransport({
//   host: env(SMTP.SMTP_HOST),
//   port: Number(env(SMTP.SMTP_PORT)),
//   auth: {
//     user: env(SMTP.SMTP_USER),
//     pass: env(SMTP.SMTP_PASSWORD),
//   },
// });

// export const sendMail = async (options) => {
//   return await transporter.sendMail(options);
// };

//код снизу - працює зверху ні видаляйте на ваше вибір
//import nodemailer from 'nodemailer';
//import { SMTP } from '../constants/constants.js';
//import { env } from './env.js';



//const transporter = nodemailer.createTransport({
  //host: 'smtp.sendgrid.net',
  //port: 587,
  //auth: {
    //user: 'apikey',
    //pass: env(SMTP.SMTP_PASSWORD),
  //},
//});

//export const sendMail = async (options) => {
  //try {
    //console.log('Sending email with options:', options);
    //const result = await transporter.sendMail(options);
    //console.log('Email sent successfully:', result);
    //return result;
  //} catch (error) {
    //console.error('Error sending email:', error);
    //throw error;
  //}
//};
