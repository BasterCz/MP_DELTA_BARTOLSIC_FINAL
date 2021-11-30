import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";



const upload = multer({
  storage: multer.diskStorage({
    destination: (req,file, cb) => cb(null, req.headers['destination'] as string),
    filename: (req, file, cb) => cb(null, file.originalname.replaceAll(" ", "_")),
  }),
});

const uploadMiddleware = upload.array('theFiles');

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post((req, res) => {
  res.status(200).json({ data: "success" });
});



export default apiRoute;

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };