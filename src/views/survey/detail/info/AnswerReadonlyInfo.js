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

const AnswerReadonlyInfo = ({answerList}) => {
  console.log(answerList);

  return (
    <div className="mt-3">
        <CAccordion alwaysOpen activeItemKey={1}>
          {answerList.map((answer, index) => (
              <CAccordionItem itemKey={index+1} key={answer.queId}>
                <CAccordionHeader>{index+1}. {answer.queContent} </CAccordionHeader>
                <CAccordionBody>
                  {answer.queType === "YN" && (
                    <>
                      {answer.optionList.map((option) => (
                        <CFormCheck disabled
                          type="radio"
                          name={answer.ansId}
                          key={option.queOptId}
                          label={option.optionName}
                          value={option.optionName}
                          defaultChecked={answer.ansContent === option.optionName?true:false}
                        />
                      ))}
                    </>
                  )}

                  {answer.queType === "NumOnly" && (
                    <>
                      {answer.optionList.map((option) => (
                        <CFormCheck disabled
                          type="radio"
                          name={answer.ansId}
                          key={option.queOptId}
                          label={option.optionName}
                          value={option.optionName}
                          defaultChecked={answer.ansContent === option.optionName?true:false}
                        />
                      ))}
                    </>
                  )}

                  {answer.queType === "NumMul" && (
                    <>
                      {answer.optionList.map((option) => (
                        <CFormCheck disabled
                          type="checkbox"
                          name={answer.ansId}
                          key={option.queOptId}
                          label={option.optionName}
                          value={option.optionName}
                          defaultChecked={answer.ansContent === option.optionName?true:false}
                        />
                      ))}
                    </>
                  )}

                  {answer.queType === "Sub" && (
                    <CFormTextarea readOnly
                      name={answer.ansId}
                      defaultValue={answer.ansContent}
                    ></CFormTextarea>
                  )}

                  {answer.queType == "Grd" && (
                    <CFormRange disabled
                      name={answer.ansId}
                      min="0" max="100" step="10"
                      defaultValue={answer.ansContent}
                    />
                  )}
                </CAccordionBody>
              </CAccordionItem>
          ))}
        </CAccordion>
    
    </div>
  )
}

export default AnswerReadonlyInfo
