import { jwtDecode } from "jwt-decode";

export default function getIdFromToken(token) {
  try {
    const decodedToken = jwtDecode(token);
    console.log("TOKEN DECODE :", decodedToken);  
    return decodedToken.id || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
