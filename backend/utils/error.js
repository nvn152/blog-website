export const error = (statusCode, message, res) => {
  const error = new Error(message); // remove this later
  error.statusCode = statusCode;
  res.status(statusCode).json({ success: false, message });
  return error;
};
