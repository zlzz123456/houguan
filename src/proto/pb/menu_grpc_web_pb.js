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
proto.pb = require('./menu_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pb.MenuServiceClient =
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
proto.pb.MenuServicePromiseClient =
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
 *   !proto.pb.MenuRequest,
 *   !proto.pb.MenuResponse>}
 */
const methodInfo_MenuService_getMenu = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.MenuResponse,
  /** @param {!proto.pb.MenuRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.MenuResponse.deserializeBinary
);


/**
 * @param {!proto.pb.MenuRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.MenuResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.MenuResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.MenuServiceClient.prototype.getMenu =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.MenuService/getMenu',
      request,
      metadata || {},
      methodInfo_MenuService_getMenu,
      callback);
};


/**
 * @param {!proto.pb.MenuRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.MenuResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.MenuServicePromiseClient.prototype.getMenu =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.MenuService/getMenu',
      request,
      metadata || {},
      methodInfo_MenuService_getMenu);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.CommonRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_MenuService_verifyMenu = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.CommonResponse,
  /** @param {!proto.pb.CommonRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.CommonResponse.deserializeBinary
);


/**
 * @param {!proto.pb.CommonRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.CommonResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CommonResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.MenuServiceClient.prototype.verifyMenu =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.MenuService/verifyMenu',
      request,
      metadata || {},
      methodInfo_MenuService_verifyMenu,
      callback);
};


/**
 * @param {!proto.pb.CommonRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.CommonResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.MenuServicePromiseClient.prototype.verifyMenu =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.MenuService/verifyMenu',
      request,
      metadata || {},
      methodInfo_MenuService_verifyMenu);
};


module.exports = proto.pb;

