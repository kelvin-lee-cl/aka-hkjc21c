import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyAE0rKeonmuiMIUfJc5u8t3TCR1MWmh0ag',
    authDomain: 'aka-hkjc21c.firebaseapp.com',
    projectId: 'aka-hkjc21c',
    storageBucket: 'aka-hkjc21c.firebasestorage.app',
    messagingSenderId: '22707862767',
    appId: '1:22707862767:web:6008bd0e2ce3193b5e6f1a',
    measurementId: 'G-DFQQMQXJDR'
}

export const app: FirebaseApp = initializeApp(firebaseConfig)
export const auth: Auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)


