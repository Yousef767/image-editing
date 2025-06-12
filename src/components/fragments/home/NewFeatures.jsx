import { Link } from "react-router-dom";
import Bubble from "../Bubble";
function NewFeatures() {
  return (
    <div className="bubbleInner">
      <Bubble position="top-right rotate-180" />
      <div className="box center">
        <div className="header">
          <span className="label"> New Features</span>
          <h2>
            Enhance Your Creativity with <br />
            <span> AI-Powered Tools</span>
          </h2>
          <p>Our app offers powerful AI tools designed to simplify and elevate your image editing experience. Whether you're creating, resizing, or cleaning up images, these features help you save time and achieve professional results with ease.</p>
        </div>
      </div>
    </div>
  );
}

export default NewFeatures;
