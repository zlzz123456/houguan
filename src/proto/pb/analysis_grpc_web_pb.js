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
proto.pb = require('./analysis_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pb.AnalysisServiceClient =
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
proto.pb.AnalysisServicePromiseClient =
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
 *   !proto.pb.AnalysisRequest,
 *   !proto.pb.AnalysisResponse>}
 */
const methodInfo_AnalysisService_RequestQry = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.AnalysisResponse,
  /** @param {!proto.pb.AnalysisRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.AnalysisResponse.deserializeBinary
);


/**
 * @param {!proto.pb.AnalysisRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.AnalysisResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.AnalysisResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AnalysisServiceClient.prototype.requestQry =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AnalysisService/RequestQry',
      request,
      metadata || {},
      methodInfo_AnalysisService_RequestQry,
      callback);
};


/**
 * @param {!proto.pb.AnalysisRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.AnalysisResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AnalysisServicePromiseClient.prototype.requestQry =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AnalysisService/RequestQry',
      request,
      metadata || {},
      methodInfo_AnalysisService_RequestQry);
};


module.exports = proto.pb;

