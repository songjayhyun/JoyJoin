import React, {useEffect} from 'react'
import { Button, Descriptions} from 'antd';

function GuestMbti(props) {

    return (
        <div>
            {
                props.mbti.mbtis === 1 && <span>INFP</span>
            }
            {
                props.mbti.mbtis === 2 && <span>ENFP</span>
            }
            {
                props.mbti.mbtis === 3 && <span>INFJ</span>
            }
            {
                props.mbti.mbtis === 4 && <span>ENFJ</span>
            }
            {
                props.mbti.mbtis === 5 && <span>INTJ</span>
            }
            {
                props.mbti.mbtis === 6 && <span>ENTJ</span>
            }
            {
                props.mbti.mbtis === 7 && <span>INTP</span>
            }
            {
                props.mbti.mbtis === 8 && <span>ENTP</span>
            }
            {
                props.mbti.mbtis === 9 && <span>ISFP</span>
            }
            {
                props.mbti.mbtis === 10 && <span>ESFP</span>
            }
            {
                props.mbti.mbtis === 11 && <span>ISTP</span>
            }
            {
                props.mbti.mbtis === 12 && <span>ESTP</span>
            }
            {
                props.mbti.mbtis === 13 && <span>ISFJ</span>
            }
            {
                props.mbti.mbtis === 14 && <span>ESFJ</span>
            }
            {
                props.mbti.mbtis === 15 && <span>ISTJ</span>
            }
            {
                props.mbti.mbtis === 16 && <span>ESTJ</span>
            }
        </div>
    )
}

export default GuestMbti
