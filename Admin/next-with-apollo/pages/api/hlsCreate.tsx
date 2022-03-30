import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import utf8 from "utf8";
import hlsCreate from "../../lib/hlsCreate";
import songUploadMongoDB from "../../lib/songUploadMongoDB";
import waveformUploadMongoDB from "../../lib/waveformUploadMongoDB";
import cors from "cors";
const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
apiRoute.use(cors());
apiRoute.post(async (req, res) => {
  hlsCreate(
    req.headers["source"] as string,
    req.headers["destinationfolder"] as string,
    req.headers["destination"] as string
  );
  var response = await songUploadMongoDB(
    utf8.decode(req.headers["name"] as string),
    req.headers["destinationfile"] as string,
    req.headers["destinationimage"] as string,
    (req.headers["ispublic"] as string) === "true"
  );
  var responseWaveform = await waveformUploadMongoDB(
    response, 
    (req.headers["audiolevels"] as string).split('|').map(Number) as number[],
  );
  res.status(200).json({ data: "success", _id: response });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
