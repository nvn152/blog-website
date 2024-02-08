// const errorHandler = (err, req, res, next) => {
//   console.log("Reached error handler");
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";

//   res.staus(statusCode).json({ success: false, message });
// };

// export default errorHandler;

// Define error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: {
      success: false,
      message: err.message || "Internal Server Error",
      err: err.stack,
    },
  });
}

// Export the error handling middleware function
export default errorHandler;
