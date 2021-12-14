import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { useState } from "react";
import hlsCreate from "../../lib/hlsCreate";
import songUploadMongoDB from "../../lib/songUploadMongoDB";
import { useSongsAddMutation } from "../../__generated__/lib/viewer.graphql";

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
// Process a POST request

apiRoute.post(async (req, res) => {
  console.log(req.headers);
  hlsCreate(
    req.headers["source"] as string,
    req.headers["destinationfolder"] as string,
    req.headers["destination"] as string
  );
  var response = await songUploadMongoDB(req.headers["name"] as string, req.headers["destinationfile"] as string, req.headers["destinationimage"] as string, (req.headers["ispublic"] as string === "true"))
  res.status(200).json({ data: "success", _id: response });

});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
