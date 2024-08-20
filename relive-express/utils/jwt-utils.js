const jwt = require('jsonwebtoken');
const secretKey = 'antwanSahthtoot_Relive'; // Replace with your own secret key

const generateToken = (payload) => {
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const validateToken = (req, res, next) => {
    // console.log("vals", req, res, res.headers)
    const authHeader = req.headers.authorization;
    // console.log("authHeader", authHeader)
    if (authHeader) {
      const token = authHeader.split(' ')[1].slice(1,-1); // Bearer <token> // the slice removes the "" marks
    //   console.log("token", token)

      jwt.verify(token, secretKey, (err, payload) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: 'Invalid token',
          });
        } else {
          req.user = payload;
          next();
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Token is not provided',
      });
    }
  };

module.exports = {
  generateToken, 
  validateToken,
};