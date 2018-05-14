import convict from 'convict';

// import dev from './env/dev';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'qa'],
    default: 'develpoment',
    env: 'NODE_ENV'
  },
  serverAPI: {
    doc: 'Server API URL',
    format: String,
    default: 'http://localhost:8063/api/'
  },
  metamask: {
    sigPhrase: {
      doc: "String for signing metamask",
      format: String,
      default: "Forseti greets you!"
    }
  }
});

// const env = config.get('env');
// config.load(`./src/server/config/env/${env}.json`);
// config.load(dev);
config.validate();

export default config;
