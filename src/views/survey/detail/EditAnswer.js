import {
  CCard, CCardBody, CCardHeader, CCol, CRow,
} from "@coreui/react";
import React from "react";
import SurveyInfo from "./info/SurveyInfo";
import UpdateInfo from "./info/UpdateInfo";
import { useParams } from 'react-router-dom'; 
import axios from "axios";
import apiConfig from "../../../lib/apiConfig";
import usePromise from "../../../lib/usePromise";


const EditAnswer = () => {

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


  return(
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>답변 수정 </strong>
            <small> 참여한 설문의 답변을 수정 할 수 있습니다.</small>
          </CCardHeader>
          <CCardBody>
            <div>
            <SurveyInfo surInfo={surInfo}/>
              <UpdateInfo surId={surId}/>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  )
}

export default EditAnswer
