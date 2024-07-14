import createHttpError from 'http-errors'; 
import User from '../db/models/User.js'; 
import { Session } from '../db/models/Session.js'; 

 
export const authenticate = async (req, res, next) => { 
  const authHeader = req.headers['authorization']; 
 
  if (!authHeader) { 
    next(createHttpError(401, 'Please provide Authorization header')); 
    return; 
  } 
 
  const bearer = authHeader.split(' ')[0]; 
  const token = authHeader && authHeader.split(' ')[1]; 
 
  // Перевіряємо чи токен існує 
  if (bearer !== 'Bearer' || !token) { 
    return next( 
      createHttpError( 
        401, 
        'There is no access token or the authentication header must be of type Bearer.', 
      ), 
    ); 
  } 
 
  const session = await Session.findOne({ accessToken: token }); 
  if (!session) { 
    next(createHttpError(401, 'Session not found')); 
    return; 
  } 
 
  const isAccessTokenExpired = 
    new Date() > new Date(session.accessTokenValidUntil); 
  if (isAccessTokenExpired) { 
    next(createHttpError(401, 'Access token expired')); 
  } 
 
  const user = await User.findById(session.userId); 
 
  if (!user) { 
    next( 
      createHttpError(401, 'User associated with this session is not found'), 
    ); 
    return; 
  } 
  req.user = user; 
  next(); 
}; 
 
