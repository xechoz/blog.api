'use strict';

const router = require('express').Router();
const log = require('../common/log');
const Result = require('../common/ResponseModel');
const EMPTY = new Result().empty();
const ERROR = new Result().error();
const User = require('../model/user');
/**
 * steps:
 * 
 * @param name
 * @param sha256(name + password + time)
 * @time time stamp in million seconds
 * 
 * request body:
 * {
 *  user_name: string,
 *  time_stamp: long,
 *  sign: RSA(sha256),
 *  
 * }
 */
router.post('/login', (req, res) => {
    log.d(req.body);

    const body = req.body;
    const userName = body['user_name'];
    const timeStamp = body['time_stamp'];
    const sign = body['sign'];

    getPassword(userName, (error, password) => {
        if (error) {
            res.json(ERROR.setMsg(error));
        } else {
            const msgContent = userName + '#' + timeStamp;
            const crypto = require('crypto');
            const hmac = crypto.createHmac('sha512', password);
            hmac.update(msgContent);
            const digest = hmac.digest('hex');
            const isMatched = sign == digest;

            res.json(new Result().setContent(isMatched).setMsg(digest));
        }
    });
});

router.post('/signup', (req, res) => {
    res.end(req.baseUrl);
});

function getPassword(userName, callback) {
    User.findOne({ 'name': userName })
        .select('password')
        .lean()
        .exec((error, user) => {
            if (error) {
                log.e(error);
                callback.call(this, error);
            } else if (user) {
                callback.call(this, null, user['password']);
            } else {
                callback.call(this, 'password empty');
            }
        });
};

module.exports = router;