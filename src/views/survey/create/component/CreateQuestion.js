import React, { useState, useRef, useEffect } from 'react';
import Question from './Question';
import { useSelector, useDispatch } from 'react-redux';
import * as questionActions from "../../../../modules/questions";
import {CButton, CCard, CCardBody,} from '@coreui/react'

// 질문 리스트
const CreateQuestion = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector(({ questions }) => ({
    questions : questions
  }));
  const nextId = useRef(3); 


  useEffect(() => {
    dispatch(questionActions.initializeForm());
  }, []);


  // 질문 추가
  const onInsert = (e) =>{
    dispatch(questionActions.addQuestion(nextId.current));
    nextId.current += 1;
  };

  // 질문 삭제
  function deleteQuestion({id}) {
    dispatch(questionActions.deleteQuestion({id}));
  }

  // 질문 내용 수정
  function changeContent({id, value, name}) {
    dispatch(questionActions.editQuestionContent({id, value, name}));
  }

  // 질문 유형 수정
  function editQuestionType({id, value, name}) {
    dispatch(questionActions.editQuestionType({id, value, name}));
  }

  // 답변 추가
  function addAnswer({id, value}) {
    dispatch(questionActions.addAnswer({id, value}));
  }

    // 답변 삭제
    function deleteAnswer({id, aid}) {
      console.log({id, aid});
      dispatch(questionActions.deleteAnswer({id, aid}));
    }


  // console.log(questions);

    
  const questionList = questions.map(question => 
    (
      
      <Question 
        question={question} 
        key={question.get("id")}
        changeContent = {changeContent}
        deleteQuestion = {deleteQuestion}
        editQuestionType = {editQuestionType}
        addAnswer = {addAnswer}
        deleteAnswer = {deleteAnswer}
        >
      </Question>
    )
  );

  return (
    <>
    <CCard className="mb-3">
      <CCardBody>
        {questionList}
        <div className="col-md-6">
          <div className="d-grid gap-2 col-md-6 mx-auto">
            <CButton color="primary" variant="outline" onClick={onInsert}>
              Add
            </CButton>
          </div>
        </div>
      </CCardBody>
      <br/>
      <br/>

    </CCard>
    </>
  )
}

export default CreateQuestion

