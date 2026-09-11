import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET is not defined");
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function createToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, encodedKey);

  return payload;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);

    return payload;
  } catch (error) {
    return null;
  }
}
