import React, {useEffect} from 'react'
import { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard, CCardBody, CCardHeader,
  CCol, CRow,
  CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CFormCheck, CFormInput,
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CPaginationItem,
  CPagination,
} from '@coreui/react'
import apiConfig from "../../lib/apiConfig";
import axios from "axios";
import usePromise from "../../lib/usePromise";

const Tables = () => {
  const current = decodeURI(window.location.href);
  const search = current.split("?")[1];
  const params = new URLSearchParams(search);
  const nowPage = params.get('page') ? params.get('page') : 1;

  const [modalVisible, setModalVisible] = useState(false)
  const [pageData, setPageData] = useState({
    totalPage: 0,
    page: 1,
    size: 0,
    start: 0,
    end: 0,
    prev: false,
    next: false,
    pageList: []
  })
  const [categoryList, setCategoryList] = useState([])

  // const [loading, response, error] = usePromise(() => {
  //   return axios.get(apiConfig.surveyCategoryList + "?page=" + nowPage)
  // }, []);

  useState(async () => {
    await axios.get(apiConfig.surveyCategoryList + "?page=" + nowPage)
      .then((response) => {
        console.log(response.data)
        setPageData(pageData => ({...pageData, ...response.data, page: nowPage}))
        setCategoryList(response.data.dtoList)
      })
  })


  const [checkedInputs, setCheckedInputs] = useState([])

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  const [categoryName, setCategoryName] = useState("")
  const registerCategory = () => {
    axios.post(apiConfig.surveyCategoryRegister,
      {content: categoryName},
      {headers: { "Content-Type": "application/json" }
      }).then((response) => {
        setModalVisible(false)
        setAlertColor("success")
        setAlertMessage(response.data)
        setAlertVisible(true)
      }).catch((error) => {
      setModalVisible(false)
      setAlertColor("danger")
      setAlertMessage(error.response.data)
      setAlertVisible(true)
    })
  }

  const [alertVisible, setAlertVisible] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const deleteCategory = () => {
    axios.post(apiConfig.surveyCategoryDelete, JSON.stringify(checkedInputs),
      {
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
          setAlertColor("success")
          setAlertMessage(response.data)
          setAlertVisible(true)
    }).catch((error) => {
      console.log(error)
      setAlertColor("danger")
      setAlertMessage(error.response.data)
      setAlertVisible(true)
    })
  }



  return (
    <>
      <CAlert
        visible={alertVisible}
        color={alertColor}
        dismissible
        onClose={() => setAlertVisible(false)}
      >{alertMessage}</CAlert>
      <CCardBody className="text-end">
        <CButton className="mb-3" onClick={() => setModalVisible(!modalVisible)}>
          Register
        </CButton>
      </CCardBody>
      <CModal backdrop="static" visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>설문 카테고리 등록하기</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CFormInput label="카테고리명" name="content" onChange= {(e) => {setCategoryName(e.target.value)}}></CFormInput>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={registerCategory}>Register</CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol xs={12}>
          <code></code>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>설문 카테고리 리스트</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">삭제</CTableHeaderCell>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">카테고리명</CTableHeaderCell>
                    <CTableHeaderCell scope="col">카테고리 등록 날짜</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {categoryList.map((category) => (
                    <CTableRow key={category}>
                      <CTableDataCell>
                        <CFormCheck
                          id={category.surCatId}
                          onChange={(e)=>{changeHandler(e.currentTarget.checked, category.surCatId)}}
                                    checked={checkedInputs.includes(category.surCatId) ? true : false}/>
                      </CTableDataCell>
                      <CTableHeaderCell scope="row">{category.surCatId}</CTableHeaderCell>
                      <CTableDataCell>{category.content}</CTableDataCell>
                      <CTableDataCell>{category.regDt}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CButton color="danger" onClick={deleteCategory}>Delete</CButton>
            </CCardBody>
          </CCard>

          <CPagination aria-label="Page navigation example" align="center">
            {pageData.prev ? (
              <CPaginationItem aria-label="Previous">
            <span aria-hidden="true">
              <a href={"/#/category/category_list?page=" + String(parseInt(pageData.start) - 1)}>&laquo;</a>
            </span>
              </CPaginationItem>
            ) : (
              <CPaginationItem aria-label="Previous" disabled>
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
            )}
            {pageData.pageList.map((idx) =>
              idx === parseInt(pageData.page) ? (
                <CPaginationItem active key={idx}>{pageData.page}</CPaginationItem>
              ) : (
                <CPaginationItem key={idx}>
                  <a href={"/#/category/category_list?page=" + idx}>{idx}</a>
                </CPaginationItem>
              ),
            )}
            {pageData.next ? (
              <CPaginationItem aria-label="Next">
            <span aria-hidden="true">
              <a href={"/#/category/category_list?page=" + String(parseInt(pageData.end) + 1)}>&raquo;</a>
            </span>
              </CPaginationItem>
            ) : (
              <CPaginationItem aria-label="Next" disabled>
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            )}
          </CPagination>




        </CCol>
      </CRow>
    </>
  )
}

export default Tables
