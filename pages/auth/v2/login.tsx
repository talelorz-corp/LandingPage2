import { getAuth, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyBSeEINZDMBg1gbAR3pzyIs64N-495OJg8",
    authDomain: "talelorz-6832e.firebaseapp.com",
    projectId: "talelorz-6832e",
    storageBucket: "talelorz-6832e.appspot.com",
    messagingSenderId: "322784070270",
    appId: "1:322784070270:web:cdc9cf17e227d11a5ea62f",
    measurementId: "G-YNVQD758S8"
  };

const app = initializeApp(firebaseConfig);
const google_provider = new GoogleAuthProvider();
const auth = getAuth(app);

getRedirectResult(auth)
    .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result!);
    const token = credential?.accessToken;
    console.log("google token: ", token)
    const user = result?.user;
    console.log("signed in as user ", user)
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error logging in : " ,errorMessage)
    const credential = GoogleAuthProvider.credentialFromError(error);
    });

export default function LoginPage(){

    function doLogin(){
        signInWithRedirect(auth, google_provider);

    }

    return(
        <button onClick={(e)=>doLogin()}> Login </button>
    )
}