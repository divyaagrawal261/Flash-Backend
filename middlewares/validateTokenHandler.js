import jwt from "jsonwebtoken"
const validateToken = async (req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;

  try{
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        console.log(err)
        throw new Error("User is not authorized!");
      }
      if(decoded.player)
      req.player = decoded.player;
      else
      req.owner=decoded.owner;
      next();
    });

    if(!token){
        res.status(401);
        throw new Error("User is not Authorized or token is missing");
    }
  }
}
catch(err)
{
  res.status(400).json(err.message);
}
};

export default validateToken;