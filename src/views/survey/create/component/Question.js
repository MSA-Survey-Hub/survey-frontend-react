import React, { useState, useRef } from 'react';

import {
  CFormCheck,
  CFormTextarea,
  CFormInput,
  CCol,
  CRow,
  CCardHeader,
  CCloseButton,
  CCardBody,
  CButton,
  CCard,
  CFormRange,
  CFormSelect,
  CInputGroup
} from '@coreui/react'


const Question = ({question, changeContent, deleteQuestion, editQuestionType, addAnswer, deleteAnswer}) => {
    const inputRef = useRef("");
    
    // 질문 내용 수정
    function onChangeQuestionContent(e) {
        const { value, name } = e.target;
        const id = question.get("id");
        changeContent({id, value, name});
    }

    //질문 유형 수정
    function onChangeQuestionType(e) {
        const { value, name } = e.target;
        const id = question.get("id");
        editQuestionType({id, value, name});
    }

    // 질문 삭제
    function onclickDeleteBtn(){
        const id = question.get("id");
        deleteQuestion({id});
    }

    // 답변 추가
    function onclickAddAnswer(e) {
        const value = inputRef.current.value;
        const id = question.get("id");
        if(value !== ''){
            addAnswer({id, value});
            inputRef.current.value = '';
        }
    }

    // 답변 삭제
    function onclickDeleteAnswer(e) {
        const id = question.get("id");
        const aid = e.target.id.split("_")[1];
        console.log(id, aid);
        deleteAnswer({id, aid})
    }


    return (
    <>
    <CRow key={"q"+question.get("id")}>
        <CCol xs={6}>
            <CCard className="mb-3">
                <CCardHeader>
                    질문 {question.get("id")} <CCloseButton className="float-end" onClick={onclickDeleteBtn}/>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol className="mb-3" xs={12}>
                        <CFormSelect name="answer_type" value={question.get("questionType")} label="Type" onChange={onChangeQuestionType}>
                            <option value="Sub">주관식</option>
                            <option value="NumMul">객관식(중복 허용)</option>
                            <option value="NumOnly">객관식(중복 불가)</option>
                            <option value="YN">찬부식</option>
                            <option value="Grd">서열식</option>
                        </CFormSelect>
                        </CCol>
                        <CCol className="mb-3" xs={12}>
                        <CFormInput name ="question_content" type="text" label="Question" value={question.get("content")} onChange={onChangeQuestionContent}/>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>

        <CCol xs={6}>
            <CCard className="mb-3">
                <CCardHeader>질문{question.get("id")}. {question.get("content")}</CCardHeader>
                <CCardBody>
                {question.get("questionType") === 'Sub' && (
                    <CFormTextarea></CFormTextarea>
                )}
                {question.get("questionType") === 'NumMul' && (
                    <>
                    {question.get("optionList").map((option) => (
                        <>
                        <CRow>
                            <CCol xs={9}>
                            <CFormCheck key={question.get("id") +"_"+ option.get("queOptId")} type="checkbox" name={"NumMul" + question.get("id")} label={option.get("optionName")} /> 
                            </CCol>
                            <CCol xs={3}>
                                <CButton id={"del"+question.get("id")+"_"+option.get("queOptId")} className="float-end" color="danger" size="sm" shape="rounded-pill" variant="ghost" onClick={onclickDeleteAnswer}>X</CButton>
                            </CCol>
                        </CRow>
                        </>
                    ))}
                    <CRow className='mt-2 mb-1' key={question.get("id") +"_NumNuladd"}>
                        <CInputGroup>
                            <CFormInput type="text" placeholder="답변을 입력해주세요." ref={inputRef}/>
                            <CButton key={'addanswer'+ question.get("id")} name={'addanswerbtn_'+ question.get("id")} color="primary" variant="outline" onClick={onclickAddAnswer}>Add</CButton>
                        </CInputGroup>
                    </CRow>
                    </>
                )}
                {question.get("questionType") === 'NumOnly' && (
                <>
                    {question.get("optionList").map((option) => (                        
                        <>
                        <CRow>
                            <CCol xs={9}>
                                <CFormCheck key={question.get("id") +"_"+ option.get("queOptId")} type="radio" name={"NumOnly" + question.get("id")} label={option.get("optionName")} defaultChecked/>
                            </CCol>
                            <CCol xs={3}>
                                <CButton id={"del"+question.get("id")+"_"+option.get("queOptId")} className="float-end" color="danger" size="sm" shape="rounded-pill" variant="ghost" onClick={onclickDeleteAnswer}>X</CButton>
                            </CCol>
                        </CRow>
                         </>
                    ))}
                <CRow className='mt-2 mb-1' key={question.get("id") +"_NumOnlyAdd"}>
                    <CInputGroup>
                        <CFormInput type="text" placeholder="답변을 입력해주세요." ref={inputRef}/>
                        <CButton key={'addanswer'+ question.get("id")}  name={'addanswerbtn_'+ question.get("id")} color="primary" variant="outline" onClick={onclickAddAnswer}>Add</CButton>
                    </CInputGroup>
                    
                    </CRow>
                </>
                )}
                {question.get("questionType") === 'YN' && (
                    <>
                    <CFormCheck key={question.get("id") +"_1"} type="radio" name={'addanswerbtn_'+ question.get("id")} label="예" />
                    <CFormCheck key={question.get("id") +"_2"} type="radio" name={'addanswerbtn_'+ question.get("id")} label="아니오" />

                    </>
                )}
                {question.get("questionType") === 'Grd' && (
                    <CFormRange min="0" max="100" step="10"/>
                )}
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    </>
    )
}

export default Question