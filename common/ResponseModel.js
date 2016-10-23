/**
* code refrence:
* TODO
* 0: ok,
* 1: fail,
**/

'use strict';

class ResponseModel {
  constructor(code, msg, content) {
    this.code = code;
    this.msg = msg;
    this.content = content;
  }

  setCode(code) {
    this.code = code;
    return this;
  }

  setMsg(msg) {
    this.msg = msg;
    return this;
  }

  setContent(content) {
    this.content = content;
    return this;
  }

  newInstance(code, msg, content) {
    return new ResponseModel(code, msg, content);
  }

  empty() {
    this.code = ResponseModel.OK;
    return this;
  }

  error() {
    this.code = ResponseModel.FAIL;
    return this;
  }
}

ResponseModel.OK = 0;
ResponseModel.FAIL = 1;

module.exports = ResponseModel;
