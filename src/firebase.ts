import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
// Optional: App Check (enable when you have a site key or using debug token)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - app-check may not be installed depending on environment
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

const firebaseConfig = {
    apiKey: 'AIzaSyAE0rKeonmuiMIUfJc5u8t3TCR1MWmh0ag',
    authDomain: 'aka-hkjc21c.firebaseapp.com',
    projectId: 'aka-hkjc21c',
    storageBucket: 'aka-hkjc21c.appspot.com',
    messagingSenderId: '22707862767',
    appId: '1:22707862767:web:6008bd0e2ce3193b5e6f1a',
    measurementId: 'G-DFQQMQXJDR'
}

export const app: FirebaseApp = initializeApp(firebaseConfig)
export const auth: Auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)

// Initialize App Check if a site key is provided (or debug token active)
try {
    const siteKey = (import.meta as any)?.env?.VITE_RECAPTCHA_V3_SITE_KEY
    if (typeof siteKey === 'string' && siteKey.length > 0) {
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(siteKey),
            isTokenAutoRefreshEnabled: true
        })
        // eslint-disable-next-line no-console
        console.log('[AppCheck] Initialized with reCAPTCHA v3 site key')
    } else {
        // eslint-disable-next-line no-console
        console.log('[AppCheck] No site key found; using debug token if present')
    }
} catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[AppCheck] initialization skipped or failed', e)
}



