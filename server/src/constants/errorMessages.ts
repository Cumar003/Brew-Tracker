export const ERROR_MESSAGES = {
  USER_NOT_FOUND: {
    message: "User account not found. Please verify your email or register.",
    statusCode: 404,
    errorCode: "USER_001",
    userFriendlyMessage:
      "We couldn't find your account. Please check your email or sign up.",
  },
  INVALID_CREDENTIALS: {
    message: "Invalid email or password. Please try again.",
    statusCode: 401,
    errorCode: "AUTH_002",
    userFriendlyMessage:
      "Your email or password is incorrect. Try again or reset your password.",
  },
  OTP_EXPIRED: {
    message: "The OTP has expired. Please request a new one.",
    statusCode: 400,
    errorCode: "AUTH_003",
    userFriendlyMessage:
      "Your OTP is no longer valid. Please request a new one.",
  },
  OTP_NOT_FOUND: {
    message: "OTP not found. Please check your inbox or request a new one.",
    statusCode: 404,
    errorCode: "AUTH_004",
    userFriendlyMessage:
      "We couldn't find your OTP. Check your inbox or request a new one.",
  },
  INVALID_OTP: {
    message: "Invalid OTP. Please try again.",
    statusCode: 400,
    errorCode: "AUTH_005",
    userFriendlyMessage: "The OTP entered is incorrect. Please try again.",
  },
  EMAIL_EXISTS: {
    message: "This email is already registered.",
    statusCode: 409,
    errorCode: "USER_002",
    userFriendlyMessage:
      "An account with this email already exists. Please log in or use a different email.",
  },
  USERNAME_EXISTS: {
    message: "This username is already taken.",
    statusCode: 409,
    errorCode: "USER_003",
    userFriendlyMessage:
      "That username is already in use. Please choose a different one.",
  },
  EMAIL_NOT_VERIFIED: {
    message: "Email verification required.",
    statusCode: 403,
    errorCode: "AUTH_006",
    userFriendlyMessage: "Please verify your email before proceeding.",
  },
  EMAIL_ALREADY_VERIFIED: {
    message: "Email is already verified.",
    statusCode: 409,
    errorCode: "AUTH_007",
    userFriendlyMessage:
      "Your email has already been verified. You can log in now.",
  },
  SERVER_ERROR: {
    message: "An internal server error occurred.",
    statusCode: 500,
    errorCode: "SERVER_001",
    userFriendlyMessage: "Something went wrong. Please try again later.",
  },
  DB_CONNECTION_FAILED: {
    message: "Database connection failed.",
    statusCode: 500,
    errorCode: "DB_001",
    userFriendlyMessage:
      "We're experiencing database issues. Please try again later.",
  },
  DB_QUERY_FAILED: {
    message: "Database query error.",
    statusCode: 500,
    errorCode: "DB_002",
    userFriendlyMessage:
      "An error occurred while processing your request. Please try again.",
  },
  DB_FAILED_LOG: {
    message: "Database failed to log.",
    statusCode: 500,
    errorCode: "DB_003",
    userFriendlyMessage: "An error occurred.",
  },
  EMAIL_SENDING_FAILED: {
    message: "Failed to send email.",
    statusCode: 500,
    errorCode: "EMAIL_001",
    userFriendlyMessage: "Unable to send the email. Please try again later.",
  },
  TEMPLATE_READ_ERROR: {
    message: "Error reading email template.",
    statusCode: 500,
    errorCode: "EMAIL_002",
    userFriendlyMessage:
      "We encountered an issue with the email template. Please try again later.",
  },
  JWT_TOKEN_MISSING: {
    message: "Authorization token missing.",
    statusCode: 401,
    errorCode: "JWT_001",
    userFriendlyMessage: "Please log in to continue.",
  },
  JWT_INVALID_TOKEN: {
    message: "Invalid authentication token.",
    statusCode: 401,
    errorCode: "JWT_002",
    userFriendlyMessage: "Your session is invalid. Please log in again.",
  },
  JWT_EXPIRED_TOKEN: {
    message: "Authentication token has expired.",
    statusCode: 401,
    errorCode: "JWT_003",
    userFriendlyMessage: "Your session has expired. Please log in again.",
  },
  JWT_REFRESH_TOKEN_EXPIRED: {
    message: "Refresh token has expired.",
    statusCode: 403,
    errorCode: "JWT_015",
    userFriendlyMessage: "Your session has expired. Please log in again.",
  },
  JWT_REFRESH_TOKEN_INVALID: {
    message: "Invalid or revoked refresh token.",
    statusCode: 403,
    errorCode: "JWT_016",
    userFriendlyMessage: "Session refresh failed. Please log in again.",
  },
  JWT_MALFORMED_TOKEN: {
    message: "JWT token is malformed.",
    statusCode: 400,
    errorCode: "JWT_017",
    userFriendlyMessage:
      "There was an issue with your authentication token. Please log in again.",
  },
  JWT_TOKEN_REFRESH_FAILED: {
    message: "Failed to refresh JWT token.",
    statusCode: 401,
    errorCode: "JWT_018",
    userFriendlyMessage:
      "Your session has expired. Please log in again to continue.",
  },
  INVALID_ENCRYPTED_TOKEN: {
    message: "Invalid or corrupted encrypted token.",
    statusCode: 401,
    errorCode: "JWT_018",
    userFriendlyMessage:
      "Your session has expired or is invalid. Please log in again to continue.",
  },
  UNAUTHORIZED_ACCESS: {
    message: "User authentication required.",
    statusCode: 401,
    errorCode: "AUTH_001",
    userFriendlyMessage: "You must be logged in to access this resource.",
  },
  FORBIDDEN_ACCESS: {
    message: "You do not have permission to access this resource.",
    statusCode: 403,
    errorCode: "AUTH_002",
    userFriendlyMessage: "Access denied. You do not have admin privileges.",
  },
};
