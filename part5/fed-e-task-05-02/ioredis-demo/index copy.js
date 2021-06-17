const ioredis = require("ioredis");
const express = require("express");
const { v4 } = require("uuid");

const app = express();
// 1. 建立连接
const redis = new ioredis({
  port: 6379,
  host: "42.240.131.35",
  connectTimeout: 10000,
});
app.use(express.json());
const type = {
  all: 0,
  male: 1,
  female: 2,
};
app.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body);
    const userId = v4();

    await redis.select(type[body.type]);
    await redis.hmset(userId, body);
    await redis.expire(userId, 60 * 60 * 24);
    res.status(200).json({
      code: 1,
      msg: "success",
      data: {
        id: userId,
        ...body,
        time: body.time || Date.now(),
      },
    });
  } catch (err) {
    next(err);
  }
});
app.get("/", async (req, res, next) => {
  try {
    const { query } = req;
    console.log(query);
    query.type = query.type || "all";
    await redis.select(type[query.type]);
    const userId = await redis.randomkey();
    if (!userId) {
      return res.status(200).json({
        code: 1,
        data: {},
        mes: "暂无漂流瓶",
      });
    }
    const body = await redis.hgetall(userId);
    await redis.del(userId);
    res.status(200).json({
      code: 1,
      mes: "success",
      data: body,
    });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({
    code: 0,
    mes: err.message,
  });
});

app.listen(80, () => {
  console.log("server running");
});
// async function main () {
//   try {
//     await redis.set('adbs')
//     console.log('OK')
//   } catch (err) {
//     console.log('操作失败', err)
//   }
// }

// main()

// async function main () {
//   try {
//     const ret = await redis
//       .multi()
//       .set('Jack', 100)
//       .set('Rose', 200)
//       .exec()
//     console.log(ret)
//   } catch (err) {
//     console.log('操作失败', err)
//   }
// }

// main()

// async function main () {
//   try {
//     const pipeline = redis.pipeline()
//     for (let i = 0; i < 100; i++) {
//       pipeline.set(`${i}-foo`, i)
//     }
//     const ret = await pipeline.exec()
//     console.log(ret)
//   } catch (err) {
//     console.log('操作失败', err)
//   }
// }

// main()

// async function main () {
//   try {
//     const ret = await redis.get('foo')
//     console.log(ret)
//   } catch (err) {
//     console.log('操作失败', err)
//   }
// }

// main()

// redis.get('foo')
//   .then(ret => {
//     console.log(ret)
//   })
//   .catch(err => {
//     console.log('获取失败', err)
//   })

// 2. 操作 Redis 数据库
redis.set("foo", "bar", (err, ret) => {
  if (err) {
    return console.log("写入失败", err);
  }

  console.log("写入成功", ret);
});

// redis.get('foo', (err, ret) => {
//   if (err) {
//     return console.log('获取失败', err)
//   }
//   console.log(ret)
// })
