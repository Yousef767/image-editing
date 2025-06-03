import axios from "axios";
import { useState } from "react";

function ImageGenerator() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const generateImage = async () => {
    setLoading(true);
    try {
      const payload = {
        prompt: prompt || "Lighthouse on a cliff overlooking the ocean",
        output_format: "webp",
      };

      // Create FormData for browser compatibility
      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      const response = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/ultra",
        formData,
        {
          responseType: "blob", // Changed from arraybuffer for browser
          headers: {
            Authorization: `Bearer sk-8DRG8j5wEPMywn5VSZBsmDT5mMRoJcN44fVyRPyVUAtjRKRh`, // Replace with your key
            Accept: "image/*",
          },
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setImage(imageUrl);
    } catch (error) {
      console.error("Generation failed:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your image..."
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {image && <img src={image} alt="Generated content" style={{ maxWidth: "100%" }} />}
    </div>
  );
}

export default ImageGenerator;