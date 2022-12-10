import React from 'react'
import {
  CButton,
  CCard, CCardHeader, CCardBody, CCardFooter,
  CForm, CFormInput, CFormLabel, CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Profile = () => {
  return (
    <CCard className="mx-4">
      <CCardHeader><strong>회원 정보</strong><small> 회원 정보를 확인할 수 있습니다. 수정이나 탈퇴가 필요하면 아래의 버튼을 클릭하시오.</small></CCardHeader>
      <CCardBody className="p-4">
        <CForm>

          <CFormLabel>아이디</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput placeholder="아이디를 입력하세요"/>
          </CInputGroup>

          <CFormLabel>이름</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput placeholder="이름을 입력하세요"/>
          </CInputGroup>

          <CFormLabel>이메일</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>@</CInputGroupText>
            <CFormInput type="email" placeholder="이메일을 입력하세요"/>
          </CInputGroup>

          <CFormLabel>비밀번호</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput type="password" placeholder="비밀번호를 입력하세요"/>
          </CInputGroup>

          <CFormLabel>비밀번호 확인</CFormLabel>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput type="password" placeholder="비밀번호 확인을 입력하세요"/>
          </CInputGroup>

          <CFormLabel>휴대폰 번호</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput type="tel" placeholder="휴대폰 번호를 입력하세요" autoComplete="username" />
          </CInputGroup>

          <CFormLabel>성별</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormSelect aria-label="Default select example">
              <option>성별을 선택하세요</option>
              <option value="1">여자</option>
              <option value="2">남자</option>
            </CFormSelect>
          </CInputGroup>

          <CFormLabel>직업</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormSelect aria-label="Default select example">
              <option>직업을 선택하세요</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3" disabled>Three</option>
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
