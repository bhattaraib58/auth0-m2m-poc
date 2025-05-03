import axios from "axios";

import appConfig from "./appConfig.mjs";

/*
 * Helper method to get an access token from the Authorization Server.
 */
const getAccessToken = async () => {
  if (!appConfig.auth0.domain) {
    throw new Error(
      "The AUTH0_DOMAIN is required in order to get an access token (verify your configuration)."
    );
  }

  const tokenUrl = `${appConfig.auth0.domain}/oauth/token`;
  console.log(`Fetching access token from ${tokenUrl}`);

  const headers = {
    "Content-Type": "application/json",
  };
  const payload = {
    audience: appConfig.auth0.audience,
    client_id: appConfig.auth0.clientId,
    client_secret: appConfig.auth0.clientSecret,
    grant_type: "client_credentials",
  };

  const response = await axios.post(tokenUrl, payload, { headers });
  return response.data.access_token;
};

const main = async () => {
  console.log("\nStarting the M2M Second Server API Call.");

  try {
    const accessToken = await getAccessToken();

    console.log("\nGetting Documents List ");
    const documentsResponse = await axios.get(
      `${appConfig.api.baseUrl}/api/document`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Documents:", documentsResponse.data);

    console.log("\nGetting assessment List ");
    const assessmentResponse = await axios.get(
      `${appConfig.api.baseUrl}/api/assessment`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("assessment:", assessmentResponse.data);
  } catch (error) {
    console.error(error);
  }
};

main();
