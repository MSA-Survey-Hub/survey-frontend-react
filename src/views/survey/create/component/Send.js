import { React, useState, useEffect } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormInput,
  CInputGroup,
  CFormSelect,
  CTable,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableHead,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter, CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMinus } from '@coreui/icons'
const Send = () => {
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])
  const handleSearchInput = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value)
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.get('/send?search' + search)
  //       setSearchUsers(result.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // })
  const [selected, setSelected] = useState('')
  const handleSelect = (e) => {
    setSelected(e.target.value)
  }
  const [sendItems, setSendItems] = useState([])
  const addSendItemHandler = (e, member) => {
    setSendItems([...sendItems, member])
  }
  const subSendItemHandler = (member) => {
    setSendItems(sendItems.filter((sendItem) => sendItem.member !== member))
  }
  const grouplist = [
    {
      gid: 'group1',
      name: 'yena group',
      members: [
        {
          member_id: 11,
          member_name: 'yena1',
          member_email: 'yena1@gachon.ac.kr',
          member_phone: '010-1234-5678',
        },
        {
          member_id: 12,
          member_name: 'yena2',
          member_email: 'yena2@gachon.ac.kr',
          member_phone: '010-1234-5678',
        },
        {
          member_id: 13,
          member_name: 'yena3',
          member_email: 'yena3@gachon.ac.kr',
          member_phone: '010-1234-5678',
        },
      ],
    },
    {
      gid: 'group2',
      name: 'yuri group',
      members: [
        {
          member_id: 21,
          member_name: 'yuri1',
          member_email: 'yuri1@gachon.ac.kr',
          member_phone: '010-1234-5678',
        },
        {
          member_id: 22,
          member_name: 'yuri2',
          member_email: 'yuri2@gachon.ac.kr',
          member_phone: '010-1234-5678',
        },
        {
          member_id: 23,
          member_name: 'yuri3',
          member_email: 'yuri3@gachon.ac.kr',
          member_phone: '010-1234-5678',
        },
      ],
    },
  ]
  const search_member = [
    {
      member_id: 31,
      member_name: 'solbi1',
      member_email: 'solbi1@gachon.ac.kr',
      member_phone: '010-1234-5678',
    },
    {
      member_id: 32,
      member_name: 'solbi2',
      member_email: 'solbi2@gachon.ac.kr',
      member_phone: '010-1234-5678',
    },
    {
      member_id: 33,
      member_name: 'solbi3',
      member_email: 'solbi3@gachon.ac.kr',
      member_phone: '010-1234-5678',
    },
  ]
  return (
    <>
      <CRow>
        <CCol xs={6}>
          <>
            <CCard className="mb-3">
              <CCardHeader>그룹 선택</CCardHeader>
              <CCardBody>
                <CFormSelect className="mb-3" onChange={handleSelect}>
                  <option>그룹을 선택하세요</option>
                  {grouplist.map((data) => (
                    <option value={data.gid} key={data.gid}>
                      {data.name}
                    </option>
                  ))}
                </CFormSelect>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {grouplist.map((group) =>
                      group.gid === selected
                        ? group.members.map((member) => (
                            <CTableRow key={member.member_id}>
                              <CTableHeaderCell scope="row">
                                <CIcon
                                  className="CButton"
                                  icon={cilPlus}
                                  size="sm"
                                  onClick={(e) => {
                                    addSendItemHandler(e, { member })
                                  }}
                                ></CIcon>
                              </CTableHeaderCell>
                              <CTableDataCell>{member.member_name}</CTableDataCell>
                              <CTableDataCell>{member.member_email}</CTableDataCell>
                            </CTableRow>
                          ))
                        : null,
                    )}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
            <CCard className="mb-3">
              <CCardHeader>회원 검색</CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormSelect>
                    <option value="1">Email</option>
                    <option value="2">Name</option>
                  </CFormSelect>
                  <CFormInput onInput={handleSearchInput} />
                  <CButton type="submit">Search</CButton>
                </CInputGroup>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {search_member.map((member) => (
                      <CTableRow key={member.member_id}>
                        <CTableHeaderCell scope="row">
                          <CIcon
                            className="CButton"
                            icon={cilPlus}
                            size="sm"
                            onClick={(e) => {
                              addSendItemHandler(e, { member })
                            }}
                          ></CIcon>
                        </CTableHeaderCell>
                        <CTableDataCell>{member.member_name}</CTableDataCell>
                        <CTableDataCell>{member.member_email}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </>
        </CCol>
        <CCol xs={6}>
          <CCard>
            <CCardHeader>선택 목록</CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {sendItems.map((sendItem) => (
                    <CTableRow key={sendItem.member.member_id}>
                      <CTableHeaderCell scope="row">
                        <CIcon
                          className="CButton"
                          icon={cilMinus}
                          size="sm"
                          onClick={(e) => {
                            subSendItemHandler(sendItem.member)
                          }}
                        ></CIcon>
                      </CTableHeaderCell>
                      <CTableDataCell>{sendItem.member.member_name}</CTableDataCell>
                      <CTableDataCell>{sendItem.member.member_email}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Send
