import _ from "lodash";

const initialState = {
  fetching: false,
  user: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return { ...state, fetching: true, error: null };
    case "API_CALL_SUCCESS":
      return {
        ...state,
        fetching: false,
        users: { ...state.users, [action.user.id]: action.user }
      };
    case "API_CALL_FAILURE":
      return { ...state, fetching: false, error: action.error };
    case "REMOVE_USER":
      return { ...state, error: null, users: _.omit(state.users, action.user) };

    default:
      return state;
  }
}
