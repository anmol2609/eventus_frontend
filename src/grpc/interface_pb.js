// source: interface.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

import * as jspb from 'google-protobuf';

export class InterfaceRequest extends jspb.Message {
  constructor(opt_data) {
    super();
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
  }

  static toObject(includeInstance, msg) {
    const obj = {
      appId: jspb.Message.getFieldWithDefault(msg, 1, ""),
      resourcePath: jspb.Message.getFieldWithDefault(msg, 2, ""),
      requestData: jspb.Message.getFieldWithDefault(msg, 3, "")
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  }

  toObject(opt_includeInstance) {
    return InterfaceRequest.toObject(opt_includeInstance, this);
  }

  static deserializeBinary(bytes) {
    const reader = new jspb.BinaryReader(bytes);
    const msg = new InterfaceRequest();
    return InterfaceRequest.deserializeBinaryFromReader(msg, reader);
  }

  static deserializeBinaryFromReader(msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      const field = reader.getFieldNumber();
      switch (field) {
        case 1:
          msg.setAppId(reader.readString());
          break;
        case 2:
          msg.setResourcePath(reader.readString());
          break;
        case 3:
          msg.setRequestData(reader.readString());
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  }

  serializeBinary() {
    const writer = new jspb.BinaryWriter();
    InterfaceRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  static serializeBinaryToWriter(message, writer) {
    let f;
    f = message.getAppId();
    if (f.length > 0) {
      writer.writeString(1, f);
    }
    f = message.getResourcePath();
    if (f.length > 0) {
      writer.writeString(2, f);
    }
    f = message.getRequestData();
    if (f.length > 0) {
      writer.writeString(3, f);
    }
  }

  getAppId() {
    return jspb.Message.getFieldWithDefault(this, 1, "");
  }

  setAppId(value) {
    return jspb.Message.setProto3StringField(this, 1, value);
  }

  getResourcePath() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
  }

  setResourcePath(value) {
    return jspb.Message.setProto3StringField(this, 2, value);
  }

  getRequestData() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
  }

  setRequestData(value) {
    return jspb.Message.setProto3StringField(this, 3, value);
  }
}

export class InterfaceResponse extends jspb.Message {
  constructor(opt_data) {
    super();
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
  }

  static toObject(includeInstance, msg) {
    const obj = {
      status: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
      message: jspb.Message.getFieldWithDefault(msg, 2, ""),
      responseData: jspb.Message.getFieldWithDefault(msg, 3, "")
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  }

  toObject(opt_includeInstance) {
    return InterfaceResponse.toObject(opt_includeInstance, this);
  }

  static deserializeBinary(bytes) {
    const reader = new jspb.BinaryReader(bytes);
    const msg = new InterfaceResponse();
    return InterfaceResponse.deserializeBinaryFromReader(msg, reader);
  }

  static deserializeBinaryFromReader(msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      const field = reader.getFieldNumber();
      switch (field) {
        case 1:
          msg.setStatus(reader.readBool());
          break;
        case 2:
          msg.setMessage(reader.readString());
          break;
        case 3:
          msg.setResponseData(reader.readString());
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  }

  serializeBinary() {
    const writer = new jspb.BinaryWriter();
    InterfaceResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  static serializeBinaryToWriter(message, writer) {
    let f;
    f = message.getStatus();
    if (f) {
      writer.writeBool(1, f);
    }
    f = message.getMessage();
    if (f.length > 0) {
      writer.writeString(2, f);
    }
    f = message.getResponseData();
    if (f.length > 0) {
      writer.writeString(3, f);
    }
  }

  getStatus() {
    return jspb.Message.getBooleanFieldWithDefault(this, 1, false);
  }

  setStatus(value) {
    return jspb.Message.setProto3BooleanField(this, 1, value);
  }

  getMessage() {
    return jspb.Message.getFieldWithDefault(this, 2, "");
  }

  setMessage(value) {
    return jspb.Message.setProto3StringField(this, 2, value);
  }

  getResponseData() {
    return jspb.Message.getFieldWithDefault(this, 3, "");
  }

  setResponseData(value) {
    return jspb.Message.setProto3StringField(this, 3, value);
  }
}
