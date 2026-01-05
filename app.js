// 모듈
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
dotenv.config();

// 라우팅
const router = require("./src/routes");

// 미들웨어
app.use(cors({
    origin: true,
    credentials: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

module.exports = app;