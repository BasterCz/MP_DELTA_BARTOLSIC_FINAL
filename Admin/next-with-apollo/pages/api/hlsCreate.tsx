import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import hlsCreate from "../../lib/hlsCreate";


const upload = (req : NextApiRequest)=> {
  console.log(req.headers);
     hlsCreate(
    req.headers['source'] as string, 
    req.headers['destinationfolder'] as string,
    req.headers['destination'] as string
     );
     

}


const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
   res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
  
});

apiRoute.use(upload);

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