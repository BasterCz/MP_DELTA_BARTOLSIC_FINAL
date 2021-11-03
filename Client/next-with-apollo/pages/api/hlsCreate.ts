// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ffmpeg from "fluent-ffmpeg";
import hlsCreate from "../../libs/init/hlsCreate";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await hlsCreate("public/audio/clairDeLune.mp3", "public/HLS/clairDeLune.m3u8")

    
  res.status(200);
}
