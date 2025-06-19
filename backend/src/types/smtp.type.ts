export interface SmtpAuth {
    user: string;
    pass: string;
}

export interface SmtpConfig {
    host: string;
    port: number;
    from: string;
    secure: boolean;
    auth: SmtpAuth;
    authMethod: 'PLAIN' | 'LOGIN' | 'CRAM-MD5';
}