import { Service } from 'egg';
import nodemailer from 'nodemailer';

export default class EmailService extends Service {
  async sendEmail(
    email: string,
    option?: { html?: string; subject?: string; text?: string },
  ) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        ...option,
      });

      return 'send success';
    } catch (e) {
      return e;
    }
  }

  async sendEmailCaptcha(email: string, userName: string, captcha: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: '验证您的电子邮箱',
        html: `<div>
        <div>尊敬的${userName}，您好<div>
        <div>请在验证页面输入以下验证码：</div>
        <p><b style="margin: 64px 0; font-size:24px">${captcha}</b></p>
        <div>验证码不区分大小写，60分钟有效。如非本人操作请忽略该邮件。</div>
        <p>提示：请无将验证码泄漏给他人</p>
        <div>`,
      });

      return 'send success';
    } catch (e) {
      return e;
    }
  }
}
