import React, {  } from 'react';
import {

    CButton,
    CCard,
    CCardImage,
    CCardBody,
    CCardTitle,
    CCardText,
    CCol,
    CCardFooter,
    CCardHeader,
    CBadge,
  } from '@coreui/react';
  import moment from 'moment';
  import ReactImg_2 from 'src/assets/images/test5.jpeg';

  
  const SurveyCard = ({data}) => {

    const DuplicateSurveyOnClickHandler = (e, link,sur_id) => {
        window.location.href = link+'?copy='+sur_id;
      }
    
      const SurveyDetailOnClickHandler = (e, link,sur_id) => {
        window.location.href = link+"/"+sur_id;
      }

      return (
        <>
        <CCol xs={3} >
        <CCard className="mb-4">
        <CCardHeader>{data.categoryContent}</CCardHeader>
        <CCardImage orientation="top" src={data.surveImg == undefined || data.surveImg == null ? ReactImg_2 : data.statusName } />
        <CCardBody>
            <CCardTitle>{data.title}</CCardTitle>
            <CCardText>
            <small>{moment(new Date(data.regDt)).format('YYYY-MM-DD')}~ {moment(new Date(data.dueDt)).format('YYYY-MM-DD')}</small><br/>
        
            <CBadge color={ data.statusName == "제작" ?  "success" : (data.statusName == "배포" ?"primary" : "danger")}> {data.statusName}</CBadge>
            </CCardText>
        </CCardBody>
        <CCardFooter>
            <CButton color="primary" variant="outline" className="m-1" size="sm" onClick={(e) => SurveyDetailOnClickHandler(e, '#/survey/detail', data.surId)}>Details</CButton>
            { data.statusName != "제작" ? (  <CButton color="warning" variant="outline" className="m-1" size="sm" onClick={(e) => DuplicateSurveyOnClickHandler(e, '#/survey/create',data.sur_id)}>Copy</CButton>):null}
            { data.statusName == "제작" ? (  <CButton color="success" variant="outline" className="m-1" size="sm">Edit</CButton>):null}
            { data.statusName == "제작" ? ( <CButton color="danger" variant="outline" className="m-1" size="sm">Remove</CButton>):null}
        </CCardFooter>
        </CCard>
        </CCol>
    </>
    )
  }

  export default SurveyCard
