import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyClaJae9v1EuZib4VcjjfZiV58QyheIbGw",
  authDomain: "todoist-clone-c85cc.firebaseapp.com",
  projectId: "todoist-clone-c85cc",
  storageBucket: "todoist-clone-c85cc.appspot.com",
  messagingSenderId: "543694894946",
  appId: "1:543694894946:web:a7cde4bdef9382a8fe9e3b"
};

export class Firebase {
  app: any
  auth: any
  db: any

  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth(this.app)
    this.db = getFirestore(this.app)
  }

  signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
  signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(this.auth, email, password)
  }
  signOut = () => {
    return firebaseSignOut(this.auth)
  }
  addData = async (collection: string, docId: string, data: any) => {
    return await setDoc(doc(this.db, collection, docId), data)
  }
}