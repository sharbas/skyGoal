import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userAuthCheck = async (req, res, next) => {
  // Retrieve the userToken from the "Authorization" header
  const userToken = req.headers.authorization;


  if (userToken) {
    try {


      // Remove the "Bearer " prefix from the userToken (if present)
      const tokenWithoutBearer = userToken.replace("Bearer ", "");

      // Verify the userToken
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

      // Fetch user details and attach to the request
      req.user = await User.findById(decoded.userId).select('-password');
console.log(req.user,'this is user info in authcheck');
      next();


    } catch (error) {
      console.error(error);
      // Define the error as an object with a message property
      const customError = { message: 'Authentication failed' };
      res.status(401).json(customError);
    }
  } else {
    // Define the error as an object with a message property
    const customError = { message: 'No token provided' };
    res.status(401).json(customError);
  }
};

export default userAuthCheck;
