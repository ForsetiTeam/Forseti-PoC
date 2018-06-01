import { sigLength, addressLength } from './ethConsts';
import { Decision } from '../models/VoteModel'

export function validateGetDisputeList(req) {
  return {
    author: {
      optional: {options: [{checkFalsy: true}]},
      isBoolean: {
        errorMessage: 'Accepted values: "true" and "false".'
      },
    },
    arbiter: {
      optional: {options: [{checkFalsy: true}]},
      isBoolean: {
        errorMessage: 'Accepted values: "true" and "false".'
      },
    },
    answered: {
      optional: {options: [{checkFalsy: true}]},
      isBoolean: {
        errorMessage: 'Accepted values: "true" and "false".'
      },
    },
  };
}

export function validateCreateDispute(req) {
  return {
    title: {
      isLength: {
        options: [3, 255],
        errorMessage: 'Invalid length'
      },
    },
    description: {
      isLength: {
        options: [3, 2047],
        errorMessage: 'Invalid length'
      },
    },
    community: {
      isLength: {
        options: 24,
        errorMessage: 'Invalid length'
      },
    },
    arbitersNeed: {
      isInt: {
        options: {min: 1},
        errorMessage: 'Min value: 1'
      }
    }
  }
}

export function validateVoteDispute(req) {
  return {
    decision: {
      isIn: {
        options: {list: Object.values(Decision)},
        errorMessage: 'Invalid value'
      },
    },
    sig: {
      isLength: {
        options: sigLength,
        errorMessage: 'Invalid length'
      },
    },
  }
}

export function validateStartDispute(req) {
  return {
    ethAddress: {
      isLength: {
        options: addressLength
      },
    },
  }
}