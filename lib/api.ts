import https from "https";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const agent = new https.Agent({
  rejectUnauthorized: false,
});