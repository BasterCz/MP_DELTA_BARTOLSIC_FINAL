import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import songAddToPlaylist from "../../lib/songAddToPlaylsit";

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  var response = await songAddToPlaylist(
    req.headers["id"] as string,
    req.headers["song"] as string
  );
  res.status(200).json({ data: "success", uploaded: response });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
