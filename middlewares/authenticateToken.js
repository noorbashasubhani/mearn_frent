const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Log the Authorization header to see if it's being passed correctly
  //console.log("Authorization Header:", req.headers['authorization']);

  const token = req.headers['authorization']?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }
  // Log the token extracted from the header to see if it's correct
  //console.log("Extracted Token:", token);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      //console.log("Token verification failed:", err); // Log the error details for debugging
      return res.status(403).json({ message: "Invalid or expired token!" });
    }
    // Log the decoded token (payload)
    //console.log("Decoded Token:", decoded);
    // Attach the decoded user information to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
