import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, login } from '../../../modules/auth';
import { check } from '../../../modules/user';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Loading from 'src/lib/Loading/Loading';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const [loading, setLoading] = useState(false); // 대기


  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
    };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);


  const loginToast = (text) => (
    <CToast>
      <CToastHeader closeButton>
        <strong className="me-auto">SURVEY PLATFORM</strong>
        {/* <small>7 min ago</small> */}
      </CToastHeader>
      <CToastBody>{ text }</CToastBody>
    </CToast>
  );


  useEffect(() => {
    if (authError) {
      setLoading(false);
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      addToast(loginToast("LOGIN FAIL"));

      return;
    }
    if (auth) {
      setLoading(false);
      addToast(loginToast("LOGIN SUCCESS"));
      console.log('로그인 성공');
      dispatch(check(auth.data));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [navigate, user]);



  const [toast, addToast] = useState(0)

  const toaster = useRef()

  return (
    <>
  { loading ? <Loading /> :
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        onChange={onChange}
                        autoComplete="username"
                        name="username"
                        value={form.username} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        onChange={onChange}
                        autoComplete="current-password"
                        name="password"
                        value={form.password}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="warning" className="px-4">
                          Login
                        </CButton>
                        <CToaster ref={toaster} push={toast} placement="top-end" />
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-warning py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>SUEVEY PLATFORM</p>
                    <p>
                      welcome to team cloud survey based data hub platform.
                    </p>

                    <CButton color="warning" className="mt-3" active tabIndex={-1} href="/#/auth/register">
                      Register Now!
                    </CButton>

                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    }
  </>
  )
}

export default Login
