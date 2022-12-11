 const service = {
    auth : '/auth-service',
    survey : '/survey-service',
    common : '/common-service',
    analysis : '/analysis-service',
};

const version = '/v1';

const apiConfig = {

    bestSurvey: service.survey + version + '/survey/best',                              // 메인화면 설문 리스트 조회

    menuList : service.common + version + '/common/menu',                                   // 사이드바 메뉴 리스트 조회
    jobList : service.common + version + '/common/userJob',                                 // 사용자 직업 리스트 조회

    userDetail : service.auth + version + '/user/detail',                                   // 사용자 상세정보 조회
    groupList : service.auth + version + '/group/list',                                     // 사용자 그룹 리스트 조회
    groupDelete : service.auth + version + '/group/delete',                                 // 사용자 그룹 삭제
    groupDetail : service.auth + version + '/group/detail',                                 // 사용자 그룹 상세 조회
    groupPrtcp : service.auth + version + '/group/participate',                             // 사용자 그룹 참여
    regGroup : service.auth + version + '/group/participate',                               // 사용자 그룹 생성

    signin : service.auth + version + '/auth/signin',                                       // 로그인
    refreshToken : service.auth + version + "/auth/refresh_token",                          // 토큰 리프레시
    signup : service.auth + version + '/auth/signup',                                       // 회원가입
    authCheck : service.auth + version + '/auth/check',

    surveySearchList : service.survey + version + '/survey/search_list',                    // 설문 검색 리스트 조회
    surveyParticipateList : service.survey + version + '/survey/ptcp_list',                 // 설문 참여 리스트 조회
    surveyMakeList : service.survey + version + '/survey/make_list',                        // 설문 생성 리스트 조회


    surveyAnalysisData : service.analysis + version + '/analysis/survey_analysis',          // 설문 통계 데이터 조회(user)
    platformAnalysisData : service.analysis + version + '/analysis/platform_analysis',      // 설문 통계 데이터 조회(admin)
    surveyTypeSubOp : service.analysis + version + '/analysis/survey_analysis_info',        // 설문조사 결과탭 응답자 통계 타입, 옵션 정보 조회
    vulgarismData : service.survey + version + '/survey/vulgarismList',                     // 설문 비속어 유무 목록 조회

    createSurvey : service.survey + version + '/survey/reg',                                 // 설문 등록

    answerRegister: service.survey + version + '/answer/reg',                               // 설문 답변 등록
    answerEdit: service.survey + version + '/answer/mod',                                   // 설문 답변 수정
    answerDelete : service.survey + version + '/answer/del',                                // 설문 답변 삭제
    answerList: service.survey + version + '/answer/list',                                  // 설문 답변 조회
    surveyDetail: service.survey + version + '/survey/detail',                              // 설문 상세 조회

    surveyCategoryList: service.survey + version +  '/survey/category/list',                // 설문 카테고리 조회
    surveyCategoryRegister: service.survey + version +  '/survey/category/reg',             // 설문 카테고리 생성
    surveyCategoryDelete: service.survey + version +  '/survey/category/del',               // 설문 카테고리 삭제
    surveyCategorySelectList : service.survey + version + '/survey/category/selectlist'   // 설문 카테고리 조회(selectbox)
}

export default apiConfig;
