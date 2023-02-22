import {useRouter} from 'next/router'
export default function Followers() {
    const router = useRouter()
    const { userId } = router.query
    return(
        <div style={{height: "100px", width: "500px", padding:"20px", backgroundColor: "#999999"}}>
            <p>{userId}'s Followers</p>
        </div>
    )
}