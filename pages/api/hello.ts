// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getData()
  res.status(200).json(data)
}

async function getData(){
  const data = await fetch('http://127.0.0.1:5000/hello')
  const jsonData = await data.json()
  return {"novel": 
    "오늘 아침 10시에 일어났다. \
    새해 첫날부터 늦잠이라니... 올 한해 어떻게 보낼려고 이러는지 모르겠다. \
    올해는 일찍 자고 일찍 일어나는 습관을 들여야 겠다.\
    ***\
    늦을까봐 조마조마했던 나연이었다.\
    \"후 살았다 이제 출발하네.\"\
    다행히 지각은 면할 수 있었다.\
    \"다행이다 그래도 많이 안 늦어서ᄒᄒ\"\
    무사히 출근도장을 찍은 나연이었다."
  }
}