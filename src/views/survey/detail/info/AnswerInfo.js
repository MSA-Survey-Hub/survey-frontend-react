import React, { useState } from 'react'
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
import {useSelector} from "react-redux";

const AnswerInfo = ({questionList}) => {

  return (
    <div className="mt-3">
        <CAccordion activeItemKey={1} flush>
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
                                  />
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
                                   />
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
                                  />
                    ))}
                  </>
                )}

                {question.questionType === "Sub" && (
                  <CFormTextarea name="content"></CFormTextarea>
                )}

                {question.questionType == "Grd" && (
                  <CFormRange name="content" min="0" max="100" step="10" />
                )}
              </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
  
    </div>
  )
 

}

export default AnswerInfo
