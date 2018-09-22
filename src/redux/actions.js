import {
  ADD_GROUP,
  ADD_FRIEND,
  ADD_ME,
  RESET_ME,
  SET_AMOUNT,
  SET_GROUP,
  SET_PARTICIPANTS,
  SET_ST_PARTICIPANTS,
  SET_STEP,
  SET_DESCRIPTION,
  SET_TITLE,
  SET_DATE,
  SET_SPLITS,
  RESET_EXPENSE
} from "./actionTypes";

export function resetExpense() {
  return { type: RESET_EXPENSE };
}
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

export function setAmount(amount) {
  return { type: SET_AMOUNT, amount };
}

export function setGroup(group) {
  return { type: SET_GROUP, group };
}

export function setStep(step) {
  return { type: SET_STEP, step };
}

export function setSplits(splits) {
  return { type: SET_SPLITS, splits };
}

export function setParticipants(participants) {
  return { type: SET_PARTICIPANTS, participants };
}

export function setStandaloneParticipants(standaloneParticipants) {
  return { type: SET_ST_PARTICIPANTS, standaloneParticipants };
}

export function setDate(date) {
  return { type: SET_DATE, date };
}

export function setDescription(description) {
  return { type: SET_DESCRIPTION, description };
}

export function setTitle(title) {
  return { type: SET_TITLE, title };
}
