import React, { useState } from 'react'
import {
  CInputGroup,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CRow,
  CCol,
  CForm,
  CCardFooter,
  CCardHeader,
  CBadge,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import axios from "axios";
import apiConfig from 'src/lib/apiConfig';
import usePromise from 'src/lib/usePromise';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loading from 'src/lib/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const MakeList = () => {
  const navigate = useNavigate();


  const { user } = useSelector(({user})=> ({user:user.user}));
  
  let accessToken = null;
  if(user == null){
    navigate('/');

  }else{
    accessToken = user.token.access_token;
  }


  const current = decodeURI(window.location.href);
  const search = current.split("?")[1];
  const params = new URLSearchParams(search);
  const nowPage = params.get('page') ? params.get('page') : 1;

  const [selectedOption, setSelectedOption] = useState(null);

  // 카테고리 리스트
  let categoryOptionList = [];
  const animatedComponents = makeAnimated();
  const [cloading, cresponse, cerror] = usePromise(() => {
    return axios.get(apiConfig.surveyCategorySelectList)
  }, []);
  if(cresponse != null){
    cresponse.data.map((option) => {
      categoryOptionList.push({ value: option.surCatId, label: option.content });
    });
  }


  function getSelectedCategory(){
    let arr= [];
    if(selectedOption != null){
      selectedOption.forEach(function(option) {
        arr.push(option.value);
      });
    };
    return arr;
  }

  let surveyList = [];
  let page = {
    prev: false,
    start: 1,
    page: 3,
    next: false,
    end: 1,
    pagelist: [1],
  }
  const [loading, response, error] = usePromise(() => {
    return axios.get(apiConfig.surveyMakeList + "?category="+getSelectedCategory()+"&page="+ nowPage,
    {headers: {'Authorization': 'Bearer ' + accessToken }})
  }, []);

  if(response != null){
    console.log(response);
    surveyList = response.data.content;
    page.page = response.data.number+1;
    let arr = [];
    for (let i = 0; i < response.data.totalPages; i++) {
      arr.push(i+1);
    }
    page.pagelist = arr;
  }

  const DuplicateSurveyOnClickHandler = (e, link,sur_id) => {
    window.location.href = link+'?copy='+sur_id;
  }

  const SurveyDetailOnClickHandler = (e, link,sur_id) => {
    window.location.href = link+"/"+sur_id;
  }

  return (
    <>
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong> 생성 목록 </strong>
            <small> 생성한 설문조사를 조회 할 수 있습니다. </small>

          </CCardHeader>
          <CCardBody>
            <CCard className="mb-2">
              <CCardBody>
                <CForm>
                  <CInputGroup className="mb-4">
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={categoryOptionList}
                        onChange={setSelectedOption}
                      />
                    <CFormInput aria-label="Text input with 2 dropdown buttons" />
                    <CButton type="button">검색</CButton>
                  </CInputGroup>
                </CForm>
                <CRow>
                  {surveyList.map((data) => (
                    <CCol xs={3} key={data.surId} >
                      <CCard className="mb-4">
                        <CCardHeader>{data.content}</CCardHeader>
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
                          <CButton color="danger" variant="outline" className="m-1" size="sm">Remove</CButton>
                        </CCardFooter>
                      </CCard>
                    </CCol>
                  ))}
                </CRow>
                <CPagination aria-label="Page navigation example" align="center">
                  {page.prev ? (
                    <CPaginationItem aria-label="Previous">
                      <span aria-hidden="true">
                        <a href={'/#/survey/makeList?category=' + getSelectedCategory()+ '&page=' + page.start - 1}>&laquo;</a>
                      </span>
                    </CPaginationItem>
                  ) : (
                    <CPaginationItem aria-label="Previous" disabled>
                      <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                  )}
                  {page.pagelist.map((idx) =>
                    idx === page.page ? (
                      <CPaginationItem active key={idx}>{page.page}</CPaginationItem>
                    ) : (
                      <CPaginationItem key={idx}>
                        <a href={ "#/survey/makeList?category=" + getSelectedCategory() +  "&page=" + idx} >{idx}</a>
                      </CPaginationItem>
                    ),
                  )}
                  {page.next ? (
                    <CPaginationItem aria-label="Next">
                      <span aria-hidden="true">
                        <a href={'/#/survey/makeList?category=' +getSelectedCategory() + '&page=' + page.end + 1}>&raquo;</a>
                      </span>
                    </CPaginationItem>
                  ) : (
                    <CPaginationItem aria-label="Next" disabled>
                      <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                  )}
                </CPagination>
              </CCardBody>
            </CCard>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>)
  }

export default MakeList
