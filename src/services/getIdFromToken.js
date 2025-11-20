import { jwtDecode } from "jwt-decode";

export default function getIdFromToken(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.id || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
