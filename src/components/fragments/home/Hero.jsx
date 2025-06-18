import { useShowOption } from "../../../hooks/ShowOptionProvider";

function Hero() {
  const { setShow, setOption } = useShowOption();
  return (
    <div className="hero">
      <div className="box">
        <h1>
          Show Your Design Talent With <span>Kitaba</span> All Year Long!
        </h1>
        <button
          className="btn btn2"
          onClick={() => {
            setShow(true);
            setOption("signup");
          }}
        >
          Start design
        </button>
      </div>
      <img className="heroImg" src="/hero2.png" alt="" />
      <img className="bg" src="/bg.png" alt="" />
    </div>
  );
}

export default Hero;
