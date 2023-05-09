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
  CImage, CTableHeaderCell, CTableRow, CTableDataCell,CInputGroup,CFormSelect
} from '@coreui/react'
import ReactImg from 'src/assets/images/test_img.jpeg'
import axios from 'axios';
import apiConfig from "../../../lib/apiConfig";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const GroupDetail = () => {
  const params = useParams();
  const { user } = useSelector(({user})=> ({user:user.user}));
  const [groupDetail, setGroupDetail] = useState(null);
  const [groupName, setGroupName] = useState();
  const [groupDescription, setGroupDescription] = useState();
  const [groupId, setGroupId] = useState();
  const [groupUserList, setGroupUserList] = useState([]);
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  const [type, setType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const [newGroupUserList, setNewGroupUserList] = useState([]);
  const [deleteGroupUserList,setDeleteGroupUserList] = useState([]);

  useState(async () => {
    await axios.get(apiConfig.groupDetail + "/" + params.group_id)
      .then((response) => {
        setGroupDetail(response.data)
        setGroupId(response.data.groupId)
        setGroupName(response.data.groupName)
        setGroupDescription(response.data.groupDescription)
        setGroupUserList(response.data.prtcpList)
        console.log(response.data.groupCnt)
      })
  })

  const modifyGroup = async () => {
    const newGroupUserListMod = []
    const groupModify = new FormData();
    groupModify.append("groupId", groupId)
    groupModify.append("groupName",groupName)
    groupModify.append("groupDescription",groupDescription)
    groupModify.append("groupCnt",groupDetail.groupCnt)
    
    newGroupUserList.map((user)=>{
      newGroupUserListMod.push(user.userId)
    })
    groupModify.append("newGroupUserList",newGroupUserListMod)
    groupModify.append("deleteGroupUserList",deleteGroupUserList)

    await axios.patch(apiConfig.groupModify,groupModify,config)
      .then((response)=>console.log(response));
  }

  const searchUser = async () => {
    await axios.get(apiConfig.allUserList,{params: {
      type: type,
      keyword: keyword
    }},{headers: {"Content-Type" : "multipart/form-data"}})
      .then((response) => {
        console.log("setSearchUserList: ",response.data)
        setSearchUserList(response.data)
      })
  }

  const addGroupUser = (userId) => {
    setNewGroupUserList([...newGroupUserList, userId])
    setGroupUserList([...groupUserList, userId])
  }

  const deleteGroupUser = (userId) => {
    setDeleteGroupUserList([...deleteGroupUserList,userId])
    setGroupUserList(groupUserList.filter((groupUser) => groupUser.userId !== userId))
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
                    defaultValue={groupDetail?groupDetail.groupName:null}
                    onChange={(e)=>{setGroupName(e.target.value)}}
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
                    onChange={(e)=>{setGroupDescription(e.target.value)}}
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
                      {groupUserList?groupUserList.map((user, index) => (
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
            <CRow className="mb-3">
            <CFormLabel className="col-sm-3">그룹 참여자</CFormLabel>
            <div className="col-sm-9">
              <CRow>
                <CCol lg={6}>
                  {/* 그룹 참여자 검색 */}
                  <CInputGroup className="mb-1">
                    <CFormSelect onChange={(e) => setType(e.target.value)}>
                      <option>검색 옵션</option>
                      <option value="Mail">이메일 검색</option>
                      <option value="Name">이름 검색</option>
                    </CFormSelect>
                    <CFormInput type="text" onChange={(e) => setKeyword(e.target.value)}/>
                    <CButton variant="outline" onClick={searchUser}>search</CButton>
                  </CInputGroup>

                  <CListGroup className="mb-3 custom_height">
                    {searchUserList.length>0?searchUserList.map((user) => (
                      <CListGroupItem key={user.userId} className="d-flex">
                        <span>{user.name}({user.userId})</span>
                        <div className="ms-auto">
                          <CButton
                            color="success"
                            size="sm"
                            variant="outline"
                            onClick={(e)=>addGroupUser(user)}
                          >add
                          </CButton>
                        </div>
                      </CListGroupItem>
                    )):null}
                  </CListGroup>
                </CCol>


                <CCol lg={6}>
                  <CListGroup className="mb-1">
                    <CListGroupItem active>선택된 사용자 목록</CListGroupItem>
                  </CListGroup>
                  <CListGroup className="mb-3 custom_height">
                    {groupUserList.length>0?
                      groupUserList.map(
                        (userInfo) => (
                        <CListGroupItem key={userInfo.userId} className="d-flex">
                          <span>{userInfo.userId}</span>
                          <div className="ms-auto">
                            <CButton
                              color="danger"
                              size="sm"
                              variant="outline"
                              onClick= {(e) => deleteGroupUser(userInfo.userId)}
                            >delete
                            </CButton>
                          </div>
                        </CListGroupItem>
                      )
                      )
                    :null}
                  </CListGroup>
                </CCol>


              </CRow>
            </div>
          </CRow>

          </CCardBody>
          <CCardFooter>
            <CCol lg={12} className="text-end d-flex">
              <CButton color="success" className="ms-auto" variant="outline" onClick={(e)=>modifyGroup()}>
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