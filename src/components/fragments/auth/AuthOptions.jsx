import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

function AuthOptions({ setOption }) {

  const handleGoogleLogin = () => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '505144242697-jdbtuigd972ou91rio07k4hilqdgj28v.apps.googleusercontent.com',
        callback: handleGoogleResponse
      });
      window.google.accounts.id.prompt();
    };
    document.body.appendChild(script);
  };

  const handleGoogleResponse = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);  // Updated usage
      const { data } = await axios.post('/login-social', {
        provider: 'google',
        token: response.credential,
        email: decoded.email,
        name: decoded.name
      });
      console.log('Google login success', data);
    } catch (error) {
      console.error('Google login failed', error);
    }
  };


  // Facebook Login Handler
  const handleFacebookLogin = () => {
    // Load Facebook SDK dynamically
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.FB.init({
        appId: "1460753841607323",
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            handleFacebookResponse(response.authResponse);
          }
        },
        { scope: "public_profile,email" }
      );
    };
    document.body.appendChild(script);
  };

  const handleFacebookResponse = async (response) => {
    try {
      const { data } = await axios.post("/login-social", {
        provider: "facebook",
        token: response.accessToken,
        userId: response.userID,
      });
      console.log("Facebook login success", data);
    } catch (error) {
      console.error("Facebook login failed", error);
    }
  };

  // Twitter Login Handler
  const handleTwitterLogin = () => {
    // Twitter requires OAuth 1.0a flow which is more complex
    // This is a simplified approach - in production you'd need a backend endpoint
    // to initiate the Twitter OAuth flow
    window.open(
      `/auth/twitter?redirect=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  };

  return (
    <div className="wayBtns">
      <div className="wayBox">
        <div>
          <img className="logo" src="/logo.png" alt="" />
        </div>
        <h1>Log in or sign up</h1>
        <p>Use your email or other service to continue with us</p>
        <div className="socialBtns">
          {/* Google Button */}
          <button onClick={handleGoogleLogin}>
            <img src="/media/social-icons/google.svg" alt="Google" />
            Continue with Google
          </button>

          {/* Facebook Button */}
          <button onClick={handleFacebookLogin}>
            <img src="/media/social-icons/facebook.svg" alt="Facebook" />
            Continue with Facebook
          </button>

          {/* Apple Button */}
          <button disabled>
            <img src="/media/social-icons/apple.svg" alt="Apple" />
            Continue with Apple
          </button>

          {/* Twitter Button */}
          <button onClick={handleTwitterLogin}>
            <img src="/media/social-icons/twitter.svg" alt="Twitter" />
            Continue with Twitter
          </button>

          {/* Email Button */}
          <button onClick={() => setOption("login")}>
            <img src="/media/social-icons/email.svg" alt="Email" />
            Continue with Email
          </button>
        </div>
        <div className="w100">
          By continuing, you agree to kitaba's{" "}
          <Link className="linearText" to="/terms">
            Terms of Use
          </Link>
          . Read our{" "}
          <Link className="linearText" to="/privacy-policy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthOptions;
