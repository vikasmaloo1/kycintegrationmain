// Status Codes
const CODES = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500
  };
  
  // Error Messages
  const MESSAGES = {
    KYC_API: {
      NOT_FOUND: 'KYC API not found.',
      DELETED: 'KYC API deleted successfully.',
      UPDATED: 'KYC API updated successfully.',
      CREATED: 'KYC API created successfully.'
    },
    KYC_SERVICE: {
      NOT_FOUND: 'KYC Service not found.',
      DELETED: 'KYC Service deleted successfully.',
      UPDATED: 'KYC Service updated successfully.',
      CREATED: 'KYC Service created successfully.'
    },
    JOURNEY_TABLE: {
      NOT_FOUND: 'Journey Table not found.',
      DELETED: 'Journey Table deleted successfully.',
      UPDATED: 'Journey Table updated successfully.',
      CREATED: 'Journey Table created successfully.'
    },
    USER_JOURNEY: {
      NOT_FOUND: 'User Journey not found.',
      DELETED: 'User Journey deleted successfully.',
      UPDATED: 'User Journey updated successfully.',
      CREATED: 'User Journey created successfully.'
    },
    KYC_REQUESTS: {
      NOT_FOUND: 'KYC Request not found.',
      DELETED: 'KYC Request deleted successfully.',
      UPDATED: 'KYC Request updated successfully.',
      CREATED: 'KYC Request created successfully.'
    },
    VALIDATION: {
      FAILED: 'Validation failed.',
      REQUIRED_FIELD: 'Field is required.',
      INVALID_FORMAT: 'Invalid format.',
      MIN_LENGTH: 'Minimum length is {min}.',
      MAX_LENGTH: 'Maximum length is {max}.'
    }
  };
  
  module.exports = {
    CODES,
    MESSAGES
  };
  