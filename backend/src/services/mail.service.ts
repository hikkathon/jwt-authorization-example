import * as mailModel from '../models/mail.model'
import nodemailer from 'nodemailer';
import {SMTP_CONFIG} from '../config/env'

// @ts-ignore
const transporter = nodemailer.createTransport(SMTP_CONFIG);

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
            from: SMTP_CONFIG.auth.user,
            to,
            subject,
            text,
            html: html || text,
        });

        console.log("Письмо отправлено:", info.messageId);
    } catch (error) {
        console.error("Ошибка отправки:", error);
    }
}

export const getMailLink = async (uuid_user: string) => {
    return await mailModel.getLinkById(uuid_user)
}

export const createMailLink = async (uuid_user: string) => {
    return await mailModel.createLink(uuid_user)
}

export const deleteMailLink = async (uuid_user: string) => {
    return await mailModel.deleteLink(uuid_user)
}