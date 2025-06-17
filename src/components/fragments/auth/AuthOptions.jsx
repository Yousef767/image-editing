import {Link} from 'react-router-dom'

function AuthOptions({setOption}) {
  return (
    <div className="wayBtns">
        <div className="wayBox">
          <div>
            <img className="logo" src="/logo.png" alt="" />
          </div>
          <h1>Log in or sign up</h1>
          <p>Use your email or other serivce to continue with us </p>
          <div className="socialBtns">
            <button>
              <img src="/media/social-icons/google.svg" alt="" />
              Continue with Google
            </button>
            <button>
              <img src="/media/social-icons/facebook.svg" alt="" />
              Continue with Facebook
            </button>
            <button>
              <img src="/media/social-icons/apple.svg" alt="" />
              Continue with Apple
            </button>
            <button>
              <img src="/media/social-icons/twitter.svg" alt="" />
              Continue with Twitter
            </button>
            <button onClick={() => setOption('login')}>
              <img src="/media/social-icons/email.svg" alt="" />
              Continue with Email
            </button>
          </div>
          <div className="w100">
            By continuing, you agree to kitaba's{" "}
            <Link className="linearText" to={"/terms"}>
              Terms of Use
            </Link>
            . Read our{" "}
            <Link className="linearText" to={"/privacy-policy"}>
              {" "}
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
  )
}

export default AuthOptions