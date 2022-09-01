import axios from 'axios';
import * as jose from 'jose';

export async function validateJwtToken(
  token: string,
): Promise<jose.JWTVerifyResult> {
  const { kid } = jose.decodeProtectedHeader(token);

  const response = await axios
    .get(process.env.FIREBASE_PUBLIC_KEY_URL, {
      headers: {
        'Cache-Control': 'max-age=60',
      },
    })
    .catch((reason) => reason.response);

  const x509 = response.data[kid];

  if (!x509) {
    throw new Error('Google auth server error');
  }

  const algorithm = 'HS256';
  const ecPublicKey = await jose.importX509(x509, algorithm);

  return jose.jwtVerify(token, ecPublicKey, {
    issuer: process.env.FIREBASE_AUTH_ISSUER,
    audience: process.env.FIREBASE_AUTH_AUDIENCE,
    currentDate: new Date(),
  });
}

export async function parseJwtToken(
  token: string,
): Promise<{ payload: jose.JWTPayload }> {
  return { payload: jose.decodeJwt(token) };
}
