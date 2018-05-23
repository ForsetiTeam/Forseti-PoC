import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'qa'],
    default: 'develpoment',
    env: 'NODE_ENV'
  },
  metamask: {
    sigPhrase: {
      doc: 'String for signing metamask',
      format: String,
      default: 'Forseti greets you!'
    },
    poolAddress: {
      doc: 'Etherium pool address',
      format: String,
      default: '0x472a1ac7e06358c0ad2a14a72acb000f7adcc05e'
    }
  }
});

config.validate();

export default config;
