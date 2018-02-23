import _ from "lodash";

const initialState = {
  fetching: false,
  user: null,
  error: null,
  idx: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return { ...state, fetching: true, error: null };
    case "API_CALL_SUCCESS":
      return {
        ...state,
        fetching: false,
        users: { ...state.users, [action.user.id]: action.user },
        idx: state.idx + 1
      };
    case "API_CALL_FAILURE":
      return { ...state, fetching: false, users: null, error: action.error };
    case "REMOVE_USER":
      return { ...state, users: _.omit(state.users, action.user) };

    default:
      return state;
  }
}
