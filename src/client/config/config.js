import convict from 'convict';

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
      doc: 'String for signing metamask',
      format: String,
      default: 'Forseti greets you!'
    }
  }
});

config.validate();

export default config;
