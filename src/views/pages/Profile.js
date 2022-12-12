import React, {useState} from 'react'
import {
  CButton,
  CCard, CCardHeader, CCardBody, CCardFooter,
  CForm, CFormInput, CFormLabel, CFormSelect,
  CInputGroup,
  CInputGroupText, CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {useSelector} from "react-redux";
import usePromise from "../../lib/usePromise";
import axios from "axios";
import apiConfig from "../../lib/apiConfig";

const Profile = () => {
  const { user } = useSelector(({user})=> ({user:user.user}));
  let jobList = []

  const [loading, response, error] = usePromise(() => {
    return axios.get(apiConfig.jobList)
  }, []);

  if(response != null){
    jobList = response.data;
  }

  const formData = new FormData();

  return (
    <CCard className="m-4">
      <CCardHeader><strong>회원 정보</strong><small> 회원 정보를 확인할 수 있습니다. 수정이나 탈퇴가 필요하면 아래의 버튼을 클릭하시오.</small></CCardHeader>
      <CCardBody className="p-4">
        <CForm>

          <CFormLabel>아이디</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              readOnly={true}
              autoComplete="username"
              type="text"
              placeholder="아이디를 입력하세요"
              value={user.info.userId}/>
          </CInputGroup>

          <CFormLabel>이름</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              type="text"
              placeholder="이름을 입력하세요"
              value={user.info.name}/>
          </CInputGroup>

          <div className="d-flex justify-content-between">
            <CFormLabel>이메일 주소</CFormLabel>
            <strong><CFormCheck readOnly checked label="수신동의"/></strong>
          </div>
          <CInputGroup className="mb-3">
            <CInputGroupText>@</CInputGroupText>
            <CFormInput
              type="email"
              placeholder="이메일을 입력하세요"
              value={user.info.mailAddr}/>
          </CInputGroup>

          <CFormLabel>비밀번호</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              autoComplete="current-password"
              type="password"
              placeholder="비밀번호를 입력하세요"/>
          </CInputGroup>

          <CFormLabel>비밀번호 확인</CFormLabel>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput type="password" placeholder="비밀번호 확인을 입력하세요"/>
          </CInputGroup>

          <CFormLabel>프로필 이미지</CFormLabel>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="file"
              onChange={(e) => {formData.append('userImage', e.target.files[0])}}
            />
          </CInputGroup>

          <div className="d-flex justify-content-between">
            <CFormLabel>휴대폰 번호</CFormLabel>
            <strong><CFormCheck readOnly checked label="수신동의"/></strong>
          </div>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              type="tel"
              placeholder="휴대폰 번호를 입력하세요"
              value={user.info.phone}/>
          </CInputGroup>

          <CFormLabel>나이</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput
              type="number"
              placeholder="나이를 입력하세요"
              value={user.info.age}/>
          </CInputGroup>

          <CFormLabel>성별</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormSelect>
              <option>성별을 선택하세요</option>
              <option selected={user.info.gender == "W"?true:false}>여자</option>
              <option selected={user.info.gender == "M"?true:false}>남자</option>
            </CFormSelect>
          </CInputGroup>

          <CFormLabel>직업</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormSelect>
              <option>직업을 선택하세요</option>
              {jobList.map((jobItem) => (
                <option
                  key={jobItem.userJobId}
                  selected={user.info.job == jobItem.content?true:false}>
                  {jobItem.content}
                </option>
              ))}
            </CFormSelect>
          </CInputGroup>

        </CForm>
        <div className="d-flex justify-content-start">
          <CButton className="mt-3" variant="outline" color="success">Modify</CButton>
          &nbsp;
          <CButton className="mt-3" variant="outline" color="danger">Delete</CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default Profile
