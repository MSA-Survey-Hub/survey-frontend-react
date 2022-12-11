import { React, useState, useEffect } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CInputGroup,
  CFormSelect,
  CTable,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableHead,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter, CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilPlus, cilMinus } from '@coreui/icons';
import { useSelector, useDispatch } from 'react-redux';
import * as surveyTargetActions from "../../../../modules/surveyTarget";
import * as surveySendActions from "../../../../modules/surveySend";


const Send = () => {
  const dispatch = useDispatch();

  const { groupList, memberList } = useSelector(({ surveyTarget }) => ({
    groupList : surveyTarget.groupList,
    memberList : surveyTarget.memberList
  }));

  const { selectedList } = useSelector(({ surveySend }) => ({
    selectedList : surveySend
  }));

  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedType, setSelectedType] = useState('Name');
  const [searchKeyword, setSearchKeyword] = useState('');


  // 그룹 리스트 조회
  useEffect(() => {
    dispatch(surveyTargetActions.getGroupList());
  }, []);

  // 그룹 선택
  const handleSelect = (e) => {
    setSelectedGroupId(e.target.value);
  }

  // 회원 검색 타입 선택
  const handleSelect2 = (e) => {
    setSelectedType(e.target.value);
  }

  // 회원 검색 키워드 입력
  const handleSearchInput = (e) => {
    setSearchKeyword(e.target.value);
  }

  // 회원 검색 버튼 클릭
  const handleClickSearch = (e) => {
    dispatch(surveyTargetActions.getMemberList({selectedType, searchKeyword}));
  }

  // 선택목록 추가 
  const addSendItemHandler = (e, member) => {
    dispatch(surveySendActions.addSelectedList({member}));
  }

  // 선택목록 삭제
  const subSendItemHandler = (member) => {
    dispatch(surveySendActions.deleteSelectedList({member}));
  }

  return (
    <>
      <CRow>
        <CCol xs={6}>
          <>
            <CCard className="mb-3">
              <CCardHeader>그룹 선택</CCardHeader>
              <CCardBody>
                <CFormSelect className="mb-3" onChange={handleSelect}>
                  <option>그룹을 선택하세요</option>
                  {groupList.map((data) => (
                    <option value={data.groupId} key={data.groupId}>
                      {data.groupName}
                    </option>
                  ))}
                </CFormSelect>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                  { groupList.map((group) =>
                    group.groupId == selectedGroupId? group.prtcpList.map((member) => (
                      <CTableRow key={member.userId}>
                        <CTableHeaderCell scope="row">
                          <CIcon
                            className="CButton"
                            icon={cilPlus}
                            size="sm"
                            onClick={(e) => {
                              addSendItemHandler(e, member )
                            }}
                          ></CIcon>
                        </CTableHeaderCell>
                        <CTableDataCell>{member.name}</CTableDataCell>
                        <CTableDataCell>{member.mailAddr}</CTableDataCell>
                      </CTableRow>
                    ))
                    : null,
                  )}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
            <CCard className="mb-3">
              <CCardHeader>회원 검색</CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormSelect onChange={handleSelect2}>
                    <option value="Name">Name</option>
                    <option value="Email">Email</option>
                  </CFormSelect>
                  <CFormInput onInput={handleSearchInput} />
                  <CButton type="submit" onClick={handleClickSearch}>Search</CButton>
                </CInputGroup>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {memberList.map((member) => (
                      <CTableRow key={member.userId}>
                        <CTableHeaderCell scope="row">
                          <CIcon
                            className="CButton"
                            icon={cilPlus}
                            size="sm"
                            onClick={(e) => {
                              addSendItemHandler(e, member)
                            }}
                          ></CIcon>
                        </CTableHeaderCell>
                        <CTableDataCell>{member.name}</CTableDataCell>
                        <CTableDataCell>{member.mailAddr}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </>
        </CCol>
        <CCol xs={6}>
          <CCard>
            <CCardHeader>선택 목록</CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {selectedList.map((member) => (
                    <CTableRow key={member.userId}>
                      <CTableHeaderCell scope="row">
                        <CIcon
                          className="CButton"
                          icon={cilMinus}
                          size="sm"
                          onClick={(e) => {
                            subSendItemHandler(member)
                          }}
                        ></CIcon>
                      </CTableHeaderCell>
                      <CTableDataCell>{member.name}</CTableDataCell>
                      <CTableDataCell>{member.mailAddr}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Send
