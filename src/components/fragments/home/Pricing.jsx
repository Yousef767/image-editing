import { Link } from "react-router-dom";
import Bubble from "../Bubble";
import { useEffect } from "react";
import { GlowEffect } from "../../../hooks/GlowEffect";
function Pricing() {
  useEffect(() => {
    GlowEffect();
  });
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
          <div className="plan glow">
            <h2>Free</h2>
            <span>For any kind of project or design work.</span>
            <h3>00.00</h3>
            <Link to={"/"} className="btn w100">
              Register now
            </Link>
          </div>
          <div className="plan glow">
            <h2>Monthly</h2>
            <span>auto-renewing subscription</span>
            <h3>19.99</h3>
            <Link to={"/"} className="btn w100">
              Subscribe now
            </Link>
          </div>
          <div className="plan glow">
            <h2>Yearly</h2>
            <span>auto-renewing subscription</span>
            <h3>49.99</h3>
            <Link to={"/"} className="btn w100">
              Subscribe now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
