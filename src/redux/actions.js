import { ADD_TOKEN, ADD_GROUP, ADD_FRIEND } from "./actionTypes";

const actions = {
  addToken(token) {
    return { type: ADD_TOKEN, token };
  },
  addGroup(id) {
    return { type: ADD_GROUP, id };
  },
  addFriend(id) {
    return { type: ADD_FRIEND, id };
  }
};

export default actions;
