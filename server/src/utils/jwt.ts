import jwt, { JwtPayload } from 'jsonwebtoken'

const SECRET = '5b7b532428e8a122e989fad2f032a235'

export const generateToken = (payload: any) => {
  return jwt.sign(payload, SECRET, { expiresIn: '24h' })
}

export const verifyToken = (token: string): JwtPayload & { id: string } => {
  const decoded = jwt.verify(token, SECRET as string) as JwtPayload

  if (!decoded || !(decoded as JwtPayload).id) {
    throw new Error('Invalid token payload')
  }

  return decoded as JwtPayload & { id: string }
}
