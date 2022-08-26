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
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string,
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
