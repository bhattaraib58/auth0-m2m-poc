import dotenv from "dotenv";
import packageJson from "../package.json" assert { type: "json" };

dotenv.config();

const env = process.env;

// Utility functions
const removeTrailingSlash = (url) =>
  url?.endsWith("/") ? url.slice(0, -1) : url;
const addTrailingSlash = (url) => (url?.endsWith("/") ? url : `${url}/`);

const appConfig = {
  app: {
    name: packageJson.name || "m2m-worker",
    version: packageJson.version || "1.0.0",
    host: env.HOST || "0.0.0.0",
    port: env.PORT || 8848,
  },
  auth0: {
    domain: removeTrailingSlash(env.AUTH0_DOMAIN),
    audience: addTrailingSlash(env.AUTH0_APPLICATION_AUDIENCE),
  },
};

export default appConfig;
