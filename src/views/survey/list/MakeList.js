/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from 'react'
import {
  CInputGroup,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CCardHeader,
} from '@coreui/react'
import axios from "axios";
import apiConfig from 'src/lib/apiConfig';
import usePromise from 'src/lib/usePromise';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loading from 'src/lib/Loading/Loading2';
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
  const [keyword, setKeyword] = useState('');
  const [savedkeyword, setSavedKeyword] = useState('');



  useEffect(() => {
    setLoading(true);
    handleFetch(1, '');
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
  const handleFetch = (selectedPage, title) => {
    setLoading(true);

    axios.get(apiConfig.surveyMakeList + "?category="+getSelectedCategory()+"&page="+ selectedPage+"&title="+ title)
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
    handleFetch(selectedPage, savedkeyword);
  };

  const handlekeywordChange = (e) => {
    const { value, name } = e.target;
    setKeyword(value);
  };

  const handleClickSearch = () => {
    setSavedKeyword(keyword);
    handleFetch(1, keyword);
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
                    <CFormInput placeholder='제목을 입력하세요.' value={keyword} onChange={handlekeywordChange}/>
                    <CButton type="button" onClick={handleClickSearch}>검색</CButton>
                  </CInputGroup>
                </CForm>
                <CRow>
                { loading ? <Loading /> : <>
                  {
                    surveyList.length > 0 ? 
                      surveyList.map((data) => (
                      <SurveyCard key={data.surId} data={data} ></SurveyCard>
                      ))  : '생성 목록이 없습니다.'
                  }
                  </>
                }
                </CRow>
                  {
                    surveyList.length > 0 ? (<Pagination
                      activePage={pageData.page}
                      itemsCountPerPage={pageData.size}
                      totalItemsCount={pageData.totalElements}
                      pageRangeDisplayed={10}
                      prevPageText={"‹"}
                      nextPageText={"›"}
                      onChange={handlePageChange}
                    />) : ''
                    }
              </CCardBody>
            </CCard>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>)
  }

export default MakeList
