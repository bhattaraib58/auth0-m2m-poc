/**
 * Handle error responses and log useful debugging information.
 *
 * @param {*} error
 * @returns
 */
export function generateErrorHelper(error) {
  let errorResponse = error?.response || error;
  const status = errorResponse.status;
  const url = error?.config?.url || error?.response?.config?.url;

  // Handle arraybuffer response (e.g., file download errors)
  if (error?.response?.config?.responseType === "arraybuffer") {
    try {
      const decodedString = String.fromCharCode.apply(
        null,
        new Uint8Array(error?.response?.data)
      );

      errorResponse.data = JSON.parse(decodedString);
    } catch {
      // Parsing failed; leave data as-is
    }
  }

  errorResponse = errorResponse?.data || error;

  let errorInfo = {
    errors: errorResponse,
    originalResponse: error,
    status,
    url,
  };

  // Standardize the error message structure
  if (errorResponse?.data?.message) {
    errorInfo = {
      ...errorInfo,
      errors: {
        message: errorResponse.data.message,
        errorCode: errorResponse.data.errorCode,
      },
    };
  } else if (errorResponse?.data?.error?.message) {
    errorInfo = {
      ...errorInfo,
      errors: {
        message: errorResponse.data.error.message,
        errorCode: errorResponse.data.error.errorCode,
      },
    };
  } else if (errorResponse?.message) {
    errorInfo = {
      ...errorInfo,
      errors: {
        message: errorResponse.message,
        errorCode: errorResponse.errorCode,
      },
    };
  } else if (errorResponse?.statusText) {
    errorInfo = {
      ...errorInfo,
      errors: {
        message: errorResponse.statusText,
        errorCode: errorResponse.errorCode,
      },
    };
  }

  throw errorInfo;
}
