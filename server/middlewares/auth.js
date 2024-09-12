import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Add the user info to the request object
    req.body.userId = decoded.userId

    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

export default authMiddleware