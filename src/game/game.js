import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  UniversalCamera,
} from "@babylonjs/core";
import SceneSetup from "./SceneSetup";
import listen from "./input";

let box;

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new UniversalCamera("camera1", new Vector3(0, 1, -14), scene);
  // camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.speed = 0.3;

  //WASD, Arrows, numpad: 8426
  camera.keysLeft = [65, 37, 100];
  camera.keysRight = [68, 39, 102];
  camera.keysUp = [87, 38, 104];
  camera.keysDown = [83, 40, 98];

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
  MeshBuilder.CreateGround("ground", { width: 15, height: 20 }, scene);
  const lobby = MeshBuilder.CreateGround(
    "entrance",
    { width: 4, height: 5 },
    scene
  );
  lobby.position.z = -12.5;
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
