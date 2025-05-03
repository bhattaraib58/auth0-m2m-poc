import http from "http";
import morgan from "morgan";
import express from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

import appConfig from "./appConfig.mjs";
import logger, { stream } from "./logger.mjs";

const jwtCheck = auth({
  issuerBaseURL: appConfig.auth0.domain,
  audience: appConfig.auth0.audience,
  tokenSigningAlg: "RS256",
});

/*
 * Initialize express.
 */
const app = express();
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]", {
    stream: stream,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    name: appConfig.app.name,
    version: appConfig.app.version,
    status: "ok",
    uptime: process.uptime(),
  });
});

/*
 * API endpoints.
 * enforce on all endpoints
 */
app.use("/api", jwtCheck);

app.get("/api/authorized", (req, res) => {
  res.json({
    message: "Secured Resource",
  });
});

app.get(
  "/api/document",
  requiredScopes("document:list"),
  function (req, res, next) {
    res.json({
      documents: [
        { id: 1, name: "Document 1" },
        { id: 2, name: "Document 2" },
      ],
    });
  }
);
app.post(
  "/api/document/upload",
  requiredScopes("document:upload"),
  function (req, res, next) {
    res.json({
      message: "You have access to upload documents",
    });
  }
);

app.get(
  "/api/assessment",
  requiredScopes("assessment:list"),
  function (req, res, next) {
    res.json({
      assessments: [
        { id: 1, name: "Assessment 1" },
        { id: 2, name: "Assessment 2" },
      ],
    });
  }
);

/*
 * Error handler
 */
app.use((err, req, res, next) => {
  if (err) {
    logger.error("Unauthorized:", err.message);

    return res.status(401).send({ message: err.message });
  }

  next(err, req, res);
});

// Fallback route handler
app.use((req, res) => {
  const message = `Cannot ${req.method} ${req.originalUrl}`;
  logger.warn(message);

  res.status(404).send(message);
});

http.createServer(app).listen(appConfig.app.port, appConfig.app.host, () => {
  logger.info(
    `API listening at http://${appConfig.app.host}:${appConfig.app.port}`
  );
});
