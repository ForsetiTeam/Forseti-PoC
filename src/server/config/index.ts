import * as convict from "convict";

const config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "dev", "qa"],
        default: "dev",
        env: "NODE_ENV",
    },
    http: {
        port: {
          doc: "Http listening port",
          format: "port",
          default: 8060,
          env: "APP_PORT"  ,
        },
    },
    session: {
        secret: { format: String, default: "secret" },
        maxAge: { format: Number, default: 300000 },
    },
    jwt: {
      secret: {
        format: String,
        default: "secret",
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
        doc: "Mongodb connection string",
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
      poolMasterAccount: {
        doc: "Pool master account",
        format: String,
        default: '0x5DB32E4dA99a626Ee394810a0675E4708757ea90'
      },
      poolMasterPassphrase: {
        doc: "Pool master password",
        format: String,
        default: 'action host orient online delay rocket alone dress empower learn illegal away'
      },
      poolMasterKey: {
        doc: "Pool master private key",
        format: String,
        default: 'd4ba99c875c6ac31103807a009de55798a63ee81d14b844403babf0bd088a5e1'
      },
    },
    accessToAllPoolArbiters: {
      doc: "Give access to started dispute all arbiters from pool",
      format: Boolean,
      default: true,
    }
});

const env = config.get("env");
config.loadFile(`./src/server/config/env/${env}.json`);
config.validate();

export default config;
