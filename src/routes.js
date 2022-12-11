import React from 'react'


const Home = React.lazy(() => import('./views/Home'))
const Profile = React.lazy(() => import("./views/pages/Profile"))
const Register = React.lazy(() => import("./views/pages/Register"))

const Search = React.lazy(() => import('./views/survey/search/Search'))
const PrtcpList = React.lazy(() => import('./views/survey/list/PrtcpList'))
const MakeList = React.lazy(() => import('./views/survey/list/MakeList'))


const SurveyCreate = React.lazy(() => import('./views/survey/create/CreateSurvey'))
const SurveyAnswerReg = React.lazy(() => import('./views/survey/detail/RegisterAnswer'))
const SurveyAnswerEdit = React.lazy(() => import('./views/survey/detail/EditAnswer'))

const surveyDetail = React.lazy(() => import('./views/survey/detail/Detail'))

const grouplist = React.lazy(() => import('./views/group/list/list'))
const groupCreate = React.lazy(() => import('./views/group/form/create'))
const groupDetail = React.lazy(() => import('./views/group/detail/detail'))

const ad_survey_analysis = React.lazy(() => import('./views/analysis/ad_survey_analysis'))
const surveyVulgarismList= React.lazy(() => import('./views/analysis/survey_vulgarism'));

const categoryList = React.lazy(() => import('./views/admin/CategoryList'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Home },

  // 계정
  { path: '/auth/register', name: 'Register', element: Register },                                       // 사용자 회원 가입
  { path: '/auth/profile', name: 'Profile', element: Profile },                                       // 사용자 정보 조회

  // 설문
  { path: '/survey/search', name: 'Search', element: Search },                                        // 설문 검색 목록
  { path: '/survey/create', name: 'Survey', element: SurveyCreate },                                  // 설문 생성
  { path: '/survey/detail/:sur_id', name: 'Survey Detail', element: surveyDetail },                   // 설문 상세
  { path: '/survey/prtcpList', name: 'PrtcpList', element: PrtcpList },                               // 설문 참여 목록
  { path: '/survey/makeList', name: 'MakeList', element: MakeList },                                  // 설문 생성 목록
  { path: '/survey/answer/register/:sur_id', name: 'Survey Participate', element: SurveyAnswerReg },          // 설문 답변 등록
  { path: '/survey/answer/edit/:sur_id', name: 'Survey Modify', element: SurveyAnswerEdit },   // 설문 답변 수정

  // 그룹
  { path: '/group/list', name: 'Group List', element: grouplist },                                    // 그룹 목록
  { path: '/group/create', name: 'Group Create', element: groupCreate },                              // 그룹 생성
  { path: '/group/detail/:group_id', name: 'Group Detail', element: groupDetail },                              // 그룹 상세

  // 분석(ADMIN)
  { path: '/analysis/ad_survey_analysis', name: 'Ad Survey analysis', element: ad_survey_analysis },
  { path: '/analysis/survey_vulgarism_list', name: 'Survey Vulgarism List', element: surveyVulgarismList },

  //카테고리 리스트 설정
  { path: '/admin/CategoryList', name: 'Category List', element: categoryList },

  // //{ path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },

]

export default routes
