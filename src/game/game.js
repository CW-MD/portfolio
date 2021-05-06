import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from "@babylonjs/core";
import SceneSetup from "./SceneSetup";
import listen from "./input";

let box;

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  light.intensity = 0.7;

  // Box model setup
  box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

  box.position.y = 1;

  // Ground setup
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};

// Will run on every frame render.  We are spinning the box on the y-axis.

const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export default function Game() {
  return (
    <div onKeyDown={(e) => listen(e)}>
      <SceneSetup
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="gameCanvas"
      />
    </div>
  );
}
