//import * as mailModel from '../models/mail.model'
import nodemailer, {TransportOptions} from 'nodemailer';
import {SMTP_CONFIG} from '../config/env'

const transporter = nodemailer.createTransport(SMTP_CONFIG as TransportOptions);

/**
 * Отправляет email через TimeWeb SMTP
 * @param to - Email получателя
 * @param subject - Тема письма
 * @param text - Текстовая версия
 * @param html - HTML-версия (опционально)
 */
export const sendActivationMail = async (to: string, subject: string, text: string, html = "") => {
    try {
        const info = await transporter.sendMail({
            from: SMTP_CONFIG.from,
            to,
            subject,
            text,
            html: html || text,
        });

        console.log("Письмо отправлено:", info.messageId);
    } catch (error) {
        throw new Error("Failed to send activation email. Please try again later.");
    }
}

/*export const getMailLink = async (uuid: string) => {
    return await mailModel.getLink(uuid)
}

export const createMailLink = async (uuid: string) => {
    return await mailModel.createLink(uuid)
}

export const deleteMailLink = async (uuid: string) => {
    return await mailModel.deleteLink(uuid)
}*/