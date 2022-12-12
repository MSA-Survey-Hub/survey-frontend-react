import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes} from '../lib/createRequestSaga';
import { delay, put, takeLatest, select, throttle } from 'redux-saga/effects';
import {Map, List} from 'immutable';


const ADD_SELECTED_LIST= 'surveySend/addSelectedList';
const DELETE_SELECTED_LIST= 'surveySend/deleteSelectedList';
const INITIALIZE_FORM = 'surveySend/INITIALIZE_FORM';

export const addSelectedList = createAction(ADD_SELECTED_LIST, ({ member }) => ({
  member
}));
export const deleteSelectedList = createAction(DELETE_SELECTED_LIST, ({ member}) => ({
  member
}));
export const initializeForm = createAction(INITIALIZE_FORM);

export function* surveySendSaga() {
}
const initialState = List([]);

const surveySend = handleActions({
  [INITIALIZE_FORM]: (state) => {
    return initialState;
  },

    [ADD_SELECTED_LIST]: (state, { payload: member }) =>  {
      let flag = true;
      if(state.size > 0){
        state.forEach(function(user) {
          if(user.userId == member.member.userId){
            flag = false;
          }
        });
      }
      if(flag){
        return state.push(member.member);
      }else{
        return state;
      }
    },

    [DELETE_SELECTED_LIST]: (state, { payload: member }) =>  {
      return state.filter((user) => user !== member.member)
    },

  },

  initialState
);

export default surveySend;