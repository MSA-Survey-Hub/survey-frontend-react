import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CButton,
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'

import SurveyInfo from './info/SurveyInfo';
import AnswerInfo from './info/AnswerInfo';
import AnswerReadonlyInfo from './info/AnswerReadonlyInfo';
import Send from '../create/component/Send';
import Charts from '../../analysis/user_survey_analysis';
import { useParams } from 'react-router-dom'; 


import axios from "axios";
import apiConfig from "../../../lib/apiConfig";
import usePromise from "../../../lib/usePromise";


const Detail = () => {

  const [activeKey, setActiveKey] = useState(1)

  const params = useParams();
  let surId = params.sur_id;

  let surInfo = null;
  let questionList = [];
  let answerList = [];
  const [loading, response, error] = usePromise(() => {
    return axios.post(apiConfig.surveyDetail,
      {sur_id: surId},
      {headers: { 'Content-Type': 'multipart/form-data'}
}
    )
  }, []);

  if(response != null){
    surInfo = response.data.info;
    questionList = response.data.question_list;
    answerList = response.data.answer_list;
  }
  let displayStatus = null;
  if(surInfo != null){
    displayStatus =  surInfo.status == "P" ? "P" : ( new Date() < new Date(surInfo.dueDt)? "I" : "F");
  }

  const SurveyparticipateOnClickHandler = (e, link,sur_id) => {
    window.location.href = link+"/"+sur_id;
  }

  function removeSurvey(){

  }
  
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong> 설문 상세 </strong>
            <small> 설문의 상세 정보를 조회 할 수 있습니다.</small>
          </CCardHeader>
          <CCardBody>
          <div>
            <SurveyInfo surInfo={surInfo}/>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '10vh',
              }}
            >
              <CNav variant="pills" role="tablist">
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    active={activeKey === 1}
                    onClick={() => setActiveKey(1)}
                  >
                    질문 조회
                  </CNavLink>
                </CNavItem>

                {displayStatus === "P"?
                (
                  <CNavItem>
                    <CNavLink
                      href="javascript:void(0);"
                      active={activeKey === 2}
                      onClick={() => setActiveKey(2)}
                    >
                      설문 배포
                    </CNavLink>
                  </CNavItem>
                  )
                  :
                (
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    active={activeKey === 2}
                    onClick={() => setActiveKey(2)}
                  >
                    설문 결과
                  </CNavLink>
                </CNavItem>
                )}

              </CNav>
            </div>

            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                {answerList.length>0? <AnswerReadonlyInfo answerList={answerList}/> :<AnswerInfo questionList={questionList}/> }
                
              </CTabPane>

              <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                {displayStatus === "P"?
                  <Send/>: <Charts surId={surId}/>}
              </CTabPane>

            </CTabContent>

            <CCol lg={12} className="text-start d-flex mt-3">

            {/*  */}
            {/* <CButton color="warning"  variant="outline"> copy </CButton>  */}

            {displayStatus === "P"? (<>
              <CButton color="danger"  variant="outline" onClick={removeSurvey}> delete </CButton>
              <CButton color="success" href="/#/survey/ModifySurvey" variant="outline"> edit</CButton>
              <CButton color="primary" className="ms-auto" > distribute </CButton>
              </>
            ):null}
            
            {displayStatus === "I"? (<>
              <CButton color="info" variant="outline"  href={'http://localhost:9000/survey-service/v1/survey/download/excel?sur_id='+ surId}> excel download</CButton>
              { answerList.length> 0 ? 
                 (surInfo.isModifyYn ? (<CButton color="primary" className="ms-auto" variant="outline"  onClick={(e) => SurveyparticipateOnClickHandler(e, '#/survey/answer/edit', surId)}>edit answer</CButton>)
                               : null)
              :(<CButton color="primary" className="ms-auto" variant="outline"  onClick={(e) => SurveyparticipateOnClickHandler(e, '#/survey/answer/register', surId)}>register answer</CButton>)
              }
              </>
            ):null}
      
            {displayStatus === "F"? (
              <CButton color="info" variant="outline"> excel download</CButton>
            ):null}
      
          </CCol>
          </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  )
}

export default Detail
