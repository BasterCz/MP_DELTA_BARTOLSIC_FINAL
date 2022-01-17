import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import utf8 from "utf8";
import playlistUploadMongoDB from "../../lib/playlistUploadMongoDB";

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  console.log(req.headers);
  var response = await playlistUploadMongoDB(
    utf8.decode(req.headers["name"] as string),
    utf8.decode(req.headers["description"] as string),
    req.headers["imagePath"] as string,
    (req.headers["ispublic"] as string) === "true"
  );
  res.status(200).json({ data: "success", _id: response });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
