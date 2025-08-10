// const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

//     if (!token) {
//       return res.status(401).json({ error: true, message: "Access token missing" });
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         console.error("Token verification failed:", err.message);
//         return res.status(403).json({ error: true, message: "Invalid or expired token" });
//       }

//       req.user = decoded.user; // Attach user payload (from token) to request
//       next(); // Proceed to next middleware or route
//     });
//   } catch (error) {
//     console.error("Auth Middleware Error:", error);
//     return res.status(500).json({ error: true, message: "Internal server error" });
//   }
// }

// module.exports = {
//   authenticateToken,
// };
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

    if (!token) {
      return res.status(401).json({ error: true, message: "Access token missing" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        return res.status(403).json({ error: true, message: "Invalid or expired token" });
      }

      // 🔹 Flatten user payload so all routes get same format
      req.user = decoded.user || decoded;

      next(); // Proceed to next middleware or route
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

module.exports = {
  authenticateToken,
};







