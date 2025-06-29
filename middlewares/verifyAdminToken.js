import jwt from 'jsonwebtoken';

export const verifyAdminToken = (req, res, next) => {
  const token = req.body.token || req.query.token;

  if (!token) {
    return res.status(403).json({ status: false, message: 'Token requis.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Token invalide.' });
  }
};
