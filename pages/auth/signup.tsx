import { useEffect, useState } from "react"
import Router from 'next/router'
export default function SignUp() {

    useEffect(()=>{
        fetch('http://localhost:3000/api/auth/checkLogin',
        {
            method : "GET"
        }
        )
        .then((res)=>res.json())
        .then((data)=>{
            console.log("fetched: ", data)
            if(data.isLoggedIn){
                Router.push("/")
            }
        })
    },[])
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userId, setUserId] = useState('')
    function signInClickHandler(){
        const q = Router.query
        console.log(q)
        fetch('http://localhost:3000/api/auth/signup',
            {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({snsId: q.snsId, provider: q.provider, firstName: firstName, lastName: lastName, userId: userId})
            }
        )
        .then((res)=>res.json())
        .then((data)=>{
            if(data.success===false && data.redirect_url){
                alert("잘못된 요청입니다.")
                Router.push(data.redirect_url)
            }
            if(data.success && data.redirect_url){
                Router.push(data.redirect_url)
            }
        })
    }
    return(
        <>
            <p>Signup to Talelorz</p>
            <p>displayName</p>
            <input id="userId" value = {userId} onChange ={(e)=>setUserId(e.target.value)}></input>

            <p>lastName</p>
            <input id="lastName" value = {lastName} onChange ={(e)=>setLastName(e.target.value)}></input>

            <p>firstName</p>
            <input id="firstName" value = {firstName} onChange ={(e)=>setFirstName(e.target.value)}></input>

            <button id="signup" onClick={signInClickHandler}> sign up </button>
        </>
    )
}