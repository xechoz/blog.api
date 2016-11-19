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

    readData(userName, (error, data) => {
        if (error) {
            res.json(ERROR.setMsg(error));
        } else {
            console.log('data: ' + JSON.stringify(data));
            console.log('password: ' + data['password']);

            const msgContent = userName + '#' + timeStamp;
            const crypto = require('crypto');
            const hmac = crypto.createHmac('sha512', '' + data.password);
            hmac.update(msgContent);
            const digest = hmac.digest('hex');
            const isMatched = sign == digest;

            console.log('client: ' + sign);
            console.log('server: ' + digest);

            if (isMatched) {
                res.json(new Result().setContent(data).setMsg(digest));
            } else {
                const temp = {
                    server: digest,
                    client: sign
                };

                res.json(new Result().setCode(Result.FAIL).setMsg(temp));
            }
        }
    });
});

router.post('/signup', (req, res) => {
    res.end(req.baseUrl);
});

function readData(userName, callback) {
    User.findOne({ 'name': userName })
        .exec((error, user) => {
            if (error) {
                log.e(error);
                callback.call(this, error);
            } else if (user) {
                callback.call(this, null, user.toObject());
            } else {
                callback.call(this, 'user not exit.');
            }
        });
};

module.exports = router;