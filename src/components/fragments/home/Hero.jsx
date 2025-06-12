import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero">
      <div className="box">
        <h1>
          Show Your Design Talent With <span>Kitaba</span> All Year Long!
        </h1>
        <Link className="btn btn2" to={"/login"}>
          Start design
        </Link>
      </div>
      <img className="heroImg" src="/hero2.png" alt="" />
      <img className="bg" src="/bg.png" alt="" />
    </div>
  );
}

export default Hero;
