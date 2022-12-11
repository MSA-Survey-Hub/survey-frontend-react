import React, { useState, useEffect } from 'react'
import {
  CInputGroup,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CTable,
  CTableDataCell,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CRow,
  CCol,
} from '@coreui/react'
import axios from "axios";
import apiConfig from 'src/lib/apiConfig';
import moment from 'moment';
import usePromise from 'src/lib/usePromise';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Loading from 'src/lib/Loading/Loading2';
import Pagination from "react-js-pagination";

const SurveySearchList = () => {


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
  


// 설문 리스트
const handleFetch = (selectedPage, title) => {
  setLoading(true);
  axios.get(apiConfig.surveySearchList + "?category=10&page="+ selectedPage+"&title="+ title)
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




  // 검색 상세 페이지 링크
  const tableRowClick = (e, id) => {
    window.location.href = "/#/survey/detail/"+id;
  }

      
  return (
    <>
    { loading?  <Loading /> : 
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong> 설문 검색 </strong>
            <small> 배포된 설문조사를 조회 할 수 있습니다. </small>
          </CCardHeader>
          <CCardBody>
            <CCard className="mb-2">
              <CCardBody>
                <CForm action={'/#/survey/search'} method={'post'}>
                  <CInputGroup className="mb-4">
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue={1}
                      options={categoryOptionList}
                      onChange={setSelectedOption}

                    />
                    <CFormInput placeholder='제목을 입력하세요.' value={keyword} onChange={handlekeywordChange}/>
                    <CButton type="button" onClick={handleClickSearch}>검색</CButton>
                  </CInputGroup>
                </CForm>
                <CCard className="mb-3">
                  <CCardHeader>검색 목록</CCardHeader>
                  <CCardBody>
                    <CTable className="table-hover">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문분류</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문명</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문내용</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문생성자</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문참여자</CTableHeaderCell>
                          <CTableHeaderCell scope="col">설문일</CTableHeaderCell>
                          <CTableHeaderCell scope="col">마감일</CTableHeaderCell>
                          <CTableHeaderCell scope="col">조회수</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {surveyList.map((data) => (
                          <CTableRow key={data.sur_id} onClick={(e) => tableRowClick(e, data.sur_id)}>
                            <CTableHeaderCell scope="row">{data.sur_id}</CTableHeaderCell>
                            <CTableDataCell>{data.content}</CTableDataCell>
                            <CTableDataCell>{data.title}</CTableDataCell>
                            <CTableDataCell>{data.description}</CTableDataCell>
                            <CTableDataCell>{data.reg_id}</CTableDataCell>
                            <CTableDataCell>{data.answer_cnt}명</CTableDataCell>
                            <CTableDataCell>{moment(new Date(data.reg_dt)).format('YYYY-MM-DD')}</CTableDataCell>
                            <CTableDataCell>{moment(new Date(data.due_dt)).format('YYYY-MM-DD')}</CTableDataCell>
                            <CTableDataCell>{data.views}회</CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
                
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
      }
    </>
  )
}

export default SurveySearchList
