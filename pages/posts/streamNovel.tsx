import { useState, useEffect } from "react"

export default function WriteNovel() {

    function receiveStream(){
        fetch('http://localhost:5000/stream')
        .then(async (res) => {
            const reader = res.body?.getReader()
            if(reader){
                let readResult = await reader.read();
                while(readResult && !readResult.done) {
                    console.log(readResult.value)
                    readResult = await reader.read();
                    console.log("after")
                }
            }
            else{
                console.log("no readable stream in response!")
            }
        })
    }

    const [inputText, setInputText] = useState("")
    const [inputTextSplit, setInputTextSplit] = useState<string[]>([])
    const [novelText, setNovelText] = useState("")
    const [sentIndex, setSentIndex] = useState(0)

    function generateNovelStart(text: string){
        setInputText(text)
        let splits = text.split(".")
        splits = splits.filter((sent)=>sent.length > 0)
        console.log(splits)
        setInputTextSplit(splits)
        setSubmitted(true)
        //fetch
        
        setNovelText("이것은 하이퍼클로바 응답입니다.")
        setSentIndex(sentIndex + 1)
    }

    function generateNovelNext(text: string){
        if(sentIndex >= inputTextSplit.length) return;
        console.log("continue from: ", text + inputTextSplit[sentIndex])
        //fetch('http://localhost:5000/generateNext')
        //.then(res=>res.json())
        //.then(res=>setNovelText(res["data"]))
        setNovelText(text + " " + "이것은 하이퍼클로바 응답입니다.")
        setSentIndex(sentIndex + 1)
    }

    const [submitted, setSubmitted] = useState(false)
    const isSubmitted = submitted
    let inputDisplay, novelDisplay
    if(!isSubmitted){
        inputDisplay = <InputEditor inputText={""} submitHandler={generateNovelStart}/>
        novelDisplay= <></>
    }
    else{
        inputDisplay = <InputTextDisplay inputText={inputText}/>
        novelDisplay = <NovelEditor novel={novelText} submitHandler={generateNovelNext}/>
    }

    return (
        <>
            <p>
                Write novel
            </p>
            {inputDisplay}
            {novelDisplay}
        </>
    )
}
function InputEditor({inputText, submitHandler}: {inputText: string, submitHandler: (inp : string)=>void}){
    const [inputContent,setInputContent] = useState("")
    useEffect(()=>{
        setInputContent(inputText)
    }, [])
    return(
        <div style={{height: "200px", width: "500px", padding:"20px", backgroundColor: "#9999EE"}}>
            <textarea 
                rows={4}
                cols={50}
                value={inputContent}
                onChange={e => {
                    setInputContent(e.target.value)
                }}
            /> 
            <button onClick={()=>submitHandler(inputContent)}>
                테일 생성
            </button>
        </div>
    )
}

function InputTextDisplay({inputText}:{inputText: string}){
    return(
        <div style={{height: "60px", width: "500px", padding:"20px", backgroundColor: "#9999EE"}}>
            <p> {inputText} </p>
        </div>
    )
}

function NovelEditor({novel, submitHandler}: {novel: string, submitHandler: (nv: string)=>void}){
    const [postContent, setPostContent] = useState("")
    useEffect(()=>{
        setPostContent(novel)
    }, [novel])
    return(
        <div style={{height: "700px", width: "500px", padding:"20px", backgroundColor: "#99EE99"}}>
            <textarea 
                rows={20}
                cols={50}
                value={postContent}
                onChange={e => setPostContent(e.target.value)}
            > 
            </textarea>
            <button onClick={()=>submitHandler(postContent)}>
                이어 생성
            </button>
        </div>
    )
}