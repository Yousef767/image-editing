import { Link } from "react-router-dom";
import Bubble from "../Bubble";
function Pricing() {
  return (
    <div className="bubbleInner">
      <Bubble position="top-left" />
      <div className="box center">
        <div className="header">
          <span className="label"> Pricing</span>
          <h2>
            Our <span>Subscription</span> Plans
          </h2>
        </div>
        <div className="plans">
          <div className="plan">
            <h2>Free</h2>
            <span>For any kind of project or design work.</span>
            <h3>00.00</h3>
            <Link to={"/"} className="btn w100">
              Register now
            </Link>
          </div>
          <div className="plan">
            <h2>Monthly</h2>
            <span>auto-renewing subscription</span>
            <h3>20.99</h3>
            <Link to={"/"} className="btn w100">
              Register now
            </Link>
          </div>
          <div className="plan">
            <h2>Free</h2>
            <span>auto-renewing subscription</span>
            <h3>20.99</h3>
            <Link to={"/"} className="btn w100">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
