
import CommunityModel from "../../models/CommunityModel";

function initCommunities() {

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

initCommunities();