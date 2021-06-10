import React, { useState, useEffect } from 'react'
import { Button, Descriptions} from 'antd';
import GuestMbti from './GuestMbti.js'
import { addToFriend } from '../../../../_actions/user_actions'
import { useDispatch } from 'react-redux'

function GuestInfo(props) {
    const dispatch = useDispatch()

    const addToFriendhandler = () => {
        dispatch(addToFriend(props.detail._id))
    }

    return (
        <div>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="나이">{props.detail.age}</Descriptions.Item>
                <Descriptions.Item label="MBTI"><GuestMbti mbti={props.detail}/></Descriptions.Item>
                {
                    props.detail.gender === "1" &&
                    <Descriptions.Item label="성별"><span>남성</span></Descriptions.Item>
                }
                {
                    props.detail.gender === "2" &&
                    <Descriptions.Item label="성별"><span>여성</span></Descriptions.Item>
                }
                <Descriptions.Item label="자기소개">{props.detail.description}</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={addToFriendhandler}
                >
                    Add to Friend
                    </Button>
            </div>
        </div>
    )
}

export default GuestInfo
