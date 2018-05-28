import CommunityModel from '../../models/CommunityModel';

async function updateCommunityContract() {
  await CommunityModel.update({ name: 'blockchain' }, {$set: { poolAddress: '0x556d42536c59650c442ac884d433bf8d54f9929b' }});
}

function migrate() {
  return Promise.resolve()
    .then(async () => {
      await updateCommunityContract();
    });
}

function getInfo() {
  return Promise.resolve({
    version: '0.0.2',
    requiredVersion: '0.0.1'
  });
}

export {
  migrate,
  getInfo
};


