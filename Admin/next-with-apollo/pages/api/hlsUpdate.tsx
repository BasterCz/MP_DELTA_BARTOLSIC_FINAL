import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import utf8 from "utf8";
import hlsCreate from "../../lib/hlsCreate";
import songEditMongoDB from "../../lib/songEditMongoDB";

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  console.log("passed")
  if (req.headers["fileisinitial"] !== "true") {
    hlsCreate(
      req.headers["source"] as string,
      req.headers["destinationfolder"] as string,
      req.headers["destination"] as string
    );
  }
  console.log("passed")
  await songEditMongoDB(
    req.headers["_id"] as string,
    utf8.decode(req.headers["name"] as string),
    req.headers["fileisinitial"] === "true" ? utf8.decode(req.headers["possibleinitialfile"] as string) : utf8.decode(req.headers["destinationfile"] as string) as string,
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
 