一、简答题

简述 Graphql （结合Express ）是如何使用的？

1. 导入graphql、express-graphql、express
```
const { graphql, buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const app = express();
```
2. 定义schema 和 resolver
```
// 1. 使用GraphQL schema 语法构建一个schema
const schema = buildSchema(`
  type Query {
    foo: String
  }
`);
// 2. 定义 scheme 的 resolver
const rootValue = {
  foo() {
    return "bar";
  },
  count() {
    return 123
  }
};
```

3. 挂载 GraphQL 中间件
```
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,// 开启浏览器的GraphQL IDE调试工具
  })
);

```

4. 启动服务
```
app.listen(5000, () => {
  console.log("GraphQL Server is running at port 5000");
});
```

简述 Apollo server 的基本使用。

1. 导入 apollo-server
```
const { ApolloServer, gql } = require("apollo-server");
```

2. 定义 schema 和 resolver
```
// 定义schema
const typeDefs = gql`
  type Query {
    foo: String
  }
`;
// 定义resolver
const resolver = {
  // 所以schema中Query内部的字段都会调用这里的Query对象内部对应的方法
  Query: {
    foo: () => {
      return "bar";
    },
  },
};
```

3. 创建 GraphQL Server，开启 web 服务
```
const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000).then(({ url }) => {
  console.log(`server is running at ${url}`);
});
```
从 MongoDB 中获取数据的流程。
>使用 apollo-datasource-mongodb 包将 MongoDB 数据映射到 GraphQL 数据层

- 使用 mongoose 来进行 MongoDB 的驱动，开启连接服务
- 导入 MongoDB 中的数据 schema
- 方式一：直接在 resolver 中操作数据库数据
  - 在 GraphQL 的 resolver 中使用导入的数据 Schema 来操作数据库中的数据（增删改查）
- 方式二：使用 data Sources 来映射数据

  方式一的 resolver 与数据库耦合太强，需要进行进一步的拆分解耦

  - 导入 apollo-datasource-mongodb 包

  ```javascript
  const { MongoDataSource } = require("apollo-datasource-mongodb");
  ```

  - 创建数据映射类: 将数据库的数据操作封装在数据映射类中，每一个数据 Schema 都创建一个对应的数据映射类，如 User 数据 Schema 可以创建一个 User 映射类，该类中封装了对 User Schema 数据所需的操作

  ```javascript
  // 创建数据映射类，这里创建的是User Schema对应的映射类Users
  class Users extends MongoDataSource {
    getUser(userID) {
      return this.findOneById(userID);
    }
    getUsers() {
      // 使用this.model来访问对应的数据Schema
      return this.models.find();
    }
  }
  ```

  - 在创建 server 时，传入 dataSources 选项

  ```javascript
  const server = new ApolloServer({
    typeDefs,
    resolver,
    dataSources: () => ({
      // 使用数据映射类时，构造函数传入数据Schema
      // users作为dataSources的成员
      users: new Users(User);
    }),
  });
  ```

  - 在 resolver 中使用 DataSources 映射类提供的方法来操作数据库

  ```javascript
  const resolver = {
    Query: {
      async users(parent, args, { dataSources }) {
        // resolver与dataSources交互即可，将数据库的操作与resolver解耦
        const users = await dataSources.users.getUsers();
        return users;
      },
      async user(parent, { id }, { dataSources }) {
        const user = await dataSources.user.getUser(id);
        return user;
      },
    },
  };
  ```


二、代码题

实现一个 GraphQL 版本的完整 realworld API。
- 代码地址：realworld-graphql-api

