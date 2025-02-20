import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // # of allowed requests per windowMs
  message: { message: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false
});

const validateApiKey = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Unauthorized: Missing authorization header'
    });
  }

  // Check if it follows Bearer scheme
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Unauthorized: Invalid authorization format'
    });
  }

  if (token !== process.env.API_KEY) {
    return res.status(403).json({
      message: 'Forbidden: Invalid API key'
    });
  }

  next();
};

// Combine rate limiting with API key validation
export const apiKeyMiddleware = [authLimiter, validateApiKey];
