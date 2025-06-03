import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import * as imglyBackgroundRemoval from "@imgly/background-removal";

import {
  FaCrop,
  FaTrash,
  FaMagic,
  FaFillDrip,
  FaEraser,
  FaSlidersH,
  FaUndo,
  FaRedo,
  FaDownload,
  FaLayerGroup,
  FaEye,
  FaEyeSlash,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
} from "react-icons/fa";
import { MdBlurOn, MdOpacity, MdCompare } from "react-icons/md";
import { ChromePicker } from "react-color";

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const [filterValue, setFilterValue] = useState(50);
  const [imageUrl, setImageUrl] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [layers, setLayers] = useState([]);
  const fileInputRef = useRef(null);
  const history = useRef([]);
  const historyIndex = useRef(-1);

  // Initialize canvas
  useEffect(() => {
    const canvasObj = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#f5f5f5",
      width: 800,
      height: 600,
    });
    setCanvas(canvasObj);

    // Save initial state
    saveCanvasState(canvasObj);

    return () => {
      canvasObj.dispose();
    };
  }, []);

  // Update layers when canvas objects change
  useEffect(() => {
    if (!canvas) return;

    const updateLayers = () => {
      const objects = canvas.getObjects();
      const newLayers = objects.map((obj, index) => ({
        id: obj.id || `layer-${Date.now()}-${index}`,
        name: obj.name || `Layer ${objects.length - index}`,
        visible: !obj.selectable === false, // fabric.js uses selectable for visibility
        object: obj,
        index: index,
      }));
      setLayers(newLayers.reverse()); // Reverse to show top layer first
    };

    canvas.on("object:added", updateLayers);
    canvas.on("object:removed", updateLayers);
    canvas.on("object:modified", updateLayers);
    canvas.on("object:moved", updateLayers);

    return () => {
      canvas.off("object:added", updateLayers);
      canvas.off("object:removed", updateLayers);
      canvas.off("object:modified", updateLayers);
      canvas.off("object:moved", updateLayers);
    };
  }, [canvas]);

  const saveCanvasState = (canvas) => {
    const state = JSON.stringify(canvas);
    history.current = history.current.slice(0, historyIndex.current + 1);
    history.current.push(state);
    historyIndex.current = history.current.length - 1;
  };

  const undo = () => {
    if (historyIndex.current <= 0) return;
    historyIndex.current--;
    loadCanvasState(history.current[historyIndex.current]);
  };

  const redo = () => {
    if (historyIndex.current >= history.current.length - 1) return;
    historyIndex.current++;
    loadCanvasState(history.current[historyIndex.current]);
  };

  const loadCanvasState = (state) => {
    canvas.loadFromJSON(state, () => {
      canvas.renderAll();
    });
  };

  // Load image when URL changes
  useEffect(() => {
    if (!canvas || !imageUrl) return;

    fabric.Image.fromURL(imageUrl, (img) => {
      // Scale image to fit canvas while maintaining aspect ratio
      const scale = Math.min(
        1,
        canvas.width / img.width,
        canvas.height / img.height
      );
      img.scale(scale);

      // Center the image
      img.set({
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: "center",
        originY: "center",
        selectable: true,
        id: `image-${Date.now()}`,
        name: "Background Image",
      });

      canvas.clear();
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      saveCanvasState(canvas);
    });
  }, [canvas, imageUrl]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const applyFilter = (filterType) => {
    if (!canvas || !canvas.getActiveObject()) return;

    const activeObject = canvas.getActiveObject();

    // Remove existing filters of the same type
    activeObject.filters =
      activeObject.filters?.filter((f) => !f.type.includes(filterType)) || [];

    if (filterType === "blur") {
      activeObject.filters.push(
        new fabric.Image.filters.Blur({
          blur: filterValue / 10,
        })
      );
    } else if (filterType === "opacity") {
      activeObject.opacity = filterValue / 100;
    } else if (filterType === "contrast") {
      activeObject.filters.push(
        new fabric.Image.filters.Contrast({
          contrast: filterValue / 50,
        })
      );
    }

    activeObject.applyFilters();
    canvas.renderAll();
    saveCanvasState(canvas);
  };

  const startCropping = () => {
    if (!canvas) return;
    setActiveTool("crop");
    canvas.selection = true;
    canvas.defaultCursor = "crosshair";
    canvas.forEachObject((obj) => (obj.selectable = false));
  };

  const applyCrop = () => {
    if (!canvas || activeTool !== "crop") return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    const selection = canvas.getActiveObject();
    if (selection.type !== "rect") return;

    const croppedImage = new fabric.Image(activeObject.getElement(), {
      left: selection.left,
      top: selection.top,
      width: selection.width,
      height: selection.height,
      cropX: selection.left - activeObject.left,
      cropY: selection.top - activeObject.top,
      selectable: true,
      id: `image-${Date.now()}`,
      name: "Cropped Image",
    });

    canvas.remove(activeObject);
    canvas.remove(selection);
    canvas.add(croppedImage);
    canvas.setActiveObject(croppedImage);
    canvas.renderAll();
    setActiveTool(null);
    canvas.defaultCursor = "default";
    canvas.forEachObject((obj) => (obj.selectable = true));
    saveCanvasState(canvas);
  };
  const [isRemovingBg, setIsRemovingBg] = useState(false);

  // async function generateDALLEImage(prompt) {
  //   const response = await fetch(
  //     "https://api.openai.com/v1/images/generations",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer YOUR_OPENAI_KEY`,
  //       },
  //       body: JSON.stringify({
  //         prompt: prompt,
  //         n: 1,
  //         size: "1024x1024",
  //       }),
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);

  //   return data.data[0].url; // Returns image URL
  // }
  // useEffect(() => {
  //   generateDALLEImage("cat hugs a dog");
  // }, []);

  const [image, setImage] = useState(null);

  

  const removeBackground = async () => {
    if (!canvas || !canvas.getActiveObject()) {
      alert("Please select an image first");
      return;
    }

    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.Image)) {
      alert("Please select an image to remove background");
      return;
    }

    try {
      setIsRemovingBg(true);

      // Get the image source
      const imageSrc = activeObject.getSrc();

      // Process the image using the correct exported function
      const blob = await imglyBackgroundRemoval.removeBackground(imageSrc);
      const processedUrl = URL.createObjectURL(blob);
      console.log(processedUrl);

      // Replace the image with the processed one
      fabric.Image.fromURL(processedUrl, (img) => {
        img.set({
          left: activeObject.left,
          top: activeObject.top,
          scaleX: activeObject.scaleX,
          scaleY: activeObject.scaleY,
          angle: activeObject.angle,
          selectable: true,
          id: `image-${Date.now()}`,
          name: "BG Removed Image",
        });

        canvas.remove(activeObject);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        saveCanvasState(canvas);

        URL.revokeObjectURL(processedUrl);
      });
    } catch (error) {
      console.error("Background removal failed:", error);
      alert("Background removal failed. Please try again.");
    } finally {
      setIsRemovingBg(false);
    }
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      saveCanvasState(canvas);
    }
  };

  const fillWithColor = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("fill", selectedColor);
      canvas.renderAll();
      saveCanvasState(canvas);
    }
  };

  const startErasing = () => {
    setActiveTool("erase");
    canvas.defaultCursor = "crosshair";
    canvas.selection = false;
  };

  const handleCanvasClick = (e) => {
    if (!canvas || !activeTool) return;

    if (activeTool === "erase") {
      const pointer = canvas.getPointer(e.e);
      const objects = canvas.getObjects();

      objects.forEach((obj) => {
        if (obj.containsPoint(pointer)) {
          canvas.remove(obj);
        }
      });
      saveCanvasState(canvas);
    }
  };

  const handleCanvasObjectModified = () => {
    saveCanvasState(canvas);
  };

  const downloadImage = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Layer management functions
  const toggleLayerVisibility = (layerId) => {
    const objects = canvas.getObjects();
    const layer = objects.find((obj) => obj.id === layerId);
    if (layer) {
      layer.set("selectable", !layer.selectable);
      layer.set("evented", !layer.evented);
      canvas.renderAll();
      saveCanvasState(canvas);
    }
  };

  const selectLayer = (layerId) => {
    const objects = canvas.getObjects();
    const layer = objects.find((obj) => obj.id === layerId);
    if (layer) {
      canvas.setActiveObject(layer);
      canvas.renderAll();
    }
  };

  const moveLayerUp = (layerId) => {
    const objects = canvas.getObjects();
    const layer = objects.find((obj) => obj.id === layerId);
    if (layer) {
      layer.bringForward();
      canvas.renderAll();
      saveCanvasState(canvas);
    }
  };

  const moveLayerDown = (layerId) => {
    const objects = canvas.getObjects();
    const layer = objects.find((obj) => obj.id === layerId);
    if (layer) {
      layer.sendBackwards();
      canvas.renderAll();
      saveCanvasState(canvas);
    }
  };

  const addNewLayer = () => {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "#ff0000",
      left: 100,
      top: 100,
      selectable: true,
      id: `rect-${Date.now()}`,
      name: `New Layer ${layers.length + 1}`,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
    saveCanvasState(canvas);
  };

  useEffect(() => {
    if (!canvas) return;

    canvas.on("object:modified", handleCanvasObjectModified);
    return () => {
      canvas.off("object:modified", handleCanvasObjectModified);
    };
  }, [canvas]);

  return (
    <div className="image-editor">
      {image ? <img src={image} alt="" /> : null}
      <div className="toolbar">
        <button onClick={() => fileInputRef.current.click()}>
          Replace
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }}
            accept="image/*"
          />
        </button>

        <button onClick={deleteSelected}>
          <FaTrash /> Delete
        </button>

        <button
          onClick={activeTool === "crop" ? applyCrop : startCropping}
          className={activeTool === "crop" ? "active" : ""}
        >
          <FaCrop /> Crop
        </button>

        <button onClick={removeBackground} disabled={isRemovingBg}>
          <FaMagic /> {isRemovingBg ? "Processing..." : "BG Remover"}
        </button>

        <div className="color-picker-container">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            style={{ backgroundColor: selectedColor }}
          >
            <FaFillDrip /> Fill
          </button>
          {showColorPicker && (
            <div className="color-picker-popup">
              <ChromePicker
                color={selectedColor}
                onChangeComplete={(color) => setSelectedColor(color.hex)}
              />
              <button onClick={() => fillWithColor()}>Apply</button>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setActiveTool(activeTool === "opacity" ? null : "opacity");
          }}
          className={activeTool === "opacity" ? "active" : ""}
        >
          <MdOpacity /> Opacity
        </button>

        <button
          onClick={() => {
            setActiveTool(activeTool === "contrast" ? null : "contrast");
          }}
          className={activeTool === "contrast" ? "active" : ""}
        >
          <MdCompare /> Contrast
        </button>

        <button
          onClick={() => {
            setActiveTool(activeTool === "blur" ? null : "blur");
          }}
          className={activeTool === "blur" ? "active" : ""}
        >
          <MdBlurOn /> Blur
        </button>

        <button
          onClick={startErasing}
          className={activeTool === "erase" ? "active" : ""}
        >
          <FaEraser /> Erase
        </button>

        <button onClick={undo} disabled={historyIndex.current <= 0}>
          <FaUndo /> Undo
        </button>

        <button
          onClick={redo}
          disabled={historyIndex.current >= history.current.length - 1}
        >
          <FaRedo /> Redo
        </button>

        <button onClick={downloadImage}>
          <FaDownload /> Download
        </button>

        <button
          onClick={() => setShowLayersPanel(!showLayersPanel)}
          className={showLayersPanel ? "active" : ""}
        >
          <FaLayerGroup /> Layers
        </button>

        <button onClick={addNewLayer}>
          <FaPlus /> Add Layer
        </button>
      </div>

      {activeTool && (
        <div className="filter-control">
          <FaSlidersH />
          <input
            type="range"
            min="0"
            max="100"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <span>{filterValue}%</span>
          <button onClick={() => applyFilter(activeTool)}>Apply</button>
        </div>
      )}

      {showLayersPanel && (
        <div className="layers-panel">
          <h3>Layers</h3>
          <div className="layers-list">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`layer-item ${
                  canvas.getActiveObject()?.id === layer.id ? "active" : ""
                }`}
              >
                <button
                  onClick={() => toggleLayerVisibility(layer.id)}
                  className="layer-visibility"
                >
                  {layer.object.selectable ? <FaEye /> : <FaEyeSlash />}
                </button>
                <span
                  className="layer-name"
                  onClick={() => selectLayer(layer.id)}
                >
                  {layer.name}
                </span>
                <div className="layer-actions">
                  <button
                    onClick={() => moveLayerUp(layer.id)}
                    disabled={layer.index === 0}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    onClick={() => moveLayerDown(layer.id)}
                    disabled={layer.index === layers.length - 1}
                  >
                    <FaArrowDown />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={handleCanvasClick}
        />
      </div>
    </div>
  );
};

export default ImageEditor;
