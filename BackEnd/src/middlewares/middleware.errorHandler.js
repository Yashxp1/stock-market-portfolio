const errorHandler = (err, req, res, next) => {
  console.error("errorHanlder",err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
};

export default errorHandler;
