import { ADD_GROUP, ADD_FRIEND, ADD_ME, RESET_ME } from "./actionTypes";

export function addGroup(id) {
  return { type: ADD_GROUP, id };
}
export function addFriend(id) {
  return { type: ADD_FRIEND, id };
}
export function addMe(id, name, email, token) {
  return { type: ADD_ME, id, name, email, token };
}

export function resetMe() {
  return { type: RESET_ME };
}
