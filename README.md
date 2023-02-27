## Description

A application for generate QR with Nestjs.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# API endpoints

## POST /generate-qr
**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `url` | required | string  | The url of QR                                         |
|     `type` | required | string [html, json, image]  | Type of file QR
|     `size` | optional | number  | Size of QR. Default: 20          
|     `color` | optional | ColorQR  | Color of QR. Default: { "dark": "#000", "light": "#ffffff" }
                       

