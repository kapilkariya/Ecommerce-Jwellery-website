import jwt from 'jsonwebtoken';

const authuser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error.message);
    // Return 401 so the frontend axios interceptor can auto-logout
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
  }
};

export default authuser;