import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  CCol,
  CButton,
  CFormInput,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormCheck,
  CFormTextarea, CFormRange,
} from '@coreui/react'
import axios from "axios";
import apiConfig from "../../../../lib/apiConfig";
import usePromise from "../../../../lib/usePromise";


const DetailInfo = ({surId, questionList}) => {
  const { user } = useSelector(({user})=> ({user:user.user}));
  console.log(user);
  if(user==null){
    window.location.href="/#";
  }
  const userId = user.info.userId;

  const [answerList, setAnswerList] = useState([])


  const makeAnswer = (e, queId) => {
    const answerData = {
      "queId": queId,
      "type": 0,
      "content": e.target.value,
      "regId": userId
    }
    setAnswerList(answerList.filter(answer => answer.queId !== queId));
    setAnswerList(answerList=>[...answerList, answerData])
  }

  const accessToken = user.token.access_token;
  const sendAnswer = () => {
    axios.post(apiConfig.answerRegister,
      {
        surId: surId,
        answerDTOList: answerList
      })
      .then((response) => {
        window.location.reload(`/#/survey/detail/${surId}`,{headers: {'Authorization': 'Bearer ' + accessToken }});
      })
  }


  return (
    <div className="mt-3">
        <CAccordion alwaysOpen>
          {questionList.map((question, index) => (
            <CAccordionItem itemKey={index+1} key={question.queId}>
              <CAccordionHeader>{index+1}. {question.content} </CAccordionHeader>
              <CAccordionBody>
                {question.questionType === "YN" && (
                  <>
                    {question.optionList.map((option) => (
                      <CFormCheck type="radio"
                                  name={question.queId}
                                  key={option.queOptId}
                                  label={option.optionName}
                                  value={option.optionName}
                                  onChange={(e) => makeAnswer(e,question.queId)}/>
                    ))}
                  </>
                )}

                {question.questionType === "NumOnly" && (
                  <>
                    {question.optionList.map((option) => (
                      <CFormCheck type="radio"
                                  name={question.queId}
                                  key={option.queOptId}
                                  label={option.optionName}
                                  value={option.optionName}
                                  onChange={(e) => makeAnswer(e,question.queId)} />
                    ))}
                  </>
                )}

                {question.questionType === "NumMul" && (
                  <>
                    {question.optionList.map((option) => (
                      <CFormCheck type="checkbox"
                                  name={question.queId}
                                  key={option.queOptId}
                                  label={option.optionName}
                                  value={option.optionName}
                                  onChange={(e) => makeAnswer(e,question.queId)}/>
                    ))}
                  </>
                )}

                {question.questionType === "Sub" && (
                  <CFormTextarea name="content" onBlur={(e) => makeAnswer(e,question.queId)}></CFormTextarea>
                )}

                {question.questionType == "Grd" && (
                  <CFormRange name="content" min="0" max="100" step="10" onChange={(e) => makeAnswer(e,question.queId)}/>
                )}
              </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
      <CCol lg={12} className="text-start d-flex mt-1">
        <CButton color="primary" href="#" className="ms-auto" variant="outline" onClick={sendAnswer}>
          send
        </CButton>
      </CCol>
    </div>
  )
}

export default DetailInfo
