export const error = (statusCode, message, res) => {
  error.statusCode = statusCode;
  res.status(statusCode).json({ success: false, message });
  return error;
};
