import MongoDb from '../../mongodb';

import UserModel from '../../models/UserModel';
import CommunityModel from '../../models/CommunityModel';
import DisputeModel from '../../models/DisputeModel';

const db = new MongoDb();
const storedData = {};
const rawData = {
  User: [
    {
      email: 'some@user.me',
      account: '12345',
      sig: 'sig'
    }
  ],
  Community: [
    {
      name: 'web',
      title: 'Web Developers',
      description: 'Community for Dispute resolution in Web Development',
      icon: 'faMagic',
      disputesSolved: 20,
      membersActive: 43
    },
    {
      name: 'blockchain',
      title: 'Blockchain developers',
      description: 'Community for Dispute resolution in BC Development',
      icon: 'faLink',
      disputesSolved: 43,
      membersActive: 15
    }
  ],
  Dispute: [
    {
      author: () => storedData.User[0]._id,
      title: 'Some open dispute',
      description: 'I make this dispute in web comunity',
      community: () => storedData.Community[0]._id,
      status: 'open',
      arbitersNeed: 7,
      ethAddress: 'test'
    },
    {
      author: () => storedData.User[0]._id,
      title: 'Closed dispute',
      description: 'For web comunity',
      community: () => storedData.Community[0]._id,
      status: 'closed',
      arbitersNeed: 5,
      ethAddress: 'test'
    },
    {
      author: () => storedData.User[0]._id,
      title: 'Another dispute',
      description: 'some tasks in blockchain',
      community: () => storedData.Community[1]._id,
      status: 'closed',
      arbitersNeed: 10,
      ethAddress: 'test'
    }
  ]
};

function fillCollection(model) {
  return new Promise(async resolve => {
    const modelName = model.modelName;
    await model.remove({});

    const collection = rawData[modelName];
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
      await fillCollection(UserModel);
      await fillCollection(CommunityModel);
      await fillCollection(DisputeModel);
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
