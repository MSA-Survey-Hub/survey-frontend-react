/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect, createRef } from 'react'
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
} from '@coreui/react'
import axios from "axios";
import apiConfig from 'src/lib/apiConfig';
import usePromise from 'src/lib/usePromise';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loading from 'src/lib/Loading/Loading2';
import { useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";
import SurveyCard from './SurveyCard';

const MakeList = () => {

  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [surveyList, setSurveyList] = useState([]);
  const [pageData, setPageData] = useState({
    totalPage: 0,
    page: 1,
    size: 0,
    start: 0,
    end: 0,
    prev: false,
    next: false,
    totalElements : 1
  })
 
  useEffect(() => {
    handleFetch(1);
  }, []);
  

  // 카테고리 리스트
  let categoryOptionList = [];
  const animatedComponents = makeAnimated();
  const [cloading, response, cerror] = usePromise(() => {
    return axios.get(apiConfig.surveyCategorySelectList)
  }, []);
  if(response != null){
    response.data.map((option) => {
      categoryOptionList.push({ value: option.surCatId, label: option.content });
    });
  }

  // 선택된 카테고리 배열
  function getSelectedCategory(){
    let arr= [];
    if(selectedOption != null){
      selectedOption.forEach(function(option) {
        arr.push(option.value);
      });
    };
    return arr;
  }

  // 설문 리스트
  const handleFetch = (selectedPage) => {
    axios.get(apiConfig.surveyMakeList + "?category="+getSelectedCategory()+"&page="+ selectedPage)
    .then(response => {
      const data = response.data;
      setSurveyList(data.content);
      setPageData({
      totalPage: 0,
      page: data.number+1,
      size: data.size,
      start: 1,
      end: data.totalPages,
      prev: data.first? false: true,
      next: data.last? false: true,
      totalElements : data.totalElements
    }); 
      setLoading(false);
    })
    .catch(error => console.error('Error', error));
  };

  const handlePageChange = (selectedPage) => {
    handleFetch(selectedPage);
  };

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
                { loading ? <Loading /> : <>
                  {surveyList.map((data) => (
                   <SurveyCard key={data.surId} data={data} ></SurveyCard>
                  ))}
                  </>
                }
                </CRow>
<<<<<<< HEAD

                <Pagination
                      activePage={pageData.page}
                      itemsCountPerPage={pageData.size}
                      totalItemsCount={pageData.totalElements}
                      pageRangeDisplayed={10}
                      prevPageText={"‹"}
                      nextPageText={"›"}
                      onChange={handlePageChange}
                    />

=======
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
>>>>>>> 383b9603117fdd2bc818f054e757358adf8f282b
              </CCardBody>
            </CCard>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>)
  }

export default MakeList
