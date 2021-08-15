# fastify-nodemailer-plugin

[![Version](https://img.shields.io/npm/v/fastify-nodemailer-plugin.svg)](https://www.npmjs.com/package/fastify-nodemailer-plugin)

Nodemailer for Fastify

## Installation

```bash
yarn add fastify-nodemailer-plugin
or
npm install fastify-nodemailer-plugin
```

## Usage

Register config and example config and more [nodemailer](https://nodemailer.com/about/)

```js
fastify.register(fastifyNodemailer, {
  service: "gmail",
  auth: {
    user: "testuser@gmail.com",
    pass: "secretpassword",
  },
});
```

If you use with TypeScript , you have to give this type to avoid error

```js
import Fastify, { FastifyInstance } from "fastify";

const fastify: FastifyInstance = Fastify();
```

Use with fastify decorate

```js
fastify.get("/", async (request, reply) => {
  fastify.nodemailer.sendMail({
    from: "testuser@gmail.com",
    to: request.body.email,
    subject: "Test User",
    text: "Hello World 👋",
  });
  return "Mail has send.";
});
```

Use with reply decorate

```js
fastify.get("/", async (request, reply) => {
  fastify.nodemailer.sendMail({
    from: "testuser@gmail.com",
    to: request.body.email,
    subject: "Test User",
    text: "Hello World 👋",
  });
  return "Mail has send.";
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
