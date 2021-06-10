import React, {useEffect, useState } from 'react'
import Axios from 'axios'
import {Button, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider.js'
import CheckBox from '../LandingPage/Section/CheckBox.js'
import RadioBox from '../LandingPage/Section/RadioBox.js'
import RadioBox2 from '../LandingPage/Section/RadioBox2.js'
import { mbtis, age, gender } from '../LandingPage/Section/Data.js'
import { Aggregate } from 'mongoose';

function LandingPage() {

    const [Info, setInfo] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        mbtis : [],
        age : [],
        gender : []
    })


    useEffect(() => {
        
        let body = {
            skip : Skip,
            limit : Limit
        }

        getMbtis(body)

    }, [])

    const getMbtis = (body) => {
        
        Axios.post('/api/guests/guests', body)
        .then (response => {
            if(response.data.success) {
                if(body.loadMore) {
                    setInfo([...Info, ...response.data.guestInfo])
                }
                else {
                    setInfo(response.data.guestInfo)
                }
                setPostSize(response.data.postSize)
            } else {
                alert('회원정보를 가져오는데 실패하였습니다.')
            }
        })
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip : skip,
            limit : Limit,
            loadMore : true
        }  
        getMbtis(body)
        setSkip(skip)
        
    }

    const renderCards = Info.map((guest, index) => {

        // 큰 화면 lg, 중간 화면 md, 작은 화면 xs
        return <Col lg={6} md={8} xs={24} key = {index}> 
            <Card
               cover={<a href={`/guests/${guest._id}`}><ImageSlider  images={guest.images} /></a>}
            >
                <Meta 
                    title = {guest.title}
                    description = {`${guest.age}`}
                />
            </Card>
        </Col>
    })

    const showFilterResults = (filters) => {

        let body = {
            skip : 0,
            limit : Limit,
            filters : filters
        }  

        getMbtis(body)
        setSkip(0)
    }

    const handleAge = (value) => {
        const data = age
        let array = []

        for (let key in data) {

            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }

        return array
    } 

    const handleGender = (value) => {
        const data = gender
        let array = []

        for (let key in data) {

            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }

        return array
    }
    
    const handleFilters = (filters, category) => {
        const newFilters = { ... Filters }
        newFilters[category] = filters

        if(category === "age") {
            let ageValues = handleAge(filters)
            newFilters[category] = ageValues // [0,199] or [200,249]...
        } else if (category === "gender") {
            let genderValues = handleGender(filters)
            newFilters[category] = genderValues 
        }

        showFilterResults(newFilters)
        setFilters(newFilters)
    }

    return (
        <div style = {{ width : '75%', margin: '3rem auto'}}>

            <div style={{ textAlign : 'center'}}>
                <h2>상대방 찾기</h2>
            </div>

            {/* Filter */}

            <Row gutter={[16,16]}>
                <Col lg={8} xs={24}>
                   {/* CheckBox */}
                    < CheckBox list={mbtis} handleFilters = {filters => handleFilters(filters, "mbtis")}/>
                </Col>

                <Col lg={8} xs={24}>
                    {/* RadioBox */}
                    <RadioBox list={age} handleFilters={filters => handleFilters(filters, "age")}/>
                </Col>

                <Col lg={8} xs={24}>
                    {/* RadioBox */}
                    <RadioBox2 list={gender} handleFilters={filters => handleFilters(filters, "gender")}/>
                </Col>
            </Row>
        

            {/* Cards */}
            
            <Row gutter={[16,16]} >
                {renderCards}
            </Row>

            {
                PostSize >= Limit &&
                <div style={{ display : 'flex', justifyContent : 'center', padding: '3rem 4rem'}}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            }

        </div>
    )
}

export default LandingPage
