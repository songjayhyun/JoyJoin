import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Col, Card, Row, Carousel } from 'antd';
import GuestImage from './Section/GuestImage.js'
import GuestInfo from './Section/GuestInfo.js'
import { addToFriend } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
function DetailProductPage(props) {

    const dispatch = useDispatch();
    const guestId = props.match.params.guestId
    const [Guest, setGuest] = useState({})

    useEffect(() => {

        axios.get(`/api/guests/guests_by_id?id=${guestId}&type=single`)
            .then(response => {
                if(response.data.success) {
                    setGuest(response.data.guest[0])
                } else {
                    alert('상세정보 가져오기를 실패했습니다.')
                }
            })

    }, [])

    const addToFriendhandler = (guestId) => {
        dispatch(addToFriend(guestId))
    }
    return (

        <div style={{ width: '100%', padding: '3rem 4rem '}}>
            <div style={{ display : 'flex', justifyContent : 'center'}}>
                <h1>{Guest.title}</h1>
            </div>


            <br />
            <Row gutter={[16,16]}>
                <Col lg={12} sm={24}>
                {/* Guest Image */}
                <GuestImage detail={Guest}/>
                </Col>

                <Col lg={12} sm={24}> 
                {/* GuestInfo */}
                <GuestInfo  
                addToFriend={addToFriendhandler}
                detail={Guest}/>
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage
