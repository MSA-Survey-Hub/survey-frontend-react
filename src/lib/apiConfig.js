 const service = {
    auth : '/auth-service',
    survey : '/survey-service',
    common : '/common-service',
    analysis : '/analysis-service',
};

const version = '/v1';

const apiConfig = {
    menuList : service.common + version + '/common/menu',                                   // 사이드바 메뉴 리스트 조회

    userDetail : service.auth + version + '/user/detail',                                   // 사용자 상세정보 조회
    groupList : service.auth + version + '/user/groupList',                                 // 사용자 그룹 리스트 조회

    surveySearchList : service.survey + version + '/survey/search_list',                    // 설문 검색 리스트 조회

    surveyAnalysisData : service.analysis + version + '/analysis/survey_analysis',          // 설문 통계 데이터 조회(user)
    platformAnalysisData : service.analysis + version + '/analysis/platform_analysis',      // 설문 통계 데이터 조회(admin)
    surveyTypeSubOp : service.analysis + version + '/analysis/survey_analysis_info',        // 설문조사 결과탭 응답자 통계 타입, 옵션 정보 조회

}

export default apiConfig;