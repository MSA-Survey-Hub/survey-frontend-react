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
import { useSelector } from 'react-redux'

const PrtcpList = () => {

  const { user } = useSelector(({user})=> ({user:user.user}));

  const current = decodeURI(window.location.href);
  const search = current.split("?")[1];
  const params = new URLSearchParams(search);
  const nowPage = params.get('page') ? params.get('page') : 1;

  let page = {
    prev: false,
    start: 1,
    page: 3,
    next: false,
    end: 1,
    pagelist: [1],
  }
  let category = [
  {id: 1, name: '학교' },
  {id: 2, name: '기업',},
  {id: 3,name: '연애',},
  {id: 4,name: '사업',},
  {id: 5, name: '취미',},
]

let surveyList = [];

const accessToken = user.token.access_token;

const [loading, response, error] = usePromise(() => {
  return axios.get(apiConfig.surveyParticipateList + "?&category_id=10&page="+ nowPage,{headers: {'Authorization': 'Bearer ' + accessToken }})
}, []);

console.log(response);

if(response != null){
  surveyList = response.data.content;
  let arr = [];
  for (let i = 0; i < response.data.totalPages; i++) {
    arr.push(i+1);
  }
  page.pagelist = arr;
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
            <strong> 참여 목록 </strong>
            <small> 참여한 설문조사를 조회 할 수 있습니다. </small>

          </CCardHeader>
          <CCardBody>
            <CCard className="mb-2">
              <CCardBody>
                <CForm action={'/search'} method={'post'}>
                  <CInputGroup className="mb-4">
                    <CDropdown variant="input-group">
                      <CDropdownToggle color="secondary" variant="outline">
                        분류 선택
                      </CDropdownToggle>
                      <CDropdownMenu>
                        {category.map((data) => (
                          <CDropdownItem href={'/search?category=' + data.id} key={data.id}>
                            {data.name}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                    <CFormInput aria-label="Text input with 2 dropdown buttons" />
                    <CButton type="submit">검색</CButton>
                  </CInputGroup>
                </CForm>
                <CRow>
                {surveyList.map((data) => (
                    <CCol xs={3} key={data.sur_id} >
                      <CCard className="mb-4">
                        <CCardHeader>{data.content}</CCardHeader>
                        <CCardBody>
                          <CCardTitle>{data.title}</CCardTitle>
                          <CCardText>
                            <small>{moment(new Date(data.reg_dt)).format('YYYY-MM-DD')}~ {moment(new Date(data.due_dt)).format('YYYY-MM-DD')}</small><br/>
                            { data.display_status == "P" ? ( <CBadge color="success">{data.status_name}</CBadge> ) : null }
                            { data.display_status == "I" ? ( <CBadge color="primary">{data.status_name}</CBadge> ) : null }
                            { data.display_status == "F" ? ( <CBadge color="danger">{data.status_name}</CBadge> ) : null }

                          </CCardText>
                        </CCardBody>
                        <CCardFooter>
                        <CButton color="primary" variant="outline" className="m-1" size="sm" onClick={(e) => SurveyDetailOnClickHandler(e, '#/survey/detail', data.sur_id)}>Details</CButton>
                        { data.display_status == "P" ? (  <CButton color="success" variant="outline" className="m-1" size="sm">Edit</CButton>):null}
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
                        <a href={'/search?category=' + page.category + '&page=' + page.start - 1}>&laquo;</a>
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
                        <a href={'/search?category=' + page.category + '&page=' + idx}>{idx}</a>
                      </CPaginationItem>
                    ),
                  )}
                  {page.next ? (
                    <CPaginationItem aria-label="Next">
                      <span aria-hidden="true">
                        <a href={'/search?category=' + page.category + '&page=' + page.end + 1}>&raquo;</a>
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
    </>
  )
}

export default PrtcpList
