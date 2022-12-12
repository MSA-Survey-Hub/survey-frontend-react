import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CImage,
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardTitle,
  CCardText,
  CCardBody,
  CCardImage,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react';
import usePromise from "../lib/usePromise";
import axios from "axios";
import apiConfig from "../lib/apiConfig";
const image = require("../assets/images/test_img.jpeg");
const image2 = require("../assets/images/test2.png");
const image3 = require("../assets/images/test3.png");
const testImage = require("../assets/images/test4.png");

const Home = () => {
  const {user } = useSelector(({user})=> ({user:user.user}));

  const [visible, setVisible] = useState(false)

  let bestList = []
  const [loading, response, error] = usePromise(() => {
    return axios.get(apiConfig.bestSurvey)
  }, []);
  if (response != null) {
    bestList = response.data
    bestList = bestList.filter(x => !!x);
  }
  return (
    <>
     <CRow className="mb-3">
        <CCarousel controls indicators>
          {
          bestList.map(bestSurvey => (
              <CCarouselItem key={bestSurvey.surId}>
                <CButton href={"/#/survey/detail/"+bestSurvey.surId} color="light">
                  <div className='slider_img_wrap'>
                    <CImage className="slider_img" src={testImage}/>
                  </div>
                  <CCarouselCaption className="d-none d-md-block">
                    <h5>{bestSurvey.surveyCategory.content}</h5>
                    <h2>{bestSurvey.title}</h2>
                    <p>{bestSurvey.description}</p>
                  </CCarouselCaption>
                </CButton>
              </CCarouselItem>
              
           )
          )
          }
        </CCarousel>
      </CRow>
    
      <CRow className="mb-3">
         {user ? 
        
         (
          <>
        {/*<CCol>
            <CCard>
            <CCardImage orientation="top" height={200} src={image}></CCardImage>
            <CCardBody>
              <CCardTitle>설문 생성하기</CCardTitle>
              <CCardText>새로운 설문을 생성해보세요.</CCardText>
              <CButton href="#" onClick={() => setVisible(!visible)}>Create New Survey</CButton>
              <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                  <CModalTitle>설문 생성하기</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CForm method="post" action="/#/survey">
                    <div className="mb-3">
                      <CFormLabel>설문 이름</CFormLabel>
                      <CFormInput type="text" placeholder="설문 이름을 입력하세요"/>
                    </div>
                    <div className="mb-3">
                      <CFormLabel>설문 분류 선택</CFormLabel>
                      <CFormSelect>
                        <option value="1">학교</option>
                        <option value="2">기업</option>
                        <option value="3">연애</option>
                        <option value="4">사업</option>
                        <option value="5">취미</option>
                      </CFormSelect>
                    </div>
                    <div className="mb-3">
                      <CFormLabel>설문 공개 선택</CFormLabel>
                      <CFormSelect>
                        <option value="1">전체 공개</option>
                        <option value="2">그룹 공개</option>
                        <option value="3">비공개</option>
                      </CFormSelect>
                    </div>
                  </CForm>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" type="submit">Create</CButton>
                </CModalFooter>
              </CModal>
            </CCardBody>
          </CCard>
        </CCol> */}
        <CCol>
            <CCard>
              <CCardImage orientation="top" height={200} src={image3}></CCardImage>
              <CCardBody>
                <CCardTitle>설문 리스트</CCardTitle>
                <CCardText>배포된 설문조사를 조회 할 수 있습니다!</CCardText>
                <CButton href="/#/survey/search">Go Survey List</CButton>
              </CCardBody>
            </CCard>
          </CCol>
        <CCol>
          <CCard>
            <CCardImage orientation="top" height={200} src={image2}></CCardImage>
            <CCardBody>
              <CCardTitle>설문 생성함</CCardTitle>
              <CCardText>생성한 설문 목록을 볼 수 있습니다.</CCardText>
              <CButton href="/#/survey/makeList">Go Created List</CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardImage orientation="top" height={200} src={image3}></CCardImage>
            <CCardBody>
              <CCardTitle>설문 참여함</CCardTitle>
              <CCardText>참여한 설문 목록을 볼 수 있습니다.</CCardText>
              <CButton href="/#/survey/prtcpList">Go Participated List</CButton>
            </CCardBody>
          </CCard>
        </CCol>
        </>
            ) :
            
            (<>
              <CCol>
              <CCard>
                <CCardImage orientation="top" height={200} src={image}></CCardImage>
                <CCardBody>
                  <CCardTitle>회원가입</CCardTitle>
                  <CCardText>회원가입을 통해 설문조사 서비스를 이용해보세요!</CCardText>
                  <CButton href="/#/auth/register/">Sign Up</CButton>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardImage orientation="top" height={200} src={image2}></CCardImage>
                <CCardBody>
                  <CCardTitle>로그인</CCardTitle>
                  <CCardText>로그인 페이지로 이동합니다!</CCardText>
                  <CButton href="/#/login">Sign In</CButton>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardImage orientation="top" height={200} src={image3}></CCardImage>
                <CCardBody>
                  <CCardTitle>설문 리스트</CCardTitle>
                  <CCardText>배포된 설문조사를 조회 할 수 있습니다!</CCardText>
                  <CButton href="/#/survey/search">Go List</CButton>
                </CCardBody>
              </CCard>
            </CCol>
            </>
            )}
      </CRow>
  

    </>
  )
}

export default Home
