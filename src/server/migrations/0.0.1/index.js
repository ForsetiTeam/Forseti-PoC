import * as mongoose from 'mongoose';

import CommunityModel from '../../models/CommunityModel';

const storedData = {};
const rawData = {
  Community: [
    {
      'poolAddress' : '0xb150bd72629dd49c2374d89857f10b02c448a08f',
      'name' : 'web',
      'title' : 'Web Developers',
      'description' : 'Community for Dispute resolution in Web Development',
      'icon' : 'faMagic',
      'disputesSolved' : 20
    },
    {
      'poolAddress' : '0x9c1cb1e743b4e97d6defe6232c1ca0decbba4de5',
      'name' : 'blockchain',
      'title' : 'Blockchain Community',
      'description' : 'Community for solving bitcoin and ethereum disputes',
      'icon' : 'faMagic',
      'disputesSolved' : 42
    },
    {
      'poolAddress' : '0xc3ab456fe06bde5a89c203247a357bc2b3929820',
      'name' : 'new',
      'title' : 'New Community',
      'description' : 'Community for something else',
      'icon' : 'faMagic',
      'disputesSolved' : 3
    }
  ]
};

async function dropDB() {
  await mongoose.connection.db.dropDatabase();
}

function fillCollection(model) {
  return new Promise(async resolve => {
    const modelName = model.modelName;
    await model.remove({});

    let collection = rawData[modelName];
    if (typeof (collection) === 'function') {
      collection = collection();
    }

    for (const i in collection) {
      const data = collection[i];
      for (const prop in data) {
        if (typeof (data[prop]) === 'function') {
          data[prop] = data[prop]();
        }
      }
      const inst = await (new model(data)).save();
      storedData[modelName] = storedData[modelName] || [];
      storedData[modelName].push(inst);
    }
    resolve();
  });
}

function migrate() {
  return Promise.resolve()
    .then(async () => {
      await dropDB();
      await fillCollection(CommunityModel);
    });
}

function getInfo() {
  return Promise.resolve({
    version: '0.0.1',
    requiredVersion: '0.0.0'
  });
}

export {
  migrate,
  getInfo
};
