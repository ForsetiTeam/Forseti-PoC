import * as convict from "convict";

const config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "dev", "qa"],
        default: "dev",
        env: "NODE_ENV",
    },
    http: {
        url: {
            doc: "Base server url",
            format: String,
            default: "http://localhost:3000",
            env: "APP_URL",
        },
        port: {
          doc: "Http listening port",
          format: "port",
          default: 8063,
          env: "APP_PORT"  ,
        },
    },
    session: {
        secret: { format: String, default: "meowmeowmeow" },
        maxAge: { format: Number, default: 300000 },
    },
    jwt: {
      secret: {
        format: String,
        default: "meow",
      },
      expiresIn: {
        doc: "Expressed in seconds or a string describing a time span zeit/ms.",
        default: "2 days",
      },
    },
    tokenTTL: {
      doc: "Time to live of tokens in hours",
      format: Number,
      default: 24,
    },
    db: {
      uri: {
        doc: "Mongodb connection string (migrated from profeels docker-compose)",
        format: String, default: "mongodb://localhost/forseti",
        env: "MONGO_URI",
      },
    },
    cryptoRates: {
      bitcoinUrl: {
        doc: "External api url for fetching bitcoin price",
        format: String,
        default: "https://api.coinmarketcap.com/v1/ticker/bitcoin/",
      },
      ethereumUrl: {
        doc: "External api url for fetching ethereum price",
        format: String,
        default: "https://api.coinmarketcap.com/v1/ticker/ethereum/",
      },
    },
    emailTransport: {
      service: {
        doc: "Service for email transport",
        format: String,
        default: "gmail",
      },
      user: {
        doc: "User for email transport",
        format: String,
        default: "testpreico@gmail.com",
      },
      pass: {
        doc: "Password for email transport",
        format: String,
        default: "123qweASD123qweASD",
      },
    },
    emailConfirmation: {
      tokenLength: {
        doc: "Length of token for email confirmation",
        format: Number,
        default: 32,
      },
      tokenTTL: {
        doc: "Time to live of token for email confirmation in hours",
        format: Number,
        default: 24,
      },
    },
    passwordRecover: {
      tokenLength: {
        doc: "Length of token for email confirmation",
        format: Number,
        default: 32,
      },
      tokenTTL: {
        doc: "Time to live of token for email confirmation in hours",
        format: Number,
        default: 24,
      },
    },
    emailChange: {
      tokenLength: {
        doc: "Length of token for email changing",
        format: Number,
        default: 32,
      },
      tokenTTL: {
        doc: "Time to live of token for email changing in hours",
        format: Number,
        default: 24,
      },
    },
    passwordChange: {
      tokenLength: {
        doc: "Length of token for password changing",
        format: Number,
        default: 32,
      },
      tokenTTL: {
        doc: "Time to live of token for password changing in hours",
        format: Number,
        default: 24,
      },
    },
});

const env = config.get("env");
config.loadFile(`./src/server/config/env/${env}.json`);
config.validate();

export default config;
