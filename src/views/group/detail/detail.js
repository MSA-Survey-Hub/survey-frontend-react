import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard, CCardBody, CCardHeader, CCardFooter,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CTable, CTableHead, CTableBody,
  CListGroup,
  CListGroupItem,
  CImage, CTableHeaderCell, CTableRow, CTableDataCell,
} from '@coreui/react'

import ReactImg from 'src/assets/images/test_img.jpeg'
import axios from 'axios';
import apiConfig from "../../../lib/apiConfig";
import {useParams} from "react-router-dom";

const GroupDetail = () => {
  const params = useParams();
  const [groupDetail, setGroupDetail] = useState(null);

  useState(async () => {
    await axios.get(apiConfig.groupDetail + "/" + params.group_id)
      .then((response) => {
        setGroupDetail(response.data)
      })
  })

  const modifyGroup = () => {

  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>그룹 상세 </strong>
            <small> 그룹의 상세정보를 조회 할 수 있습니다.</small>
          </CCardHeader>
          <CCardBody>
            <CForm>

              <CRow className="mb-3">
                <CFormLabel className="col-sm-3">그룹명</CFormLabel>
                <div className="col-sm-9">
                  <CFormInput
                    type="text"
                    value={groupDetail?groupDetail.groupName:null}
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel className="col-sm-3">그룹생성자</CFormLabel>
                <div className="col-sm-9">
                  <CFormInput
                    type="text"
                    value={groupDetail?groupDetail.regId:null}
                  />
                </div>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel className="col-sm-3">그룹 이미지</CFormLabel>
                <div className="col-sm-9">
                  <CImage className="mb-3" align="center" rounded src={groupDetail?groupDetail.groupImageUrl:null} width="100%" />
                  <CFormInput type="file"/>
                </div>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel className="col-sm-3">그룹 설명</CFormLabel>
                <div className="col-sm-9">
                  <CFormTextarea
                  defaultValue={groupDetail?groupDetail.groupDescription:null}
                  />
                    
   
                </div>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel className="col-sm-3">그룹 참여자</CFormLabel>
                <div className="col-sm-9">
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">아이디</CTableHeaderCell>
                        <CTableHeaderCell scope="col">이름</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {groupDetail?groupDetail.prtcpList.map((user, index) => (
                        <CTableRow key={user.user_id}>
                          <CTableDataCell>{index+1}</CTableDataCell>
                          {groupDetail.regId === user.userId?
                            <CTableDataCell><strong>{user.userId}</strong><small>(생성자)</small></CTableDataCell>:
                            <CTableDataCell>{user.userId}</CTableDataCell>
                          }
                          <CTableDataCell>{user.name}</CTableDataCell>
                        </CTableRow>
                      )):null}
                    </CTableBody>
                  </CTable>

                </div>
              </CRow>
            </CForm>

          </CCardBody>
          <CCardFooter>
            <CCol lg={12} className="text-end d-flex">
              <CButton color="success" className="ms-auto" variant="outline" onClick={modifyGroup}>
                edit
              </CButton>
            </CCol>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GroupDetail
