// server/config/config.js

const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        MONGODB_URI: Joi.string().required().description('Mongo DB URI'), // Consistent naming
        DB_NAME: Joi.string().required().description('Mongo DB name'), // Consistent naming
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10),
        SMTP_HOST: Joi.string().description('server that will send the emails'),
        SMTP_PORT: Joi.number().description('port to connect to the email server'),
        SMTP_USERNAME: Joi.string().description('username for email server'),
        SMTP_PASSWORD: Joi.string().description('password for email server'),
        EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
        // CLIENT_URL: Joi.string().required().description('Client URL'),

        WEBHOOK_SECRET: Joi.string().required().description('Webhook Secret'),
        RIFFUSION_API_BASE_URL: Joi.string().required().description("Riffusion API base URL"), //  AND ADD THIS
        RIFFUSION_API_TOKEN: Joi.string().required().description("Riffusion API token"),     //  AND ADD THIS
        WEBHOOK_ENDPOINT: Joi.string().required().description("Webhook Endpoint"),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongo: { 
        url: envVars.MONGODB_URI,
        dbName: envVars.DB_NAME, 
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
    },
    // clientURL: envVars.CLIENT_URL,
    webhookSecret: envVars.WEBHOOK_SECRET,  
    riffusionApiBaseUrl: envVars.RIFFUSION_API_BASE_URL,
    riffusionApiToken: envVars.RIFFUSION_API_TOKEN,     
    webhookEndpoint: envVars.WEBHOOK_ENDPOINT, 
};