# blog.api

个人博客网站的后台。使用ExpressJS+MongoDB。

## How to build & run

```bash
# install dependencies
npm install

# dev build
npm run buildDev

# production build
npm run build

# production publish，run with forever js
chmod +x run.sh
bash run.sh
```


# REST API 

base url : **`https://api.xechoz.xyz`**

请求格式: 需要通过 http body 传输的数据都是 JSON 格式

返回格式： JSON

```json
{
    "code": "int",
    "content": "最终数据，可能是JSON, 也可能是其他",
    "msg": "string, 结果说明"
}
```

## response code 说明 

状态码设计参考 [HTTP STATUS CODE](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

|值|说明|备注|
|----|----|----|
|1xx-5xx|HTTP 状态码|[HTTP STATUS CODE](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)|
|11xx|Informational|Request received, continuing process.|
|12xx|Success|200预期结果,其他参考 HTTP status code 定义及相应接口定义|
|13xx|Redirection||
|14xx| Client Error||
|15xx|Server Error||

## article api
|URL|HTTP|REQUEST|RESPONSE|DESCRIPTION|
|---|---|---|---|---|
|/articles|GET|Optional: page=number&size=number&onlySummary=[0,1 or bool]|article list|获取文章列表|
|/articles/\<id>|GET|id=article id|article object|获取某篇文章|
|/articles|POST|article json|created article object|添加一篇文章|
|/articles/\<id>|UPDATE|id=article id||更新文章|
|/articles/\<id>|DELETE|id=article id||删除文章。后台设置删除标识，实际数据还在|

```bash
curl -X GET $api/articles?onlySummary=true 
```
## account api

## user api

# Service API 

## login

|URL|REQUEST|RESPONSE|
|----|----|----|
|/account/login|POST|JSON|

Request json：
```json
{
    "user_name": "string, user account name, may be email",
    "time_stamp": "long, unix time stamp",
    "sign": "secret sign by user password"
}
```

sign algorithm

```javascript
HMAC(SHA512, PASSWORD)
.digest(user_name + "#" + time_stamp)
.toHex()
```

resonse json: User JSON
```javascript
{
  email: {type: String, trim: true},
  name: {type: String, trim: true, index: true},
  tel: {type: String, trim: true},
  firstName: {type: String, trim: true},
  lastName: {type: String, trim: true},
  avatar: {type: String, trim: true},
  accessToken: {type: String, trim: true, index: true},
  city: {type: String, trim: true},
  province: String,
  deviceInfo: [{type: Schema.Types.Mixed}],
  articles: [Schema.Types.ObjectId],
  extra: Schema.Types.Mixed,
  tech: [{type: String, index: true}],
  password: {type: String, trim: true, required: true}
}
```

# 参考 

1. [Wikipedia- List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)