import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes} from '../lib/createRequestSaga';
import { delay, put, takeLatest, select, throttle } from 'redux-saga/effects';
import {Map, List} from 'immutable';
import * as surveyTargetAPI from '../lib/api/survey_target';



const [GET_GROUP_LIST, GET_GROUP_LIST_SUCCESS, GET_GROUP_LIST_FAILURE] = createRequestActionTypes(
  'auth/getGroupList'
);
const [GET_MEMBER_LIST, GET_MEMBER_LIST_SUCCESS, GET_MEMBER_LIST_FAILURE] = createRequestActionTypes(
  'group/getemberList'
);

export const getGroupList = createAction(GET_GROUP_LIST);
export const getMemberList = createAction(GET_MEMBER_LIST, ({ selectedType, searchKeyword }) => ({
  selectedType, searchKeyword 
}));
const getGroupListSaga = createRequestSaga(GET_GROUP_LIST, surveyTargetAPI.allGroupList);
const geMemberListSaga = createRequestSaga(GET_MEMBER_LIST, surveyTargetAPI.allUserList);

export function* surveyTargetSaga() {
    yield takeLatest(GET_GROUP_LIST, getGroupListSaga);
    yield takeLatest(GET_MEMBER_LIST, geMemberListSaga);

}
const initialState = {
  groupList: List([]),
  memberList: List([]),
};

const surveyTarget = handleActions({

    [GET_GROUP_LIST_SUCCESS]: (state, { payload: groupList }) =>  {
      state.groupList = List(groupList);
      return state;
    },

    [GET_MEMBER_LIST_SUCCESS]: (state, { payload: memberList }) =>  {
      state.memberList = List(memberList);
      return state;
    },
  },

  initialState
);

export default surveyTarget;