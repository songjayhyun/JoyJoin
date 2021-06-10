import React, { useState } from 'react'
import {Typography, Button, Form, Input, Radio} from 'antd';
import FileUpload from "../../utils/FileUpload";
import Axios from 'axios';
import moment from 'moment';
import { STATES } from 'mongoose';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const { Title } = Typography;
const { TextArea } = Input;

const Mbtis = [
    { key: 1, value: "INFP" },
    { key: 2, value: "ENFP" },
    { key: 3, value: "INFJ" },
    { key: 4, value: "ENFJ" },
    { key: 5, value: "INTJ" },
    { key: 6, value: "ENTJ" },
    { key: 7, value: "INTP" },
    { key: 8, value: "ENTP" },
    { key: 9, value: "ISFP" },
    { key: 10, value: "ESFP" },
    { key: 11, value: "ISTP" },
    { key: 12, value: "ESTP" },
    { key: 13, value: "ISFJ" },
    { key: 14, value: "ESFJ" },
    { key: 15, value: "ISTJ" },
    { key: 16, value: "ESTJ" },
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Gender, setGender] = useState(1)
    const [StartDate, setStartDate] = useState(new Date())
    const [Description, setDescription] = useState("")
    const [Age, setAge] = useState(0)
    const [Mbti, setMbti] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const genderChangeHandler = (e) => {
        setGender(e.target.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const ageChangeHandler = (event) => {
        setAge(event.currentTarget.value)
    }

    const mbtiChangeHandler = (event) => {
        setMbti(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    
    const onSubmit = (event) => {
        event.preventDefault()

        if(!Title || !Description || !Age ||  !Mbti || !Images) {
            return alert('모든 값을 넣어주셔야 합니다.')
        }

        // 서버의 값들을 Db로

        const body = {
            // 로그인 된 사람의 Id
            writer : props.user.userData._id,
            title : Title,
            description : Description,
            gender : Gender,
            birthday : StartDate,
            age : Age,
            images : Images,
            mbtis : Mbti
        }

        Axios.post('/api/guests/uploadInfo', body )
        .then(response => {
            if (response.data.success ) {
                alert('회원정보 저장에 성공했습니다.')
                props.history.push('/')
            } else {
                alert('회원정보 저장에 실패했습니다.')
            }
        })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> 회원정보 업로드</h2>
            </div>

            <Form onSubmit = {onSubmit} >
                {/* DropZone */}

                {<FileUpload refreshFunction={updateImages}/>}


                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>성별</label>
                <br />
                <Radio.Group onChange={genderChangeHandler} value={Gender}>
                <Radio value={1}>남자</Radio>
                <Radio value={2}>여자</Radio>
                </Radio.Group>
                <br />
                <br />
                <label>생일</label>
                <br />
                <DatePicker selected={StartDate} onChange={(date) => setStartDate(date)} />
                <br />
                <br />
                <label>자기소개</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>나이</label>
                <Input type="number" onChange={ageChangeHandler} value={Age} />
                <br />
                <br />
                <select onChange={mbtiChangeHandler} value={Mbti}>
                    {Mbtis.map(item => (
                        <option key={item.key} value={item.key}> {item.value} </option>
                    ))}
                    
                </select>
                <br />
                <br />
                <Button onClick={onSubmit}>
                    확인
                </Button>
            </Form>


        </div>
    )
}

export default UploadProductPage