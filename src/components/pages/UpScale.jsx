import Aside from "../fragments/dashboard/Aside";
import { useDashboardNav } from "../../hooks/DashboardNavHook";
import { DashboardNav } from "../fragments/dashboard/DashboardNav";
import AlsoLinks from "../fragments/ai/AlsoLinks";

function UpScale() {
  const { active, handleActive, handleSearch } = useDashboardNav();  

  const handleDownload = (event) => {
    const url = event.target.src;
    const filename = url.split("/").pop();
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={active ? "dashborad active" : "dashborad"}>
      <Aside type={2} />
      <div className="container dashb">
        <DashboardNav handleActive={handleActive} handleSearch={handleSearch} />
        <div className="content">
          <div className="igContent">
            <AlsoLinks />
            <div className="otherContent">
              <div className="flexcenter50">
              <div className="generateInput imgInput">
                <h1>
                  AI-Powered Image <br /> Quality Boost
                </h1>
                <div className="input">
                  <label htmlFor="img">
                    <h4>Drag and drop image here</h4>
                    <span>JPG, PNG / Max. 8 MB / Min. 224px x 224px</span>
                  </label>
                  <input
                    type="file"
                    name="img"
                    id="img"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
                <p className="noteForIG">
                  Upload your image, choose your upscale level, and let our AI
                  enhance the quality—sharper, cleaner, and high-resolution in
                  seconds.
                </p>
              </div>
<img src="/media/up.png" alt="" />
              </div>

              <div className="recent recent2">
                <h3 className="seeAll pb20">Your latest edits</h3>
                <div className="recent-generates">
                  <div className="gsimgs">
                    <img
                      src="/media/recent.png"
                      alt=""
                      onClick={handleDownload}
                    />
                    <img
                      src="/media/recent.png"
                      alt=""
                      onClick={handleDownload}
                    />
                    <img
                      src="/media/recent.png"
                      alt=""
                      onClick={handleDownload}
                    />
                    <img
                      src="/media/recent.png"
                      alt=""
                      onClick={handleDownload}
                    />
                    <img
                      src="/media/recent.png"
                      alt=""
                      onClick={handleDownload}
                    />
                    <img
                      src="/media/recent.png"
                      alt=""
                      onClick={handleDownload}
                    />
                    <img
                      src="/media/recent.png"
                      alt=""
                      onClick={handleDownload}
                    />
                    <img
                      src="/media/recent.png"
                      alt=""
                      onClick={handleDownload}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpScale;
