import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const {user } = useSelector(({user})=> ({user:user.user}));

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <span className="mx-auto d-md-none" to="/">
          <a className='main_logo_mobile' href='/#'> ☁️ SURVEY PLATFORM ☁️ </a>
        </span>
        { <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav> }
       <CHeaderNav>
       { user != null ? user.info.userId : null}
        </CHeaderNav> 
        <CHeaderNav className="ms-3">
        {user != null ? (
           <AppHeaderDropdown />
        ):(
          <CNavItem>
            <CNavLink href="/#/login">SIGNIN</CNavLink>
          </CNavItem> 
        )}
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
