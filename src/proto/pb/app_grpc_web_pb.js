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
proto.pb = require('./app_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pb.AppServiceClient =
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
proto.pb.AppServicePromiseClient =
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
 *   !proto.pb.CommonRequest,
 *   !proto.pb.GetAppListResponse>}
 */
const methodInfo_AppService_GetAppList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.GetAppListResponse,
  /** @param {!proto.pb.CommonRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.GetAppListResponse.deserializeBinary
);


/**
 * @param {!proto.pb.CommonRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.GetAppListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.GetAppListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AppServiceClient.prototype.getAppList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AppService/GetAppList',
      request,
      metadata || {},
      methodInfo_AppService_GetAppList,
      callback);
};


/**
 * @param {!proto.pb.CommonRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.GetAppListResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AppServicePromiseClient.prototype.getAppList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AppService/GetAppList',
      request,
      metadata || {},
      methodInfo_AppService_GetAppList);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.AppRequest,
 *   !proto.pb.GetAppListResponse>}
 */
const methodInfo_AppService_GetApp = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.GetAppListResponse,
  /** @param {!proto.pb.AppRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.GetAppListResponse.deserializeBinary
);


/**
 * @param {!proto.pb.AppRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.GetAppListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.GetAppListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AppServiceClient.prototype.getApp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AppService/GetApp',
      request,
      metadata || {},
      methodInfo_AppService_GetApp,
      callback);
};


/**
 * @param {!proto.pb.AppRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.GetAppListResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AppServicePromiseClient.prototype.getApp =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AppService/GetApp',
      request,
      metadata || {},
      methodInfo_AppService_GetApp);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.AppRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_AppService_AddApp = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.CommonResponse,
  /** @param {!proto.pb.AppRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.CommonResponse.deserializeBinary
);


/**
 * @param {!proto.pb.AppRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.CommonResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CommonResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AppServiceClient.prototype.addApp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AppService/AddApp',
      request,
      metadata || {},
      methodInfo_AppService_AddApp,
      callback);
};


/**
 * @param {!proto.pb.AppRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.CommonResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AppServicePromiseClient.prototype.addApp =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AppService/AddApp',
      request,
      metadata || {},
      methodInfo_AppService_AddApp);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.AppRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_AppService_EditApp = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.CommonResponse,
  /** @param {!proto.pb.AppRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.CommonResponse.deserializeBinary
);


/**
 * @param {!proto.pb.AppRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.CommonResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CommonResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AppServiceClient.prototype.editApp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AppService/EditApp',
      request,
      metadata || {},
      methodInfo_AppService_EditApp,
      callback);
};


/**
 * @param {!proto.pb.AppRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.CommonResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AppServicePromiseClient.prototype.editApp =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AppService/EditApp',
      request,
      metadata || {},
      methodInfo_AppService_EditApp);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.AppRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_AppService_DelApp = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.CommonResponse,
  /** @param {!proto.pb.AppRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.CommonResponse.deserializeBinary
);


/**
 * @param {!proto.pb.AppRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.CommonResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CommonResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AppServiceClient.prototype.delApp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AppService/DelApp',
      request,
      metadata || {},
      methodInfo_AppService_DelApp,
      callback);
};


/**
 * @param {!proto.pb.AppRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.CommonResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AppServicePromiseClient.prototype.delApp =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AppService/DelApp',
      request,
      metadata || {},
      methodInfo_AppService_DelApp);
};


module.exports = proto.pb;

