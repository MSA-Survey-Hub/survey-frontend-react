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
import { Alert } from '@coreui/coreui';


const UpdateAnswerInfo = (props) => {
  const [answerList, setAnswerList] = useState([])
  const [updateList, setUpdateList] = useState([])
  const { user } = useSelector(({user})=> ({user:user.user}));
  if(user==null){
    window.location.href="/#";
  }
  const accessToken = user.token.access_token;
  const userId = user.info.userId;

  // 답변 정보 받아오기
  useState( async () => {
    axios.post(apiConfig.answerList,
      {regId: userId, surId: props.surId},
      {headers: {
          'Content-Type': 'multipart/form-data'
        }}
    ).then((response) => {
      setAnswerList(response.data)
    })
  })

  const makeAnswer = (e, answer) => {
    const updateData = {
      "ansId": answer.ansId,
      "queId": answer.queId,
      "type": answer.ansType,
      "content": e.target.value,
      "regId": answer.regId
    }
    console.log(updateData)
    setUpdateList(updateList.filter(update => update.queId !== answer.queId));
    setUpdateList(updateList=>[...updateList, updateData])
  }

  const sendAnswer = () => {
    axios.post(apiConfig.answerEdit,
      {
        surId: props.surId,
        answerDTOList: updateList
      })
      .then((response) => {
        window.location.reload(`/#/survey/detail/${props.surId}`);
      })
  }

  let token = false;

  // let Test = (answer)=>{
  //   if (token===false){
  //     <CFormTextarea
  //           name={answer.ansId}
  //           defaultValue={answer.ansContent}
  //           onChange={(event)=>{makeAnswer(event, answer.queId)}}
  //     ></CFormTextarea>,
  //     token = true
  //   } else{
  //     <CFormTextarea
  //           name={answer.ansId}
  //           onChange={(event)=>{makeAnswer(event, answer.queId)}}
  //     ></CFormTextarea>
  //   }
  // }


  return (
    <div className="mt-3">
        <CAccordion alwaysOpen>
          {answerList.map((answer, index) => (
              <CAccordionItem itemKey={index+1} key={answer.queId}>
                <CAccordionHeader>{index+1}. {answer.queContent} </CAccordionHeader>
                <CAccordionBody>
                  {answer.queType === "YN" && (
                    <>
                      {answer.optionList.map((option) => (
                        <CFormCheck
                          type="radio"
                          name={answer.ansId}
                          key={option.queOptId}
                          label={option.optionName}
                          value={option.optionName}
                          defaultChecked={answer.ansContent === option.optionName?true:false}
                          onChange={(event)=>{makeAnswer(event, answer)}}
                        />
                      ))}
                    </>
                  )}

                  {answer.queType === "NumOnly" && (
                    <>
                      {answer.optionList.map((option) => (
                        <CFormCheck
                          type="radio"
                          name={answer.ansId}
                          key={option.queOptId}
                          label={option.optionName}
                          value={option.optionName}
                          defaultChecked={answer.ansContent === option.optionName?true:false}
                          onChange={(event)=>{makeAnswer(event, answer)}}
                        />
                      ))}
                    </>
                  )}

                  {answer.queType === "NumMul" && (
                    <>
                      {answer.optionList.map((option) => (
                        <CFormCheck
                          type="checkbox"
                          name={answer.ansId}
                          key={option.queOptId}
                          label={option.optionName}
                          value={option.optionName}
                          defaultChecked={answer.ansContent === option.optionName?true:false}
                          onChange={(event)=>{makeAnswer(event, answer)}}
                        />
                      ))}
                    </>
                  )}

                  {answer.queType === "Sub" && (
                    <CFormTextarea
                      name={answer.ansId}
                      defaultValue={answer.ansContent}
                      onChange={(event)=>{makeAnswer(event, answer)}}
                    ></CFormTextarea>
                  )}

                  {answer.queType == "Grd" && (
                    <CFormRange
                      name={answer.ansId}
                      min="0" max="100" step="10"
                      defaultValue={answer.ansContent}
                      onChange={(event)=>{makeAnswer(event, answer)}}
                    />
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

export default UpdateAnswerInfo
