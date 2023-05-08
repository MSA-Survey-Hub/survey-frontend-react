import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard, CCardBody, CCardHeader, CCardFooter,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CInputGroup,
  CListGroup,
  CListGroupItem,
  CFormSelect, CAlert,
} from '@coreui/react'
import apiConfig from "../../../lib/apiConfig";
import axios from "axios";
import {useSelector} from "react-redux";

const FormControl = () => {
  const { user } = useSelector(({user})=> ({user:user.user}));
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const registerGroup = async () => {
    /* key 확인하기 */
    for (let key of groupDetail.keys()) {
      console.log(key, ": ", groupDetail.get(key));
      if( key == "groupUserList"){
        console.log(groupDetail.get(key).length)
      }

    }
    await axios.post(apiConfig.createGroup,groupDetail)
      .then((response) => {
        window.alert(response.data)
        window.location.replace("/#/group/list")
      }).catch((error) => {
        setAlertColor("danger")
        setAlertMessage(error.response.data)
        setAlertVisible(true)
      })
  }

  const [type, setType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);


  const searchUser = async () => {
    await axios.get(apiConfig.allUserList,{params: {
      type: type,
      keyword: keyword
    }},{headers: {"Content-Type" : "multipart/form-data"}})
      .then((response) => {
        setSearchUserList(response.data)
      })
  }

  const [groupUserList, setGroupUserList] = useState([]);

  const addGroupUser = (userId) => {
    console.log("groupUserList: ",groupUserList)
    setGroupUserList([...groupUserList, userId]);
  }

  const groupDetail = new FormData();
  groupDetail.append("groupName", groupName)
  groupDetail.append("groupCode", groupCode)
  groupDetail.append("groupDescription", groupDescription)
  groupDetail.append("groupUserList", groupUserList)
  groupDetail.append("regId",user.info.userId)
  groupDetail.append("groupCnt", 0)

  const [alertVisible, setAlertVisible] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [alertMessage, setAlertMessage] = useState("")



  return (
    <>
      <CAlert
        visible={alertVisible}
        color={alertColor}
        dismissible
        onClose={() => setAlertVisible(false)}
      >{alertMessage}</CAlert>

      <CCard className="m-4">
        <CCardHeader>
          <strong>그룹생성 </strong>
          <small> 그룹을 생성 할 수 있습니다.</small>
        </CCardHeader>
        <CCardBody>

          <CRow className="mb-3">
            <CFormLabel className="col-sm-3">그룹명</CFormLabel>
            <div className="col-sm-9">
              <CFormInput
                type="text"
                placeholder="그룹명"
                onChange={(e)=>{setGroupName(e.target.value)}}
              />
            </div>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel className="col-sm-3">그룹코드</CFormLabel>
            <div className="col-sm-9">
              <CFormInput
                type="password"
                placeholder="그룹코드"
                onChange={(e)=>{setGroupCode(e.target.value)}}
              />
            </div>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel className="col-sm-3">그룹 이미지</CFormLabel>
            <div className="col-sm-9">
              <CFormInput
                type="file"
                onChange={(e)=>{groupDetail.append("groupImage", e.target.files[0])}}
              />
            </div>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel className="col-sm-3">그룹 설명</CFormLabel>
            <div className="col-sm-9">
              <CFormTextarea
                rows="3"
                onChange={(e)=>{setGroupDescription(e.target.value)}}
              ></CFormTextarea>
            </div>
          </CRow>

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
                            onClick={(e)=>addGroupUser(user.userId)}
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
                        (userId) => (
                        <CListGroupItem key={userId} className="d-flex">
                          <span>{userId}</span>
                          <div className="ms-auto">
                            <CButton
                              color="danger"
                              size="sm"
                              variant="outline"
                              onClick= {(e) => setGroupUserList(groupUserList.filter((groupUserList) => groupUserList.userId !== user.userId))}
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
          <CCol lg={12} className="text-end">
            <CButton color="primary" variant="outline" onClick={registerGroup}>
              Save
            </CButton>
          </CCol>
        </CCardFooter>
      </CCard>
    </>

  )
}

export default FormControl
