import Ajv, { Schema } from "ajv";
import { LoginData, MessageData } from "./types";

const ajv = new Ajv();

const loginDataSchema: Schema = {
  type: "object",
  properties: {
    login: {
      type: "object",
      properties: {
        username: { type: "string", minLength: 5, maxLength: 30 },
        location: { type: "string", minLength: 5, maxLength: 50 },
      },
      required: ["username", "location"],
    },
  },
  required: ["login"],
  additionalProperties: false,
};

const messageDataSchema: Schema = {
  type: "object",
  properties: {
    message: {
      type: "object",
      properties: {
        text: { type: "string", minLength: 1 },
      },
      required: ["text"],
    },
  },
  required: ["message"],
};

export function isLoginData(data: object): data is LoginData {
  return ajv.validate(loginDataSchema, data);
}

export function isMessageData(data: object): data is MessageData {
  return ajv.validate(messageDataSchema, data);
}
