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
  const data = await fetch('http://192.168.56.1:3031/hello')
  console.log(data)
  const jsonData = await data.json()
  console.log(jsonData)
  return jsonData
}