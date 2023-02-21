import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'

export default function Login() {

    useEffect(()=>{
        console.log("reload login page")
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


    const kakaoInit = () => {
        const kakao = (window as any).Kakao;
        if (!kakao.isInitialized()) {
            console.log("initing!")
            console.log(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
            kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
        }

        return kakao;
    }

    const kakaoLogin = async () => {
        // 카카오 초기화
        const kakao = kakaoInit();

        // 카카오 로그인 구현
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
                        	// 쿠키 생성
                            fetch('http://localhost:3000/api/auth/kakao/login',
                                {
                                    method : "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({id: res.id})
                                }
                            )
                            .then((res)=>res.json())
                            .then((data)=>{
                                if(!data.success && data.redirect_url){
                                    Router.push(data.redirect_url)
                                }
                                else if(data.success && data.redirect_url){
                                    Router.push(data.redirect_url)
                                }else{
                                    alert("다시 시도해 주세요.")
                                }
                            })
                        }
                        
                    },
                    fail: (error: any) => {
                        alert("현재 카카오로그인이 불가합니다.")
                    }
                })
            },
            fail: (error: any) => {
                console.log(error);
            }
        })
    }
    
    return (
        <>
            <button onClick={(e: any) => { kakaoLogin(); }}>
                카카오 로그인
            </button>
            <button onClick={(e: any) => { kakaoLogin(); }}>
                네이버 로그인
            </button>
        </>
    )
}