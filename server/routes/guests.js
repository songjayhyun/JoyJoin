const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Guests} = require('../models/Guests');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             Guests
//=================================

router.post("/image", (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.post("/uploadInfo", (req, res) => {
    // 받아온 정보들을 DB에 저장한다.
    const guests = new Guests(req.body)
    guests.save((err) => {
        if(err) return res.status(400).json({success : false, err})
        return res.status(200).json({success:true})
    })
});

router.get('/guests_by_id', (req, res)=> {

    let type = req.query.type
    let guestId = req.query.id
    // guestsId를 이용해서 DB에서 guestsId와 같은 상품의 정보를 가져온다
    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    Guests.find({ _id : guestId })
    .populate('writer')
    .exec((err, guest)=> {
        if(err) return res.status(400).json({success : false, err})
        return res.status(200).json({success: true, guest})
    })

})

router.post("/guests", (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 20// parseInt 만약 String이라면 숫자로 바꿔주는 역할
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    let findArgs = {}

    for (let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {

            if(key === "age" || key === "gender") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0], // greater then equal
                    $lte: req.body.filters[key][1]  // less than equal
                }

            } else {
                findArgs[key] = req.body.filters[key]
            }

        }
    }

    Guests.find(findArgs)
            .populate('writer') // Product에 있는 모든 정보
            .skip(skip)
            .limit(limit)
            .exec((err, guestInfo) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success : true, guestInfo,
                                        postSize : guestInfo.length})
            })
    
});



module.exports = router;