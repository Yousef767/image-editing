import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../../api/axios";

function AuthOptions({ setOption }) {
  const [loading, setLoading] = useState({
    google: false,
    facebook: false,
    twitter: false,
  });
  const navigate = useNavigate();
  let tokenClient = null;

  // Initialize Google OAuth client
  useEffect(() => {
    if (window.google) {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id:
          "505144242697-jdbtuigd972ou91rio07k4hilqdgj28v.apps.googleusercontent.com",
        scope:
          "openid profile email https://www.googleapis.com/auth/userinfo.email",
        callback: async (tokenResponse) => {
          const accessToken = tokenResponse.access_token;
          if (accessToken) {
            await handleSocialLogin(accessToken, "google");
          }
        },
      });
    }
  }, []);

  // Initialize Facebook SDK
  useEffect(() => {
    if (!window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "1460753841607323",
          cookie: true,
          xfbml: true,
          version: "v19.0", // تأكد من تحديد نسخة صحيحة
        });

        // هذا السطر مهم للتأكد من التهيئة
        window.FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }, []);

  const handleSocialLogin = async (token, provider) => {
    setLoading((prev) => ({ ...prev, [provider]: true }));
    try {
      const res = await AxiosInstance.post("/login-social", {
        provider,
        token,
      });

      Cookies.set("token", res.data.token);
      Cookies.set("username", res.data.name);
      navigate("/");
    } catch (error) {
      console.error(
        `${provider} login failed`,
        error.response?.data || error.message
      );
    } finally {
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const handleGoogleLogin = () => {
    tokenClient?.requestAccessToken();
  };

  const handleFacebookLogin = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded");
      return;
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          handleSocialLogin(response.authResponse.accessToken, "facebook");
        } else {
          console.error("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "public_profile,email",
        return_scopes: true,
      }
    );
  };

  const handleTwitterLogin = () => {
    window.open(
      `/auth/twitter?redirect=${encodeURIComponent(window.location.href)}`,
      "_self"
    );
  };

  // Handle Twitter callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get("oauth_token");
    const oauthVerifier = params.get("oauth_verifier");

    if (oauthToken && oauthVerifier) {
      handleTwitterCallback(oauthToken, oauthVerifier);
    }
  }, []);

  const handleTwitterCallback = async (oauthToken, oauthVerifier) => {
    setLoading((prev) => ({ ...prev, twitter: true }));
    try {
      const res = await AxiosInstance.post("/auth/twitter/callback", {
        oauth_token: oauthToken,
        oauth_verifier: oauthVerifier,
      });

      Cookies.set("token", res.data.token);
      Cookies.set("username", res.data.name);
      navigate("/");
    } catch (error) {
      console.error(
        "Twitter login failed",
        error.response?.data || error.message
      );
    } finally {
      setLoading((prev) => ({ ...prev, twitter: false }));
    }
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
          <button onClick={handleGoogleLogin} disabled={loading.google}>
            <img src="/media/social-icons/google.svg" alt="Google" />
            Continue with Google
            {loading.google && <span className="loader"></span>}
          </button>

          {/* Facebook Button */}
          <button onClick={handleFacebookLogin} disabled={loading.facebook}>
            <img src="/media/social-icons/facebook.svg" alt="Facebook" />
            Continue with Facebook
            {loading.facebook && <span className="loader"></span>}
          </button>

          {/* Apple Button */}
          <button disabled>
            <img src="/media/social-icons/apple.svg" alt="Apple" />
            Continue with Apple
          </button>

          {/* Twitter Button */}
          <button onClick={handleTwitterLogin} disabled={loading.twitter}>
            <img src="/media/social-icons/twitter.svg" alt="Twitter" />
            Continue with Twitter
            {loading.twitter && <span className="loader"></span>}
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
