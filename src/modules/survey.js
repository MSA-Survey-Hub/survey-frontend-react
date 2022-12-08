import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes} from '../lib/createRequestSaga';
import { delay, put, takeLatest, select, throttle } from 'redux-saga/effects';
import {Map, List} from 'immutable';
import moment from 'moment';



const EDIT_TITLE = 'survey/edit_title';
const EDIT_CATEGORY = 'survey/edit_category';
const EDIT_DUEDATE = 'survey/edit_duedate';
const EDIT_DUETIME = 'survey/edit_duetime';
const EDIT_LOGIN_YN = 'survey/edit_login_yn';
const EDIT_PRIVATE_YN = 'survey/deit_private_yn';
const EDIT_MODIFY_YN = 'survey/deit_modify_yn';
const EDIT_ANNOY_YN = 'survey/deit_annoy_yn';
const EDIT_DESCRIPTION = 'survey/deit_description';



export const editTitle = createAction(EDIT_TITLE,({value, name}) => ({
    value, name
}));
export const eidtCategory = createAction(EDIT_CATEGORY,({value, name}) => ({
    value, name
}));
export const editDueDate = createAction(EDIT_DUEDATE,({value, name}) => ({
    value, name
}));
export const editDueTime = createAction(EDIT_DUETIME,({value, name}) => ({
    value, name
}));
export const editLoginYn = createAction(EDIT_LOGIN_YN,({value, name}) => ({
    value, name
}));
export const editPrivateYn = createAction(EDIT_PRIVATE_YN,({value, name}) => ({
    value, name
}));
export const editModifyYn = createAction(EDIT_MODIFY_YN,({value, name}) => ({
    value, name
}));
export const editAnnoyYn = createAction(EDIT_ANNOY_YN,({value, name}) => ({
    value, name
}));
export const editDescription = createAction(EDIT_DESCRIPTION,({value, name}) => ({
    value, name
}));

export function* surveySaga() {
}


const dt = new Date();
const duedt = dt.setMonth(dt.getMonth() + 1);

const initialState = Map({
    title : "",
    categoryId : "1",

    dueDate:moment(new Date(duedt)).format('YYYY-MM-DD'),
    dueTime: "12:00",
    isLoginYn : "Y",
    isPrivateYn : "N",
    isModifyYn : "Y",
    isAnnoyYn : "N",
    description : "",
    version : 1,
    status : "P"
});



const survey = handleActions({

    [EDIT_TITLE] : (state, {payload: survey }) => { 
        return state.set("title",survey.value );
    },
    [EDIT_CATEGORY] : (state, {payload: survey }) => { 
        console.log(state.get("categoryId"));
        return state.set("categoryId",survey.value );
    },
    [EDIT_DUEDATE] : (state, {payload: survey }) => { 
        return state.set("dueDate",survey.value);
    },
    [EDIT_DUETIME] : (state, {payload: survey }) => {
        return state.set("dueTime",survey.value );
    },
    [EDIT_LOGIN_YN] : (state, {payload: survey }) => {
        return state.set("isLoginYn",survey.value );
    },
    [EDIT_PRIVATE_YN] : (state, {payload: survey }) => {
        return state.set("isPrivateYn",survey.value );
    },
    [EDIT_MODIFY_YN] : (state, {payload: survey }) => {
        return state.set("isModifyYn",survey.value );
    },
    [EDIT_ANNOY_YN] : (state, {payload: survey }) => {
        return state.set("isAnnoyYn",survey.value );
    },
    [EDIT_DESCRIPTION] : (state, {payload: survey }) => {
        return state.set("description",survey.value );
    },





  },
  initialState
);

export default survey;