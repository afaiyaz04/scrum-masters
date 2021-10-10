import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === "test") {
        var id = req.headers.postman;
        if (!id) {
            // no id provided, use admin
            id = "1";
        }
        req.userId = id;
        next();
    } else {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            next();
            return;
        }

        // Grab googleId
        let decodedData;
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;

        next();
    }
  } catch (error) {
    console.log(error);
  }
};

export default auth;