import MongoDb from '../../mongodb';
import CommunityModel from '../../models/CommunityModel';

const db = new MongoDb();

function initCommunities() {
  CommunityModel.remove();

  const collection = [
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
  ];

  collection.forEach(data => new CommunityModel(data).save());
}

function migrate() {
  return Promise.resolve()
    .then(initCommunities);
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
