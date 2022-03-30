import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import utf8 from "utf8";
import hlsCreate from "../../lib/hlsCreate";
import playlistEditMongoDB from "../../lib/playlistEditMongoDB";
import cors from "cors";
const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
apiRoute.use(cors());
apiRoute.post(async (req, res) => {
  await playlistEditMongoDB(
    req.headers["_id"] as string,
    utf8.decode(req.headers["name"] as string),
    utf8.decode(req.headers["description"] as string),
    req.headers["imageisinitial"] === "true" ? req.headers["possibleinitialimage"] as string :req.headers["destinationimage"] as string,
    (req.headers["ispublic"] as string) === "true"
  );

  res.status(200).json({ data: "success", _id: req.headers["_id"] as string });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  }, 
};
 