import React from 'react';
import {
    CFormSelect,
    CFormInput,
    CCol,
    CCard,
    CCardBody,
    CForm,
    CFormSwitch,
    CTooltip
  } from '@coreui/react'


import { useSelector, useDispatch } from 'react-redux';
import * as surveyActions from "../../../../modules/survey";
import axios from 'axios';
import apiConfig from 'src/lib/apiConfig';
import usePromise from 'src/lib/usePromise';

const CreateSurveyInfo = ({showSendTab}) => {


    const dispatch = useDispatch();
    const { survey } = useSelector(({ survey }) => ({
        survey : survey
    }));

    let categoryList = [];
    const [loading, response, error] = usePromise(() => {
    return axios.get(apiConfig.surveyCategorySelectList)
    }, []);
    if(response != null){
        categoryList = response.data;
    }

    // 제목 수정
    function onChangeTitle(e) {
        const { value, name } = e.target;
        dispatch(surveyActions.editTitle({value, name}));
    }
   
    // 카테고리 수정
    function onChangeCategoryId(e) {
        const { value, name } = e.target;
        dispatch(surveyActions.eidtCategory({value, name}));
    }
    
    // 설문 마감일 수정
    function onChangeDueDate(e) {
        const { value, name } = e.target;
        dispatch(surveyActions.editDueDate({value, name}));
    }

    // 설문 마감 시간 수정
    function onChangeDueTime(e) {
        const { value, name } = e.target;
        dispatch(surveyActions.editDueTime({value, name}));
    }

    // 설문 공개 선택
    function onChangePrivateYn(e) {
        const { value, name } = e.target;
        dispatch(surveyActions.editPrivateYn({value, name}));
    }

    // 피설문자 로그인 여부
    function onChangeLoginYn(e) {
        const { value, name } = e.target;
        dispatch(surveyActions.editLoginYn({value, name}));
    }

    // 피설문자 답변 수정 여부
    function onChangeModifyYn(e) {
        const { value, name } = e.target;
        dispatch(surveyActions.editModifyYn({value, name}));
    }

    // 피설문자 익명 여부
    function onChangeAnnoyYn(e) {
        const { value, name } = e.target;
        dispatch(surveyActions.editAnnoyYn({value, name}));
    }

    // 설문 상세 수정
    function onChangeDescription(e) {
        const { value, name } = e.target;
        dispatch(surveyActions.editDescription({value, name}));
    }

    // 바로 배포
    function changeSwitch(e){
        const checked = e.target.checked;
       showSendTab(checked);
    };


    return (
        <>
        <CCard className="mb-3">
        <CCardBody>
        <CForm className="row g-3">
            <CCol xs={3}>
                <CFormSelect label="설문 분류 선택" name="catefory_id" value={survey.get("categoryId")} onChange={onChangeCategoryId}>
                    {categoryList.map((catogory) => (
                        <option key={catogory.surCatId} value={catogory.surCatId}>{catogory.content}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={3}>
                <CFormInput label="설문 이름" placeholder="설문 이름을 입력하세요" name="name" value={survey.get("title")} onChange={onChangeTitle}/>
            </CCol>
            <CCol xs={6}>
                <CFormInput label="설문 상세" placeholder="설문 설명을 입력하세요" name="descripton"  value={survey.get("description")} onChange={ onChangeDescription}></CFormInput>
            </CCol>
            <CCol xs={3}>
                <CFormInput label="설문 마감일" type="date" value={survey.get("dueDate")} onChange={onChangeDueDate}/>
            </CCol>
            <CCol xs={3}>
                <CFormInput label="설문 마감 시간" type="time" value={survey.get("dueTime")} onChange={onChangeDueTime}/>
            </CCol>
            <CCol xs={3}>
                <CFormSelect label="설문 공개 선택" name="private_yn" value={survey.get("isPrivateYn")} onChange={onChangePrivateYn}>
                    <option value="N">전체 공개</option>
                    <option value="Y">대상자 설정</option>
                </CFormSelect>
            </CCol>
            {/* <CCol xs={3}>
                <CFormSelect label="피설문자 로그인 여부" name="login_yn" value={survey.get("isLoginYn")} onChange={onChangeLoginYn}>
                    <option value="Y">로그인 필수</option>
                    <option value="N" disabled>로그인 필요 없음</option>
                </CFormSelect>
            </CCol> */}
            <CCol xs={3}>
                <CFormSelect label="피설문자 답변 수정 여부" name="modify_yn" value={survey.get("isModifyYn")} onChange={onChangeModifyYn}>
                    <option value="Y">수정 가능</option>
                    <option value="N">수정 불가능</option>
                </CFormSelect>
            </CCol>
            {/* <CCol xs={3}>
                <CFormSelect label="피설문자 익명 여부" name="annoy_yn" value={survey.get("isAnnoyYn")} onChange={onChangeAnnoyYn}>
                    <option value="Y" disabled>익명 가능</option>
                    <option value="N">익명 불가능</option>
                </CFormSelect>
            </CCol> */}
          
            <CCol xs={12}>
            <CTooltip
            content="설문조사 등록 동시에 발송됩니다. 발송 탭을 확인해 주세요."
            placement="top"
            >
                <CFormSwitch label="바로 배포" id="formSwitchCheckChecked" onChange={changeSwitch}/>
            </CTooltip>            
            </CCol>
        </CForm>
        </CCardBody>
        </CCard>
    </>
    )

}

export default CreateSurveyInfo;