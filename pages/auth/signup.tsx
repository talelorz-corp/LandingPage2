import { useState } from "react"

export default function SignUp() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userId, setUserId] = useState('')
    function signInClickHandler(){
        fetch('http://localhost:3000/api/auth/signup',
            {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstName: firstName, lastName: lastName, userId: userId})
            }
        )
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
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