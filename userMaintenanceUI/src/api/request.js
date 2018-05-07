import httpinvoke from 'httpinvoke';

// Errors
// //////

/**
 * Lowest-level error.
 * Based upon: http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax
 */
export class RequestError extends Error {
  constructor (message, body, originalError) {
    super(message || 'An error occurred while processing your request.');
    this.name = this.constructor.name;
    this.stack = (originalError || new Error()).stack;
    this.body = body;
    this.originalError = originalError;
  }
}

/**
 * Constructs a network error wrapper.
 */
export class NetworkError extends RequestError {
  constructor (originalError) {
    super('Network error. Please check your internet connection.', null, originalError);
  }
}

/**
 * Constructs a Unauthorized error wrapper.
 */
export class UnauthorizedError extends RequestError {
  constructor (body) {
    super('Unauthorized. Authentication required.', body, null);
    this.statusCode = 401;
  }
}

/**
 * Constructs a Conflict error wrapper.
 */
export class ConflictError extends RequestError {
  constructor (message, body) {
    super('Request occured a conflict.', body, null);
    this.statusCode = 409;
    this.name = 'ConflictError';
  }
}

/**
 * Constructs a Bad Request error wrapper.
 */
export class BadRequestError extends RequestError {
  constructor (body) {
    super('Invalid request.', body, null);
    this.statusCode = 400;
  }
}

/**
 * Constructs a Not Found error wrapper.
 */
export class NotFoundError extends RequestError {
  constructor (message, body) {
    super('Could not find the requested resource.', body, null);
    this.statusCode = 404;
  }
}

/**
 * Constructs a Unexpected error wrapper.
 */
export class UnexpectedError extends RequestError {
  constructor (message, body, originalError) {
    super(message || (originalError && originalError.message) || 'An unexpected error occurred while processing your request.', body, originalError);
  }
}

// httpinvoke, our father
// ----------------------

export function tryToParseJson (text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}

// Hooking a finished hook into httpinvoke creates a new httpinvoke. The given callback is executed
// upon each processed request. The callback has the power to manipulate the arguments seen by the
// rest of the appication.
const hookedHttpinvoke = httpinvoke.hook('finished', (err, output, statusCode, headers) => {
  // httpinvoke failed?
  if (err) {
    // Was there a network error?
    if (typeof err === 'object' && err.message === 'network error') {
      return [ new NetworkError(err), output, statusCode, headers ];
    }
    // We do not know the exact reason, throw a general error
    return [ new UnexpectedError(null, null, err), output, statusCode, headers ];
  }
  // Convert 400's and 500's to error
  if (statusCode >= 400 && statusCode <= 599) {
    let responseError;
    // Try parse body text as JSON, but don't fail if we do not succeed.
    const newOutput = tryToParseJson(output);
    // Construct correct low-level error
    switch (statusCode) {
      case 400:
        responseError = new BadRequestError(newOutput); break;
      case 401:
        // Login failed.
        if (newOutput.code === 'SEC-001') {
          responseError = new UnauthorizedError(newOutput);
          break;
        }
        // We received 403 Forbidden. We are not authorized. This can be due to an invalid
        // expired authentication token. We do a hard reload of the application, which will
        // redirect us to login. Ugly, but effective!
        window.localStorage.removeItem('session');
        return window.location.reload();
      case 403:
        // We received 403 Forbidden. We are not authorized. This can be due to an invalid
        // expired authentication token. We do a hard reload of the application, which will
        // redirect us to login. Ugly, but effective!
        window.localStorage.removeItem('session');
        return window.location.reload();
      case 404:
        responseError = new NotFoundError(newOutput); break;
      case 409:
        responseError = new ConflictError(null, newOutput); break;
      default:
        responseError = new UnexpectedError(null, newOutput);
    }
    return [ responseError, newOutput, statusCode, headers ];
  }
  return [ null, tryToParseJson(output), statusCode, headers ];
});

const CONVERTERS = {
  'json text': JSON.stringify,
  'text json': (identity) => identity
};

function optionsWithoutBody (authenticationToken, options) {
  return {
    converters: CONVERTERS,
    headers: { // Request headers
      Authorization: authenticationToken,
      'Cache-Control': 'no-cache'
    },
    outputType: (options && options.outputType) ? options.outputType : 'json'
  };
}

function optionsWithBody (authenticationToken, body, options) {
  return {
    converters: CONVERTERS,
    headers: { // Request headers
      Authorization: authenticationToken,
      'Content-Type': (options && options.contentType) ? options.contentType : 'application/json',
      'Cache-Control': 'no-cache'
    },
    input: body || {},
    inputType: 'json', // Type of request data
    outputType: (options && options.outputType) ? options.outputType : 'json'
  };
}

// Public functions
// ----------------

export function get (authenticationToken, url, options) {
  return hookedHttpinvoke(url, 'GET', optionsWithoutBody(authenticationToken, options));
}

export function post (authenticationToken, url, body, options) {
  return hookedHttpinvoke(url, 'POST', optionsWithBody(authenticationToken, body, options));
}

export function put (authenticationToken, url, body) {
  return hookedHttpinvoke(url, 'PUT', optionsWithBody(authenticationToken, body));
}

export function del (authenticationToken, url, options) {
  return hookedHttpinvoke(url, 'DELETE', optionsWithoutBody(authenticationToken, options));
}

export function delWithBody (authenticationToken, url, options) {
  return hookedHttpinvoke(url, 'DELETE', optionsWithBody(authenticationToken, undefined, options));
}

export function patch (authenticationToken, url, options) {
  return hookedHttpinvoke(url, 'PATCH', optionsWithoutBody(authenticationToken, options));
}
