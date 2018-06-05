import * as mongoose from 'mongoose';

import CommunityModel from '../../models/CommunityModel';

const storedData = {};
const rawData = {
  Community: [
    {
      "_id" : "5b064449f52d114cdac0907a",
      "poolAddress" : "0x84a01984161ba593bc509fab52dcd6cd2b6f85ca",
      "name" : "web",
      "title" : "Web Developers",
      "description" : "Community for Dispute resolution in Web Development",
      "icon" : "faMagic",
      "disputesSolved" : 20,
      "usersActive" : 32,
      "__v" : 0,
      "poolMasterAddress" : "0x88373c8ce5213bfd1530c83e409b4bc024586202"
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
