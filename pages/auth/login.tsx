import { getAuth, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import { useEffect } from "react";
import Router from 'next/router'

/******** COMMON *******/
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

/****** FIREBASE ******/
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
const auth = getAuth(app);
/******** GOOGLE *******/
//Handles Google Login api redirect result
const google_provider = new GoogleAuthProvider();
getRedirectResult(auth)
    .then(async (result) => {
        console.log(result)
        const credential = GoogleAuthProvider.credentialFromResult(result!)
        const user = result?.user

        if(user && user.uid){
            DoSNSLogin(user?.uid!, "GOOGLE")
        } else{
            throw Error("failed to identify google user")
        }

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });

getRedirectResult(auth)
  .then((result) => {
    if(result){
        const credential = FacebookAuthProvider.credentialFromResult(result!);
        //const token = credential?.accessToken;
        if(result.user){
            console.log(result.user)
        }
    }

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    // ...
  });



/******** NAVER  *******/
declare global {
    interface Window {
      naver: any;
    }
} //suppress typescript warning

//handles naver login api redirect result
const naverInit = ()=>{
    const naver = (window as any).naver;
    if(naver && naver.isInitialized) {
        return naver
    } 

    const naverLogin = new window.naver.LoginWithNaverId({
        clientId: 'uzZ0DB_iChpnX_AxEXc2',
        callbackUrl: 'http://localhost:3000/auth/login',
        isPopup: false,
        loginButton: { color: 'white', type: 2, height: '1'}
    });
    naverLogin.init();
    return naverLogin
    
}

const handleNaverLogin = () => {
    const naverLogin = naverInit()
    const hash = Router.asPath.split('#')[1];
    if(hash) {
        const token = hash.split('=')[1].split('&')[0]; 
        naverLogin.getLoginStatus((status: any) => {
            if(status) {
                //if(!naverLogin.user.getAge()) { // 나이정보 제공을 동의하지 않았을 경우
                //    alert('나이 정보는 필수입니다.');
                //    naverLogin.reprompt(); // 정보제공창 다시 보여주기

                //    return;
                //}

                if(naverLogin.user && naverLogin.user.id){
                    DoSNSLogin(naverLogin.user.id, "NAVER")
                } else{
                    throw Error("failed to identify naver user")
                }
            }
        });
    }
}

/***** kakao *****/
const kakaoInit = () => {
    const kakao = (window as any).Kakao;
    if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
    }
    return kakao;
}


/* page */
export default function LoginPage(){
    useEffect(()=>{
        fetch('http://localhost:3000/api/auth/checkLogin',
        {
            method : "GET"
        }
        )
        .then((res)=>res.json())
        .then((data)=>{
            if(data.isLoggedIn){
                Router.push("/")
            }
        })
    },[])

    useEffect(()=>{
        handleNaverLogin()
    }, [])

    const handleGoogleClick = () => {
        signInWithRedirect(auth, google_provider)
    }

    const handleNaverClick = () => {
        const naver = naverInit()
        const naverLoginButton = document.getElementById(
            "naverIdLogin_loginButton"
        );
        if (naverLoginButton) naverLoginButton.click()
    };

    const handleKakaoClick = async () => {
        const kakao = kakaoInit();
        kakao.Auth.login({
            success: () => {
                kakao.API.request({
                    url: '/v2/user/me', // 사용자 정보 가져오기
                    success: (res: any) => {
                        // 로그인 성공할 경우 
                        if (!res.id) {
                            alert("현재 카카오로그인이 불가합니다.")
                        }
                        else {
                        	DoSNSLogin(res.id, "KAKAO")
                        }
                    },
                    fail: (error: any) => {
                        alert("현재 카카오로그인이 불가합니다.")
                    }
                })
            },
            fail: (error: any) => {
            }
        })
    }
    return(
        <>
            <script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"></script>
            <button onClick={handleGoogleClick}> Google로 로그인하기</button>
            <button onClick={handleNaverClick}>네이버로 로그인하기</button>
            <button onClick={handleKakaoClick}> 카카오로 로그인하기</button>

            <div id="naverIdLogin" style={{ display: "none" }}/>
        </>
    )
}