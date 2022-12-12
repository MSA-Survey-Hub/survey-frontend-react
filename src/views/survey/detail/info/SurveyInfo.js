import React, { useState } from 'react'
import {
  CFormLabel,
  CFormInput,
  CCol,
  CRow,
  CBadge,
} from '@coreui/react'
import moment from 'moment';

const SurveyInfo = ({surInfo}) => {
  console.log(surInfo);

  let statusName = null;
  if(surInfo != null){
    statusName =  surInfo.status == "P" ? "제작" : ( new Date() < new Date(surInfo.dueDt)? "배포" : "마감");
  }
  return (
    <div>
        <CRow>
            <CFormLabel htmlFor="surveyName" className="col-sm-2 col-form-label">
            설문명
            </CFormLabel>
            <CCol sm={9}>
              <CFormInput
                  type="text"
                  id="surveyName"
                  value={surInfo? surInfo.title:null}
                  readOnly
                  plainText
                  />
            </CCol>
            <CCol sm={1}>
              <CBadge color={ surInfo? ( statusName == "제작" ?  "success" : (statusName == "배포"? "primary" : "danger")):null}> {statusName} </CBadge>
          </CCol>
        </CRow>
        
        <CRow>
            <CFormLabel htmlFor="category" className="col-sm-2 col-form-label">
            카테고리
            </CFormLabel>
            <CCol sm={10}>
            <CFormInput
                type="text"
                id="category"
                value={surInfo? surInfo.categoryContent:null}
                readOnly
                plainText
                />
            </CCol>
        </CRow>

        <CRow>
          <CFormLabel htmlFor="description" className="col-sm-2 col-form-label">
            설문설명
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="description"
              value={surInfo? surInfo.description:null}
              readOnly
              plainText
            />
          </CCol>
        </CRow>
        <CRow>
            <CFormLabel htmlFor="publicYn" className="col-sm-2 col-form-label">
            공개여부
            </CFormLabel>
            <CCol sm={10}>
            <CFormInput
                type="text"
                id="publicYn"
                value={surInfo? (surInfo.isPrivateYn=="Y"? "대상자 공개" : "전체 공개") :null}
                readOnly
                plainText
                />
            </CCol>
        </CRow>
        <CRow>
          <CFormLabel htmlFor="modiYn" className="col-sm-2 col-form-label">
            답변 수정<br/> 가능 여부
            </CFormLabel>
            <CCol sm={10}>
            <CFormInput
                type="text"
                id="modiYn"
                value={surInfo? (surInfo.isModifyYn=="Y"? "허용" : "비허용") :null}
                readOnly
                plainText
                />
            </CCol>
        </CRow>

        <CRow>
            <CFormLabel htmlFor="regDt" className="col-sm-2 col-form-label">
            등록일
            </CFormLabel>
            <CCol sm={10}>
            <CFormInput
                type="text"
                id="regDt"
                value={surInfo ? moment(new Date(surInfo.regDt)).format('YYYY-MM-DD HH:MM:SS'):null}
                readOnly
                plainText
                />
            </CCol>
        </CRow>
        <CRow>
            <CFormLabel htmlFor="regDt" className="col-sm-2 col-form-label">
            마감일
            </CFormLabel>
            <CCol sm={10}>
            <CFormInput
                type="text"
                id="regDt"
                value={surInfo ?moment(new Date(surInfo.dueDt)).format('YYYY-MM-DD HH:MM:SS'):null}
                readOnly
                plainText
                />
            </CCol>
        </CRow>
        <CRow>
            <CFormLabel htmlFor="regId" className="col-sm-2 col-form-label">
            설문 등록자 
            </CFormLabel>
            <CCol sm={10}>
            <CFormInput
                type="text"
                id="regId"
                value={surInfo? surInfo.regId : null}
                readOnly
                plainText
                />
            </CCol>
        </CRow>



    </div>
  )
}

export default SurveyInfo
