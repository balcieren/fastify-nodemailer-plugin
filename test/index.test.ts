import Fastify from "fastify";
import tap from "tap";
import fastifyNodemailer from "../index";

const buildApp = async (t: Tap.Test) => {
  const fastify = Fastify({ logger: { level: "error" } });

  t.teardown(() => {
    fastify.close();
  });

  return fastify;
};

tap.test("fastify-nodemailer-plugin test", async (t) => {
  t.test("register plugin", async (t) => {
    const fastify = await buildApp(t);

    try {
      await fastify.register(fastifyNodemailer);

      t.ok("nodemailer" in fastify, "should not throw any error");
    } catch (error) {
      console.log(error);
      t.error(error);
    }
  });
});
