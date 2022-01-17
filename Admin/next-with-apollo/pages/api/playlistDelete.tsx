import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import hlsDelete from "../../lib/hlsDelete";
import playlistDelete from "../../lib/playlistDelete";

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  var response = await playlistDelete(req.headers["id"] as string);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
