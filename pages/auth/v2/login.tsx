import { getAuth, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import Router from 'next/router'

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

function DoSNSLogin(snsId: string, provider: string){
    fetch('http://localhost:3000/api/auth/login',
        {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({snsId: snsId, provider: provider})
        }
    )
    .then((res)=>res.json())
    .then((data)=>{
        if(!data.success && data.redirect_url){
            Router.push({
                pathname: data.redirect_url,
                query: {snsId: data.snsId, provider: data.provider}
            })
        }
        else if(data.success && data.redirect_url){
            Router.push(data.redirect_url)
        }else{
            alert("다시 시도해 주세요.")
        }
    })
}

getRedirectResult(auth)
    .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result!);
        console.log("google credential: ", credential)
        console.log("google access token: ", credential?.accessToken)
        console.log("google id token: ", credential?.idToken)
        const user = result?.user;

        if(user && user.uid){
            console.log("google user: ", user?.uid)
            DoSNSLogin(user?.uid!, "GOOGLE")
        } else{
            throw Error("failed to identify google user")
        }

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