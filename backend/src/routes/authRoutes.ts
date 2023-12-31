/* Routes for user authentication */
import express from 'express';
import AuthController from '../controllers/authController';
import rateLimit from 'express-rate-limit';
import { AUTH_RESPONSES } from '../config/constants';
import EnvConfig from '../config/envConfig';
import logger from '../logging/logger';

/* Initialize router middleware to parse incoming requests */
const router = express.Router();

/* Fixed window rate limit based on user id */
// const loginRateLimiter = rateLimit({
//   windowMs: AUTH_RATE_LIMITS.LOGIN_RATE_LIMIT_WINDOW, 
//   max: AUTH_RATE_LIMITS.LOGIN_RATE_LIMIT_THRESHOLD,
//   keyGenerator: (req) => {
//     return req.body.userId ? req.body.userId : 'unknown-user';
//   },
//   handler: (req, res) => {
//     res.status(429).json({
//       message: AUTH_RESPONSES_400._429_USER_ID_RATE_LIMIT_EXCEEDED
//     });
//   }
// });

/* Create env config instance */
const envConfig = new EnvConfig();

/* Rate limit for register API */
const rateLimitRegister = rateLimit({
  windowMs: envConfig.getConfigNumber('RATE_LIMITING.AUTH.REGISTER.WINDOW'), 
  max: envConfig.getConfigNumber('RATE_LIMITING.AUTH.REGISTER.THRESHOLD'), 
  handler: (req, res) => {
    logger.info(`The register rate limit has been reached for IP ${req.socket.remoteAddress}`);
    res.status(429).json({
      message: AUTH_RESPONSES._429_RATE_LIMIT_EXCEEDED
    });
  }
});

/* Rate limit for login API */
const rateLimitLogin = rateLimit({
  windowMs: envConfig.getConfigNumber('RATE_LIMITING.AUTH.LOGIN.WINDOW'), 
  max: envConfig.getConfigNumber('RATE_LIMITING.AUTH.LOGIN.THRESHOLD'), 
  handler: (req, res) => {
    logger.info(`The login rate limit has been reached for IP ${req.socket.remoteAddress}`);
    res.status(429).json({
      message: AUTH_RESPONSES._429_RATE_LIMIT_EXCEEDED
    });
  }
});

/* Register route */
router.post('/register', rateLimitRegister, AuthController.register);

/* Login route */
router.post('/login', rateLimitLogin, AuthController.login);

/* Export router */
export default router;
