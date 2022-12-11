import React, {useState} from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow, CCol,
} from "@coreui/react";
import SurveyInfo from "./info/SurveyInfo";
import QuestionInfo from "./info/QuestionInfo";
import { useParams } from 'react-router-dom'; 

import axios from "axios";
import apiConfig from "../../../lib/apiConfig";
import usePromise from "../../../lib/usePromise";

const RegisterAnswer = () => {
  const params = useParams();
  let surId = params.sur_id;

  let surInfo = null;
  let questionList = []
  const [loading, response, error] = usePromise(() => {
    return axios.post(apiConfig.surveyDetail,
      {sur_id: surId},
      {headers: { 'Content-Type': 'multipart/form-data'}}
    )
  }, []);

  if(response != null){
    surInfo = response.data.info;
    questionList = response.data.question_list
  }
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong> 설문 참여 </strong>
            <small> 설문에 참여 할 수 있습니다.</small>
          </CCardHeader>
          <CCardBody>
            <div>
            <SurveyInfo surInfo={surInfo}/>
            <QuestionInfo surId={surId} questionList={questionList}/>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default RegisterAnswer
