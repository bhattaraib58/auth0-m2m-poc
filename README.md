# Auth0 Machine-to-Machine Communication POC

This project is a Proof of Concept (POC) for machine-to-machine (M2M) communication using Auth0. It consists of two servers: a **Resource Server** that hosts protected resources, and a **Client Server** that requests access to the resources on behalf of a client application.

The main features of this project include:

- Secure communication between the two servers using Auth0.
- Scope-based access control for resources.
- Demonstrates Auth0's client application management for M2M communication.

## Prerequisites

- Node.js (v20)
- Auth0 account

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:bhattaraib58/auth0-m2m-poc.git
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the necessary environment variables.

4. **Start the Servers**:

   - Start the Resource Server:

     ```bash
     npm run server
     ```

   - Start the Client Server:
     ```bash
     npm run server
     ```

## Usage

1. Obtain an access token from Auth0 using the client credentials flow.

2. Use the access token to access the protected resources.

## Auth0 Configuration

To configure Auth0 for this project, follow these steps:

1. Create a Resource Server:

   - Go to your Auth0 dashboard.
   - Navigate to APIs and create a new API.
   - Set the Identifier (used as the audience) and define the scopes.

2. Create a Machine-to-Machine Application:

   - Navigate to Applications > Machine-to-Machine Applications.
   - Create a new application and authorize it to access the API created above.
   - Note the Client ID and Client Secret.

3. Assign Scopes:
   - In the API settings, assign the required scopes to the application.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
