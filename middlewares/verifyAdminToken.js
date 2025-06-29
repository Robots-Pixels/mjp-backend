import jwt from 'jsonwebtoken';

export const verifyAdminToken = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: false, message: "Accès non autorisé." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ status: false, message: "Token invalide ou expiré." });
  }
};

