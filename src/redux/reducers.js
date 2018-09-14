import { combineReducers } from "redux";
import { ADD_FRIEND, ADD_GROUP, ADD_TOKEN } from "./actionTypes";

function friends(state = [], action) {
  switch (action.type) {
    case ADD_FRIEND:
      return { ...state, id: action.id };
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

function utils(state = {}, action) {
  switch (action.type) {
    case ADD_TOKEN:
      return { ...state, token: action.token };
    default:
      return state;
  }
}

const reducers = combineReducers({ utils, groups, friends });

export default reducers;
