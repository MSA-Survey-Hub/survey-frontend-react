import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartPolarArea,CChartBar, CChartPie, CChartLine, CChartDoughnut } from '@coreui/react-chartjs'
import UsePromise from '../../lib/usePromise'
import axios from 'axios';
import apiConfig from '../../lib/apiConfig'

const Charts = (props) => {
  const [one, setOne] = useState([]);
  const [two, setTwo] = useState([]);
  const [three, setThree] = useState([]);
  const [four, setFour] = useState([]);
  let Data = {
    subject: '',
    labels: [],
    values:[]
  }



  const analysisInfo = async ()=>{

    for (let analysisId = 1; analysisId < 5; analysisId++) {
        const response = await axios.post(`${apiConfig.surveyAnalysisData}?analysis_Id=${analysisId}&sur_id=${props.surId}`)

        console.log("hihihi", response.data)
        Data['subject'] = response.data.subject[0].subject

        let Data_labels = []
        let Data_values = []

        response.data.option.map(option =>{
          Data_labels.push(option.optionName)
          Data_values.push(option.value)
        })
        Data['labels'] = Data_labels
        Data['values'] = Data_values

        if (analysisId ===1){
          setOne({'subject':response.data.subject[0].subject, 'label':Data_labels, 'value':Data_values});
        } else if (analysisId ===2){
          setTwo({'subject':response.data.subject[0].subject, 'label':Data_labels, 'value':Data_values});
        } else if (analysisId ===3){
          setThree({'subject':response.data.subject[0].subject, 'label':Data_labels, 'value':Data_values});
        } else if (analysisId ===4){
          setFour({'subject':response.data.subject[0].subject, 'label':Data_labels, 'value':Data_values});
        }

    }
  }

  useEffect(()=>{
    analysisInfo();
  },[]);

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>{one.subject}</CCardHeader>
          <CCardBody>
            <CChartBar
              data={
                {
                labels: one.label
                ,
                datasets: [
                  {
                    label: one.subject,
                    backgroundColor: '#cfd0fe',
                    data: one.value,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>{two.subject}</CCardHeader>
          <CCardBody>
          
            <CChartLine
              data={{
                labels: two.label,
                datasets: [
                  {
                    label: two.subject,
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: two.value,
                  }
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>{three.subject}</CCardHeader>
          <CCardBody>

          <CChartLine
              data={{
                labels: three.label,
                datasets: [
                  {
                    label: three.subject,
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: three.value,
                  }
                ],
              }}
            />

            
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>{four.subject}</CCardHeader>
          <CCardBody>
          <CChartBar
              data={
                {
                labels: four.label
                ,
                datasets: [
                  {
                    label: four.subject,
                    backgroundColor: '#cfd0fe',
                    data: four.value,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
