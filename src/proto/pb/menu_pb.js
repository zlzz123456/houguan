/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var common_pb = require('./common_pb.js');
goog.object.extend(proto, common_pb);
goog.exportSymbol('proto.pb.MenuItem', null, global);
goog.exportSymbol('proto.pb.MenuRequest', null, global);
goog.exportSymbol('proto.pb.MenuResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.MenuItem = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.MenuItem, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.MenuItem.displayName = 'proto.pb.MenuItem';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.MenuRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.MenuRequest.repeatedFields_, null);
};
goog.inherits(proto.pb.MenuRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.MenuRequest.displayName = 'proto.pb.MenuRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.MenuResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.MenuResponse.repeatedFields_, null);
};
goog.inherits(proto.pb.MenuResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.MenuResponse.displayName = 'proto.pb.MenuResponse';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.MenuItem.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.MenuItem.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.MenuItem} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.MenuItem.toObject = function(includeInstance, msg) {
  var obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    title: jspb.Message.getFieldWithDefault(msg, 2, ""),
    hassubmenu: jspb.Message.getFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.MenuItem}
 */
proto.pb.MenuItem.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.MenuItem;
  return proto.pb.MenuItem.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.MenuItem} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.MenuItem}
 */
proto.pb.MenuItem.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHassubmenu(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.MenuItem.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.MenuItem.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.MenuItem} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.MenuItem.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getHassubmenu();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.pb.MenuItem.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.pb.MenuItem.prototype.setName = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string title = 2;
 * @return {string}
 */
proto.pb.MenuItem.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.pb.MenuItem.prototype.setTitle = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool hasSubMenu = 3;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.pb.MenuItem.prototype.getHassubmenu = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 3, false));
};


/** @param {boolean} value */
proto.pb.MenuItem.prototype.setHassubmenu = function(value) {
  jspb.Message.setProto3BooleanField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.MenuRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.MenuRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.MenuRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.MenuRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.MenuRequest.toObject = function(includeInstance, msg) {
  var obj = {
    request: (f = msg.getRequest()) && common_pb.Request.toObject(includeInstance, f),
    namelistList: jspb.Message.getRepeatedField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.MenuRequest}
 */
proto.pb.MenuRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.MenuRequest;
  return proto.pb.MenuRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.MenuRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.MenuRequest}
 */
proto.pb.MenuRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new common_pb.Request;
      reader.readMessage(value,common_pb.Request.deserializeBinaryFromReader);
      msg.setRequest(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addNamelist(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.MenuRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.MenuRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.MenuRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.MenuRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getRequest();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      common_pb.Request.serializeBinaryToWriter
    );
  }
  f = message.getNamelistList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional Request request = 1;
 * @return {?proto.pb.Request}
 */
proto.pb.MenuRequest.prototype.getRequest = function() {
  return /** @type{?proto.pb.Request} */ (
    jspb.Message.getWrapperField(this, common_pb.Request, 1));
};


/** @param {?proto.pb.Request|undefined} value */
proto.pb.MenuRequest.prototype.setRequest = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.pb.MenuRequest.prototype.clearRequest = function() {
  this.setRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.MenuRequest.prototype.hasRequest = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated string nameList = 2;
 * @return {!Array<string>}
 */
proto.pb.MenuRequest.prototype.getNamelistList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/** @param {!Array<string>} value */
proto.pb.MenuRequest.prototype.setNamelistList = function(value) {
  jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 */
proto.pb.MenuRequest.prototype.addNamelist = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.pb.MenuRequest.prototype.clearNamelistList = function() {
  this.setNamelistList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.MenuResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.MenuResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.MenuResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.MenuResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.MenuResponse.toObject = function(includeInstance, msg) {
  var obj = {
    result: (f = msg.getResult()) && common_pb.Result.toObject(includeInstance, f),
    menulistList: jspb.Message.toObjectList(msg.getMenulistList(),
    proto.pb.MenuItem.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.MenuResponse}
 */
proto.pb.MenuResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.MenuResponse;
  return proto.pb.MenuResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.MenuResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.MenuResponse}
 */
proto.pb.MenuResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new common_pb.Result;
      reader.readMessage(value,common_pb.Result.deserializeBinaryFromReader);
      msg.setResult(value);
      break;
    case 2:
      var value = new proto.pb.MenuItem;
      reader.readMessage(value,proto.pb.MenuItem.deserializeBinaryFromReader);
      msg.addMenulist(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.MenuResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.MenuResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.MenuResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.MenuResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResult();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      common_pb.Result.serializeBinaryToWriter
    );
  }
  f = message.getMenulistList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.pb.MenuItem.serializeBinaryToWriter
    );
  }
};


/**
 * optional Result result = 1;
 * @return {?proto.pb.Result}
 */
proto.pb.MenuResponse.prototype.getResult = function() {
  return /** @type{?proto.pb.Result} */ (
    jspb.Message.getWrapperField(this, common_pb.Result, 1));
};


/** @param {?proto.pb.Result|undefined} value */
proto.pb.MenuResponse.prototype.setResult = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.pb.MenuResponse.prototype.clearResult = function() {
  this.setResult(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.MenuResponse.prototype.hasResult = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated MenuItem menuList = 2;
 * @return {!Array<!proto.pb.MenuItem>}
 */
proto.pb.MenuResponse.prototype.getMenulistList = function() {
  return /** @type{!Array<!proto.pb.MenuItem>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.MenuItem, 2));
};


/** @param {!Array<!proto.pb.MenuItem>} value */
proto.pb.MenuResponse.prototype.setMenulistList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.pb.MenuItem=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.MenuItem}
 */
proto.pb.MenuResponse.prototype.addMenulist = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.pb.MenuItem, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 */
proto.pb.MenuResponse.prototype.clearMenulistList = function() {
  this.setMenulistList([]);
};


goog.object.extend(exports, proto.pb);
