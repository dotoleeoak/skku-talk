import { SignJWT, jwtVerify } from 'jose'

const secret = process.env.JWT_SECRET ?? 'jwt-secret'

const sign = (username: string) => {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(secret))
}

const verify = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    return payload
  } catch (e) {
    console.error(e)
    return null
  }
}

export { sign, verify }
