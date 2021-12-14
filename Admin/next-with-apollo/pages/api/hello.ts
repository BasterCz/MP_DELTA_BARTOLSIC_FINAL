// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { useEffect, useState } from 'react'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  useEffect(()=>{
    //const [a, setA] = useState(1)
  })
  
  res.status(200).json({ name: 'John Doe' })
}
