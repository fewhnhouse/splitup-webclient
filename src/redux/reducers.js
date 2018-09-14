import { combineReducers } from "redux";
import { ADD_FRIEND, ADD_GROUP, ADD_ME, RESET_ME } from "./actionTypes";

const initialMe = {
  name: "",
  id: "",
  email: "",
  friends: [],
  token: ""
};
function me(state = {...initialMe}, action) {
  switch (action.type) {
    case ADD_ME:
      return {
        ...state,
        name: action.name,
        id: action.id,
        email: action.email,
        token: action.token
      };
    case RESET_ME:
      return {
        initialMe
      };
    case ADD_FRIEND:
      return { ...state, friends: [...state.friends, action.friend] };

    default:
      return state;
  }
}

function groups(state = [], action) {
  switch (action.type) {
    case ADD_GROUP:
      return { ...state, id: action.id };
    default:
      return state;
  }
}

const reducers = combineReducers({ groups, me });

export default reducers;
