import { combineReducers } from "redux";
import {
  ADD_FRIEND,
  ADD_GROUP,
  ADD_ME,
  RESET_ME,
  SET_SPLITS,
  SET_AMOUNT,
  SET_GROUP,
  SET_PARTICIPANTS,
  SET_ST_PARTICIPANTS,
  SET_STEP,
  SET_DESCRIPTION,
  SET_TITLE,
  SET_DATE
} from "./actionTypes";

const initialMe = {
  name: "",
  id: "",
  email: "",
  friends: [],
  token: ""
};

const initialExpenses = {
  amount: "",
  splits: [],
  value: "",
  title: "",
  description: "",
  step: 0,
  group: { key: "", label: "" },
  participants: [],
  standaloneParticipants: []
};

function me(state = initialMe, action) {
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

function expenses(state = initialExpenses, action) {
  switch (action.type) {
    case SET_AMOUNT:
      return { ...state, amount: action.amount };
    case SET_GROUP:
      return { ...state, group: action.group };
    case SET_PARTICIPANTS:
      return { ...state, participants: action.participants };
    case SET_ST_PARTICIPANTS:
      return {
        ...state,
        standaloneParticipants: action.standaloneParticipants
      };
    case SET_STEP:
      return {
        ...state,
        step: action.step
      };
    case SET_SPLITS:
      return {
        ...state,
        splits: action.splits
      };
    case SET_DATE:
      return {
        ...state,
        date: action.date
      };
    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.description
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.title
      };
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

const reducers = combineReducers({ groups, me, expenses });

export default reducers;
