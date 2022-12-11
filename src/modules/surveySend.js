import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes} from '../lib/createRequestSaga';
import { delay, put, takeLatest, select, throttle } from 'redux-saga/effects';
import {Map, List} from 'immutable';
import * as surveyTargetAPI from '../lib/api/survey_target';


const ADD_SELECTED_LIST= 'surveyTarget/addSelectedList';
const DELETE_SELECTED_LIST= 'surveyTarget/deleteSelectedList';


export const addSelectedList = createAction(ADD_SELECTED_LIST, ({ member }) => ({
  member
}));
export const deleteSelectedList = createAction(DELETE_SELECTED_LIST, ({ member}) => ({
  member
}));

export function* surveySendSaga() {
}
const initialState = List([]);

const surveySend = handleActions({

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