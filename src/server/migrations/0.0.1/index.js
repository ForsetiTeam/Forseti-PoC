import * as mongoose from 'mongoose';
import MongoDb from '../../mongodb';

import UserModel from '../../models/UserModel';
import CommunityModel from '../../models/CommunityModel';
import DisputeModel from '../../models/DisputeModel';

const db = new MongoDb();
const storedData = {};
const rawData = {
  User: () => {
    const count = 50;
    const list = [];

    for (let i = 0; i < count; i++) {
      list.push(
        {
          email: `user${i}@gmail.com`,
          account: `account${i}`,
          sig: 'sig'
        }
      );
    }
    return list;
  },
  Community: [
    {
      poolAddress: '0x472a1ac7e06358c0ad2a14a72acb000f7adcc05e',
      name: 'web',
      title: 'Web Developers',
      description: 'Community for Dispute resolution in Web Development',
      icon: 'faMagic',
      disputesSolved: 20,
      usersActive: 0
    },
    {
      poolAddress: 'poolAddress',
      name: 'blockchain',
      title: 'Blockchain developers',
      description: 'Community for Dispute resolution in BC Development',
      icon: 'faLink',
      disputesSolved: 43,
      usersActive: 0
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

function assignUsersToCommunities() {
  storedData.User.forEach(async user => {
    if (Math.random() < 0.5) {
      await user.toggleCommunity(storedData.Community[0]._id);
    }
    if (Math.random() < 0.5) {
      await user.toggleCommunity(storedData.Community[1]._id);
    }
  });
}

function createDisputes() {
  let counter = 0;
  storedData.User.forEach(async user => {
    if (Math.random() < 0.1 && user.communities.length) {
      counter++;
      const dispute = await new DisputeModel({
        author: user._id,
        title: `dispute #${counter}`,
        description: 'description',
        community: user.communities[0],
        arbitersNeed: 3,
        ethAddress: `ethAddress #${counter}`
      }).save();
      const result = await dispute.setArbiters();
      console.log('DISPUTE', dispute, result);
    }
  });
  console.log('COUNTER', counter);
}

function migrate() {
  return Promise.resolve()
    .then(async () => {
      await dropDB();
      await fillCollection(CommunityModel);
      await fillCollection(UserModel);
      await fillCollection(DisputeModel);
      await assignUsersToCommunities();
      await createDisputes();
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
