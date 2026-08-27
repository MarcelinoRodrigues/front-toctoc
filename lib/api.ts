import https from "https";

export const API_BASE_URL = process.env.API_BASE_URL_ENV || "";

export const agent = new https.Agent({
  rejectUnauthorized: false,
});
