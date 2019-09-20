/**
 * @fileoverview gRPC-Web generated client stub for pb
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web/index');


var common_pb = require('./common_pb.js')
const proto = {};
proto.pb = require('./normal_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pb.NormalServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pb.NormalServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.NormalRequest,
 *   !proto.pb.NormalResponse>}
 */
const methodInfo_NormalService_GetJSON = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.NormalResponse,
  /** @param {!proto.pb.NormalRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.NormalResponse.deserializeBinary
);


/**
 * @param {!proto.pb.NormalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.NormalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.NormalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.NormalServiceClient.prototype.getJSON =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.NormalService/GetJSON',
      request,
      metadata || {},
      methodInfo_NormalService_GetJSON,
      callback);
};


/**
 * @param {!proto.pb.NormalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.NormalResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.NormalServicePromiseClient.prototype.getJSON =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.NormalService/GetJSON',
      request,
      metadata || {},
      methodInfo_NormalService_GetJSON);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.NormalRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_NormalService_UpdateJSON = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.CommonResponse,
  /** @param {!proto.pb.NormalRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.CommonResponse.deserializeBinary
);


/**
 * @param {!proto.pb.NormalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.CommonResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CommonResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.NormalServiceClient.prototype.updateJSON =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.NormalService/UpdateJSON',
      request,
      metadata || {},
      methodInfo_NormalService_UpdateJSON,
      callback);
};


/**
 * @param {!proto.pb.NormalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.CommonResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.NormalServicePromiseClient.prototype.updateJSON =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.NormalService/UpdateJSON',
      request,
      metadata || {},
      methodInfo_NormalService_UpdateJSON);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.NormalRequest,
 *   !proto.pb.NormalResponse>}
 */
const methodInfo_NormalService_GetSchema = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.NormalResponse,
  /** @param {!proto.pb.NormalRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.NormalResponse.deserializeBinary
);


/**
 * @param {!proto.pb.NormalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.NormalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.NormalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.NormalServiceClient.prototype.getSchema =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.NormalService/GetSchema',
      request,
      metadata || {},
      methodInfo_NormalService_GetSchema,
      callback);
};


/**
 * @param {!proto.pb.NormalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.NormalResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.NormalServicePromiseClient.prototype.getSchema =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.NormalService/GetSchema',
      request,
      metadata || {},
      methodInfo_NormalService_GetSchema);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.PageRequest,
 *   !proto.pb.NormalResponse>}
 */
const methodInfo_NormalService_GetPageList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.NormalResponse,
  /** @param {!proto.pb.PageRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.NormalResponse.deserializeBinary
);


/**
 * @param {!proto.pb.PageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.NormalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.NormalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.NormalServiceClient.prototype.getPageList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.NormalService/GetPageList',
      request,
      metadata || {},
      methodInfo_NormalService_GetPageList,
      callback);
};


/**
 * @param {!proto.pb.PageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.NormalResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.NormalServicePromiseClient.prototype.getPageList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.NormalService/GetPageList',
      request,
      metadata || {},
      methodInfo_NormalService_GetPageList);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.NormalRequest,
 *   !proto.pb.NormalResponse>}
 */
const methodInfo_NormalService_GetIndexList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.NormalResponse,
  /** @param {!proto.pb.NormalRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.NormalResponse.deserializeBinary
);


/**
 * @param {!proto.pb.NormalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.NormalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.NormalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.NormalServiceClient.prototype.getIndexList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.NormalService/GetIndexList',
      request,
      metadata || {},
      methodInfo_NormalService_GetIndexList,
      callback);
};


/**
 * @param {!proto.pb.NormalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.NormalResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.NormalServicePromiseClient.prototype.getIndexList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.NormalService/GetIndexList',
      request,
      metadata || {},
      methodInfo_NormalService_GetIndexList);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.UpdateRequest,
 *   !proto.pb.NormalResponse>}
 */
const methodInfo_NormalService_UpdateList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.NormalResponse,
  /** @param {!proto.pb.UpdateRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.NormalResponse.deserializeBinary
);


/**
 * @param {!proto.pb.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.NormalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.NormalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.NormalServiceClient.prototype.updateList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.NormalService/UpdateList',
      request,
      metadata || {},
      methodInfo_NormalService_UpdateList,
      callback);
};


/**
 * @param {!proto.pb.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.NormalResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.NormalServicePromiseClient.prototype.updateList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.NormalService/UpdateList',
      request,
      metadata || {},
      methodInfo_NormalService_UpdateList);
};


module.exports = proto.pb;

