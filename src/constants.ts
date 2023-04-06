require('dotenv').config();
export const __prod__ = process.env.NODE_ENV === 'production';
export const __dbuser__ = process.env.DB_USER;
export const __dbpassword__ = process.env.DB_PASSWORD;
