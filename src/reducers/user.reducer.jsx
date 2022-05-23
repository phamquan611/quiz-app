// import { userActionType } from "@actions/admin.action";

// const initialState = {
//   count: 0,
// };

// const User = (state = initialState, action) => {
//   switch (action.type) {
//     case userActionType.INCREMENT:
//       return {
//         count: state.count + 1,
//       };
//     case userActionType.DECREMENT:
//       return {
//         count: state.count - 1,
//       };
//     default:
//       return state;
//   }
// };

// export default User;

import { userActionType } from "@actions/user.action";

const initialState = {
  sessions: []
};

const getSessions = (state = initialState, action) => {
  switch (action.type) {
    case userActionType.GET_DATA_SESSIONS_SUCCESS:
      return [...action.payload];
    case userActionType.GET_DATA_SESSIONS_FAIL:
      return initialState;
    default:
      return state;
  }
};

export default getSessions;
