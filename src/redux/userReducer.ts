import * as actionTypes from './actions';

export const initialState = null;

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SAVE_USER:
      console.log('profile', action.ProfileData);
      return action.ProfileData;

    default:
      return state;
  }
};

export default userReducer;
