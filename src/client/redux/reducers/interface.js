import {
  TOGGLE_LEFT_MENU
} from '../actions/interface/toggleLeftMenu';

const initialState = {
  leftMenuShown: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_MENU: {
      return { leftMenuShown: !state.leftMenuShown };
    }
    default:
      return state;
  }
}
