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
      autoApplyMigrations: {
        doc: 'Auto apply migrations',
        format: Boolean,
        'default': false
      },
    },
    metamask: {
        sigPhrase: {
            doc: "String for signing metamask",
            format: String,
            default: "Forseti greets you!",
        },
    },

});

const env = config.get("env");
config.loadFile(`./src/server/config/env/${env}.json`);
config.validate();

export default config;
