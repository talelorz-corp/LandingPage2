import { useRouter } from 'next/router'
import { Postcard } from '@/components/Postcard'
export default function ProfileHome() {
    const router = useRouter()
    const { userId } = router.query
    return(
        <>
            <div style={{height: "100px", width: "500px", padding:"20px", backgroundColor: "#999999"}}>
                <p>{userId}'s Home</p>
            </div>
        <Postcard post={{content: `인미션에서는 박진영의 'HONEY'를 선곡해 자신\n
        끼와 재기발랄한 랩으로 채우는 영민함을 보여줬다.[22]\n
        4차미션에서는 지원, 모모와 팀을 이루어 채지모를 결성하고\n
        인상깊은 무대를 보여줬으나[23] 상대적으로 투표가 밀려\n
         충격의 2연패를 당하고 모모가 탈락하는 불상사가 발생했다. \n
         [24] 그 후 5차미션 인성평가에서 메이저 7인에 들고 6차미션\n
          게릴라 콘서트에서는 확실히 제 몫을 해내면서 식스틴 \n
          전체에서 팀이 1위를 차지 했으며 [25] 파이널 미션에서는 \n
          랩파트로 팀을 하드캐리해내면서 메인래퍼로서의 가치를 \n
          확실히 보여주었다. [26] 그 결과 마지막까지 메이저에 \n
           남는 위엄을 보여주며 TWICE로 데뷔할 메이저 7인에 들어갔다.\n
           사실 랩 트레`, userId: "erer", postId:13, created_at:"2022_12_12", likes:0}}/>
        </>

    )
}