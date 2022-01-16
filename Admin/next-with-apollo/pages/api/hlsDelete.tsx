import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import hlsDelete from "../../lib/hlsDelete";
import songDelete from "../../lib/songDelete";

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  var response = await songDelete(req.headers["id"] as string);
  var response2 = await hlsDelete(req.headers["pathtofile"] as string);
  res.status(200).json({ data: "success", deleteSong: response, deleteHLS: response2 });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
