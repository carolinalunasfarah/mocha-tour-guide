import ENVIRONMENT from '@/lib/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics} from 'firebase/analytics'

const firebaseConfig = {
  apiKey: ENVIRONMENT.FIREBASE_API_KEY,
  authDomain: ENVIRONMENT.FIREBASE_AUTH_DOMAIN,
  projectId: ENVIRONMENT.FIREBASE_PROJECT_ID,
  storageBucket: ENVIRONMENT.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENVIRONMENT.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENVIRONMENT.FIREBASE_APP_ID,
  measurementId: ENVIRONMENT.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { analytics, app, firestore };