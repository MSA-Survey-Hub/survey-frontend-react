import React, {useState} from 'react'
import {
  CButton,
  CCard, CCardHeader, CCardBody, CCardFooter,
  CForm, CFormInput, CFormLabel, CFormSelect, CFormCheck,
  CInputGroup,
  CInputGroupText, CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilAt,
  cilCheck,
  cilFactory,
  cilHappy,
  cilHeart,
  cilImage,
  cilLockLocked,
  cilPhone,
  cilUser
} from '@coreui/icons'
import axios from "axios";
import apiConfig from "../../lib/apiConfig";
import {useSelector} from "react-redux";

const Profile = () => {
  const { user } = useSelector(({user})=> ({user:user.user}));
  const userId = user.info.userId
  const [jobList, setJobList] = useState([]);

  useState(async () => {
    await axios.get(apiConfig.jobList)
      .then((response) => {
        setJobList(response.data)
      })
  })

  useState( async () => {
    await axios.get(
      apiConfig.userDetail,
      {params:{user_id: userId}},
      {headers: {"Content-Type": "multipart/form-data"}}
    ).then((response) => {
      setName(response.data.name)
      setJob(response.data.job)
      setAge(response.data.age)
      setGender(response.data.gender)
      setPhone(response.data.phone)
      setMailAddr(response.data.mailAddr)
    })
  })

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [mailAddr, setMailAddr] = useState("");
  // const [acceptPhone, setAcceptPhone] = useState(true);
  // const [acceptMailAddr, setAcceptM ailAddr] = useState(true);
  const [userPwd, setUserPwd] = useState("");

  const userInfo = new FormData();
  userInfo.append("userId", userId);
  userInfo.append("name", name);
  userInfo.append("job", job);
  userInfo.append("age", age);
  userInfo.append("gender", gender);
  userInfo.append("phone", phone);
  userInfo.append("mailAddr", mailAddr);
  userInfo.append("userRole", "USER");
  userInfo.append("userPwd", userPwd);
  userInfo.append("status", 0);
  userInfo.append("statusInfo", "statusInfo");


  const modifyUser = () => {
    axios.post(
      apiConfig.modifyUser,
      userInfo
    ).then((response) => {
      console.log(response)
      setAlertColor("success")
      setAlertMessage(response.data)
      setAlertVisible(true)
      window.location.reload()

    }).catch((error) => {
      setAlertColor("danger")
      setAlertMessage(error.response.data)
      setAlertVisible(true)
    })
  }

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

      <CCard className="mx-4">
        <CCardHeader><strong>회원 정보</strong><small> 회원 정보를 확인할 수 있습니다. 수정이나 탈퇴가 필요하면 아래의 버튼을 클릭하시오.</small></CCardHeader>
        <CCardBody className="p-4">
          <CForm>

            <CFormLabel>아이디</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilCheck} />
              </CInputGroupText>
              <CFormInput
                autoComplete="username"
                type="text"
                placeholder="아이디를 입력하세요"
                value={userId}
              />
            </CInputGroup>


            <CFormLabel>이름</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
              />
            </CInputGroup>

            <div className="d-flex justify-content-between">
              <CFormLabel>이메일 주소</CFormLabel>
              <strong><CFormCheck readOnly checked label="수신동의"/></strong>
            </div>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilAt} />
              </CInputGroupText>
              <CFormInput
                type="email"
                placeholder="이메일을 입력하세요"
                value={mailAddr}
                onChange={(e) => {setMailAddr(e.target.value)}}
              />
            </CInputGroup>

            <CFormLabel>비밀번호</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                autoComplete="current-password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={userPwd}
                onChange={(e) => {setUserPwd(e.target.value)}}
              />
            </CInputGroup>

            <CFormLabel>비밀번호 확인</CFormLabel>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="비밀번호 확인을 입력하세요"/>
            </CInputGroup>

            <CFormLabel>프로필 이미지</CFormLabel>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilImage} />
              </CInputGroupText>
              <CFormInput
                type="file"
                onChange={(e) => {userInfo.append('userImage', e.target.files[0])}}
              />
            </CInputGroup>

            <div className="d-flex justify-content-between">
              <CFormLabel>휴대폰 번호</CFormLabel>
              <strong><CFormCheck readOnly checked label="수신동의"/></strong>
            </div>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilPhone} />
              </CInputGroupText>
              <CFormInput
                type="tel"
                placeholder="휴대폰 번호를 입력하세요"
                value={phone}
                onChange={(e) => {setPhone(e.target.value)}}
              />
            </CInputGroup>



            <CFormLabel>나이</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilHappy} />
              </CInputGroupText>
              <CFormInput
                type="number"
                placeholder="나이를 입력하세요"
                value={age}
                onChange={(e) => {setAge(e.target.value)}}
              />
            </CInputGroup>

            <CFormLabel>성별</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilHeart} />
              </CInputGroupText>
              <CFormSelect onChange={(e) => {setGender(e.target.value)}}>
                <option>성별을 선택하세요</option>
                <option value="W" selected={gender == "W"?true:false}>여자</option>
                <option value="M" selected={gender == "M"?true:false}>남자</option>
              </CFormSelect>
            </CInputGroup>

            <CFormLabel>직업</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilFactory} />
              </CInputGroupText>
              <CFormSelect onChange={(e) => {setJob(e.target.value)}}>
                <option>직업을 선택하세요</option>
                {jobList.map((jobItem) => (
                  <option
                    key={jobItem.userJobId}
                    value={jobItem.content}
                    selected={job == jobItem.content?true:false}
                    >
                    {jobItem.content}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>

          </CForm>
          <div className="d-flex justify-content-start">
            <CButton className="mt-3" variant="outline" color="success" onClick={modifyUser}>Modify</CButton>
            &nbsp;
            <CButton className="mt-3" variant="outline" color="danger">Delete</CButton>
          </div>
        </CCardBody>
      </CCard>


    </>



  )
}

export default Profile
