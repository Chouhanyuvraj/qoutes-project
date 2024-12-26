import jwt from 'jsonwebtoken';

const authenticate = (token) => {
    console.log("token+" , token);
    if (!token) {
      throw new Error("Authorization token is missing");
    }
  
    try {
      // Remove "Bearer " if it exists
      const tokenWithoutBearer = token.replace("Bearer ", "");
  
      // Verify the JWT token and extract the userId
      const decoded = jwt.verify(tokenWithoutBearer, "myprivatekey");
      console.log("decoded.userId+" , decoded.userId);

      // Return the userId from the decoded token
      return decoded.userId;
    } catch (err) {
      console.error("Invalid or expired token:", err);
      throw new Error("Invalid or expired token");
    }
  };

  export default authenticate;