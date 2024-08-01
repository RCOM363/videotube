//higher order func that is used to wrap the async func

// using promise

// 4 parameters are - err,req,res,next(flag passed to next middleware)

const asyncHandler = (requestHandler) => {
  //returning func
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = () => {};
// const asyncHandler = (func) => {()=>{}};
// const asyncHandler = (func) => async () => {};

//using try & catch
/*
  const asyncHandler = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
  */
