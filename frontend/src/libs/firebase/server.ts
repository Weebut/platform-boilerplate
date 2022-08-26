import { production } from '@libs/constants/node';
import { config } from 'dotenv';
import { credential } from 'firebase-admin';
import { getApp, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

config();

export function getFirebaseApp() {
  try {
    const found = getApp();
    return found;
  } catch (err) {
    if (process.env.NODE_ENV === production) {
      const serviceAccount = JSON.parse(
        JSON.stringify({
          type: 'service_account',
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY,
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: 'https: //accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url:
            'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
        }),
      );
      return initializeApp({
        credential: credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    } else {
      return initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
    }
  }
}

const app = getFirebaseApp();

export const firebaseAuth = getAuth(app);
