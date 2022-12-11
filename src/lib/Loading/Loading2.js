import React from 'react';
import ladingImage from 'src/assets/images/loading/loading2.gif';
import {Background, LoadingText} from './Styles2';

export const Loading = () => {
    return (
        <>
            <Background>
                <LoadingText>잠시만 기다려 주세요.</LoadingText>
                <img src={ladingImage} alt="로딩중" width="5%" />
            </Background>
        </>
      );
  };

export default Loading;

