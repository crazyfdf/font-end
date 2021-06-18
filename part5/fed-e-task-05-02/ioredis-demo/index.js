const ioredis = require("ioredis");
const express = require("express");
const { v4 } = require("uuid");

const app = express();
// 1. 建立连接
const redis = new ioredis({
  port: 6379,
  host: "127.0.0.1",
  connectTimeout: 10000,
});
app.use(express.json()); ////数据JSON类型
app.use(express.urlencoded({ extended: false })); //解析post请求数据

app.post("/", async (req, res, next) => {
  const type = {
    male: 0,
    female: 1,
  };
  try {
    const { body } = req;
    const userId = v4();
    console.log(body);
    await redis.select(type[body.type]);
    body.time = body.time || Date.now();
    await redis.hmset(userId, body);
    await redis.expire(userId, 60 * 60 * 24);
    res.status(201).json({
      code: 1,
      msg: {
        id: userId,
        ...body,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
app.get("/", async (req, res, next) => {
  try {
    const type = {
      male: 0,
      female: 1,
      all: Math.round(Math.random()),
    };
    const { query } = req;
    console.log(query);
    query.type = query.type || "all";
    await redis.select(type[query.type]);

    let userId = await redis.randomkey();
    if (!userId) {
      type.all = type.all === 0 ? 1 : 0;
      await redis.select(type[query.type]);
      userId = await redis.randomkey();
      if (!userId) {
        return res.status(200).json({
          code: 1,
          data: {},
          mes: "暂无漂流瓶",
        });
      }
    }
    const body = await redis.hgetall(userId);
    await redis.del(userId);
    res.status(200).json({
      code: 1,
      mes: body,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({
    code: 0,
    mes: err.message,
  });
});

app.use((req, res, next) => {
  res.status(404).send("404 Not Found.");
});

app.listen(1234, () => {
  console.log("server running");
});
