import apiConfig from '../apiConfig';
import axios from "axios";


// 생성 그룹 리스트 조회
export const allGroupList = ()=> 
  axios.get(apiConfig.allGroupList)


  // 검색 사용자 리스트 조회
export const allUserList = ({ selectedType, searchKeyword })=> 
axios.get(apiConfig.allUserList+"?type="+selectedType+"&keyword="+searchKeyword)

