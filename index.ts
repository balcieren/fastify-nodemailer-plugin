import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export type FastifyNodemailerOptions = SMTPTransport.Options;
export const createTestAccount = nodemailer.createTestAccount;
export const getTestMessageUrl = nodemailer.getTestMessageUrl;

const nodeMailerPlugin: FastifyPluginCallback<FastifyNodemailerOptions> = (
  fastify,
  options,
  done
) => {
  if (fastify.nodemailer)
    return done(
      new Error("fastify-nodemailer-plugin has been defined before ")
    );

  fastify
    .decorate("nodemailer", nodemailer.createTransport(options))
    .decorateReply("nodemailer", fastify.nodemailer)
    .addHook("onClose", (fastify, done) => {
      fastify.nodemailer.close();
      done();
    });

  done();
};

const fastifyNodemailer = fp(nodeMailerPlugin, {
  fastify: "3.x",
  name: "fastify-nodemailer-plugin",
});

export default fastifyNodemailer;

declare module "fastify" {
  interface FastifyReply {
    nodemailer: nodemailer.Transporter;
  }
  interface FastifyInstance {
    nodemailer: nodemailer.Transporter;
  }
}
