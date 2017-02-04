'use strict';

const Log = require('../../common/log.js');

/**
 * 1. 获取主标题，副标题
 * 2。获取前 8 行
 */

const MAX_LINE = 8;

const MAKDOWN_SYNTAX = {
    CODE_BLOCK: '```',
    H1: '#',
    H2: '##',
    H3: '###'
};

const summary = {
    maxLine: MAX_LINE,
    
    toSummary(markdown) {
        let lines = markdown.split('\n');

        if (lines.size <= this.maxLine) {
            return markdown;
        } else {
            let result = lines.slice(0, this.maxLine);

            let codeBlockPair = 0; // 记录 CODE_BLOCK 的数量

            result.forEach((item, index) => {
                if (item.trim().slice(0, 3) == MAKDOWN_SYNTAX.CODE_BLOCK) {
                    codeBlockPair ++;
                }
            });

            // 单数， 补一个 CODE_BLOCK
            if (codeBlockPair % 2 != 0) {
                result = result.concat('\n' + MAKDOWN_SYNTAX.CODE_BLOCK);
            }

            let temp = '';
            result.forEach(item => {
                temp = temp + item + '\n';
            });

            return temp;
        }
    }
};

module.exports = summary;