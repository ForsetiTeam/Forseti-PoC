import CommunityModel from '../../models/CommunityModel';

async function updateCommunityContracts() {
  await CommunityModel.update(
    {},
    { poolMasterAddress: '0x1B8d2aAB8070db5e2DF58BC41be71e043901366e' },
    { multi: true }
  );
}

function migrate() {
  return Promise.resolve()
    .then(async () => {
      await updateCommunityContracts();
    });
}

function getInfo() {
  return Promise.resolve({
    version: '0.0.3',
    requiredVersion: '0.0.2'
  });
}

export {
  migrate,
  getInfo
};
