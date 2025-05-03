import dotenv from "dotenv";
import packageJson from "../package.json" assert { type: "json" };

dotenv.config();

const env = process.env;

// Utility functions
const removeTrailingSlash = (url) =>
  url?.endsWith("/") ? url.slice(0, -1) : url;
const addTrailingSlash = (url) => (url?.endsWith("/") ? url : `${url}/`);

const appConfig = {
  auth0: {
    domain: removeTrailingSlash(env.AUTH0_DOMAIN),
    clientId: env.AUTH0_CLIENT_ID,
    clientSecret: env.AUTH0_CLIENT_SECRET,
    audience: addTrailingSlash(env.AUTH0_APPLICATION_AUDIENCE),
  },
  api: {
    baseUrl: env.API_BASE_URL,
  },
};

export default appConfig;
