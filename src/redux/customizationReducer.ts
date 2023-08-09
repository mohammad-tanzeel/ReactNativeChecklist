import * as actionTypes from './actions';

export const initialState = null;

const customizationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SAVE_CHECKLIST:
      console.log('profile', action.ProfileData);
      return action.ProfileData;

    default:
      return state;
  }
};

export default customizationReducer;
