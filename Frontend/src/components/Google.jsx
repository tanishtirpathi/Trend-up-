import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

<GoogleLogin
  onSuccess={async (credentialResponse) => {
    const res = await axios.post(
      "http://localhost:4000/api/auth/google",
      { token: credentialResponse.credential }
    );

    localStorage.setItem("token", res.data.token);
  }}
  onError={() => {
    console.log("Login Failed");
  }}
/>
