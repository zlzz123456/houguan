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
proto.pb = require('./auth_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.pb.AuthServiceClient =
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
proto.pb.AuthServicePromiseClient =
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
 *   !proto.pb.LoginRequest,
 *   !proto.pb.LoginResponse>}
 */
const methodInfo_AuthService_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.LoginResponse,
  /** @param {!proto.pb.LoginRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.pb.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AuthServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AuthService/Login',
      request,
      metadata || {},
      methodInfo_AuthService_Login,
      callback);
};


/**
 * @param {!proto.pb.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.LoginResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AuthServicePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AuthService/Login',
      request,
      metadata || {},
      methodInfo_AuthService_Login);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.CommonRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_AuthService_Logout = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.pb.AuthServiceClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AuthService/Logout',
      request,
      metadata || {},
      methodInfo_AuthService_Logout,
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
proto.pb.AuthServicePromiseClient.prototype.logout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AuthService/Logout',
      request,
      metadata || {},
      methodInfo_AuthService_Logout);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.RegisterRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_AuthService_Register = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.CommonResponse,
  /** @param {!proto.pb.RegisterRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.CommonResponse.deserializeBinary
);


/**
 * @param {!proto.pb.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.CommonResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CommonResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AuthServiceClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AuthService/Register',
      request,
      metadata || {},
      methodInfo_AuthService_Register,
      callback);
};


/**
 * @param {!proto.pb.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.CommonResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AuthServicePromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AuthService/Register',
      request,
      metadata || {},
      methodInfo_AuthService_Register);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.ForgotPasswordRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_AuthService_ForgotPassword = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.CommonResponse,
  /** @param {!proto.pb.ForgotPasswordRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.CommonResponse.deserializeBinary
);


/**
 * @param {!proto.pb.ForgotPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.CommonResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CommonResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AuthServiceClient.prototype.forgotPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AuthService/ForgotPassword',
      request,
      metadata || {},
      methodInfo_AuthService_ForgotPassword,
      callback);
};


/**
 * @param {!proto.pb.ForgotPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.CommonResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AuthServicePromiseClient.prototype.forgotPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AuthService/ForgotPassword',
      request,
      metadata || {},
      methodInfo_AuthService_ForgotPassword);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.ModifyPasswordRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_AuthService_ModifyPassword = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.CommonResponse,
  /** @param {!proto.pb.ModifyPasswordRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.CommonResponse.deserializeBinary
);


/**
 * @param {!proto.pb.ModifyPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.CommonResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CommonResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AuthServiceClient.prototype.modifyPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AuthService/ModifyPassword',
      request,
      metadata || {},
      methodInfo_AuthService_ModifyPassword,
      callback);
};


/**
 * @param {!proto.pb.ModifyPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.CommonResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AuthServicePromiseClient.prototype.modifyPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AuthService/ModifyPassword',
      request,
      metadata || {},
      methodInfo_AuthService_ModifyPassword);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.GetCaptchaRequest,
 *   !proto.pb.GetCaptchaResponse>}
 */
const methodInfo_AuthService_GetCaptcha = new grpc.web.AbstractClientBase.MethodInfo(
  proto.pb.GetCaptchaResponse,
  /** @param {!proto.pb.GetCaptchaRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.pb.GetCaptchaResponse.deserializeBinary
);


/**
 * @param {!proto.pb.GetCaptchaRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.GetCaptchaResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.GetCaptchaResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AuthServiceClient.prototype.getCaptcha =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AuthService/GetCaptcha',
      request,
      metadata || {},
      methodInfo_AuthService_GetCaptcha,
      callback);
};


/**
 * @param {!proto.pb.GetCaptchaRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.GetCaptchaResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AuthServicePromiseClient.prototype.getCaptcha =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AuthService/GetCaptcha',
      request,
      metadata || {},
      methodInfo_AuthService_GetCaptcha);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.pb.SetPasswordRequest,
 *   !proto.pb.CommonResponse>}
 */
const methodInfo_AuthService_SetPassword = new grpc.web.AbstractClientBase.MethodInfo(
  common_pb.CommonResponse,
  /** @param {!proto.pb.SetPasswordRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  common_pb.CommonResponse.deserializeBinary
);


/**
 * @param {!proto.pb.SetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.pb.CommonResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pb.CommonResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pb.AuthServiceClient.prototype.setPassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pb.AuthService/SetPassword',
      request,
      metadata || {},
      methodInfo_AuthService_SetPassword,
      callback);
};


/**
 * @param {!proto.pb.SetPasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pb.CommonResponse>}
 *     A native promise that resolves to the response
 */
proto.pb.AuthServicePromiseClient.prototype.setPassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pb.AuthService/SetPassword',
      request,
      metadata || {},
      methodInfo_AuthService_SetPassword);
};


module.exports = proto.pb;

