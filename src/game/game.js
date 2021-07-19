import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  UniversalCamera,
  Mesh,
  StandardMaterial,
  Texture,
  Color3,
  Color4,
  PBRMetallicRoughnessMaterial,
  drawText,
  DynamicTexture
} from "@babylonjs/core";
import SceneSetup from "./SceneSetup";
import listen from "./input";
import textDemo from "./mesh";
import TileFloor from "./assets/TileFloor.jpeg";
import Wallpaper from "./assets/EleWall.jpeg";
import * as GUI from "babylonjs-gui";

let ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mauris diam, pharetra at cursus at, ultrices pellentesque ex. Pellentesque non porta turpis. In quis iaculis tortor. Donec in libero bibendum, luctus tortor nec, lobortis massa. Curabitur egestas vulputate imperdiet. Vestibulum finibus sit amet metus quis euismod. Nunc rhoncus aliquet arcu, a efficitur risus vestibulum at. Curabitur placerat interdum nisi, vitae pretium velit. Sed id tempor arcu, id finibus nibh. Fusce efficitur porta facilisis.'
let box;

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new UniversalCamera("camera1", new Vector3(0, 1, -14), scene);
  camera.checkCollisions = true;
  camera.applyGravity = true;
  //SpaceBar to toggle Gravity for debugging and t
  window.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      camera.applyGravity = !camera.applyGravity;
      console.log("space pressed");
    }
  });
  camera.speed = 0.3;
  camera.ellipsoid = new Vector3(1, 1, 1);
  camera.ellipsoidOffset = new Vector3(1, 1, 1);
  //
  const plane = Mesh.CreatePlane("plane", 2);
  plane.parent = wall1;
  plane.position.y = .5;
  plane.position.x = 7.4;
  plane.position.z = -3
  plane.rotation.y = 1.5

  let advTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);

  let button1 = GUI.Button.CreateSimpleButton("prepInfo", "Information");
  button1.width = 1;
  button1.height = 0.4;
  button1.color = "white";
  button1.fontSize = 50;
  button1.background = "green";
  button1.onPointerUpObservable.add(function () {
    alert(ipsum)
  });
  advTexture.addControl(button1);


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
  var light = new HemisphericLight("light", new Vector3(0, 2, 0), scene);
 // var light2 = new HemisphericLight("light2", new Vector3(-3, 2, 0), scene);
  light.intensity = 1.2;
  //light2.intensity = .5

  //let pointLight = new

  // Box model setup
  box = MeshBuilder.CreateBox("box", { width:1.5, height:6, depth:1.5 }, scene);
  box.checkCollisions = true;

  box.position.y = 1;

  // Ground setup
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 15, height: 20 },
    scene
  );
  const groundMat = new StandardMaterial("tileFloor", scene);
  groundMat.diffuseTexture = new Texture(TileFloor, scene);
  ground.material = groundMat;
  ground.checkCollisions = true;

  const lobby = MeshBuilder.CreateGround(
    "entrance",
    { width: 4, height: 5 },
    scene
  );
  lobby.checkCollisions = true;
  lobby.position.z = -12.5;


  const glass = new PBRMetallicRoughnessMaterial('smplrwhite', scene)
    glass.baseColor = new Color3(0.78, 0.82, 0.85)
    glass.emissiveColor = new Color3(0.46, 0.48, 0.5)
    glass.metallic = 1.0
    glass.roughness = 0.3
    glass.alpha = 0.3

  // const roof = MeshBuilder.CreateCylinder('roof',{diameter: 1.3, height: 1.2, tessellation: 3})
  // roof.position.y = 5
  // roof.rotation.z = Math.PI / 2
  // roof.material = glass
  const beam1 = MeshBuilder.CreateBox('beam1', {size:1, height:1, width:15})
  const beam2 = MeshBuilder.CreateBox('beam2', {size:1, height:19, width:1})
  const beam3 = MeshBuilder.CreateBox('beam3',{size:1, height:1, width:4} )
  beam3.position.y = 4.5
  beam3.position.z = -10
  beam1.position.y = 4.5
  beam2.rotation.x = Math.PI / 2
  beam2.position.y = 4.5

  //Wall Setup -- will reformat into separate function
  const wallColor = new StandardMaterial('wallcolor', scene)
  wallColor.diffuseColor = new Color4(.8,1,0,1)

  const pbrColor = new PBRMetallicRoughnessMaterial('pbr', scene)
  pbrColor.baseColor = new Color3.FromHexString('#C38888')
  pbrColor.metallic = .7
  pbrColor.roughness = .3
  

  const wallMesh = new StandardMaterial("wallPaper", scene);
  wallMesh.diffuseTexture = new Texture(Wallpaper,scene);
  wallMesh.diffuseColor = new Color3.FromHexString("#fff86b");
  const wall1 = MeshBuilder.CreateBox("1", { size: 20, height: 6, width: 1 });
  wall1.position.z = 0;
  wall1.position.y = 2;
  wall1.position.x = 8;
  wall1.checkCollisions = true;
  wall1.material = wallMesh;

  const wall2 = MeshBuilder.CreateBox("2", { size: 20, height: 6, width: 1 });
  wall2.position.z = 0;
  wall2.position.y = 2;
  wall2.position.x = -8;
  wall2.checkCollisions = true;
  wall2.material = wallColor

  const wall3 = MeshBuilder.CreateBox("3", { size: 1, height: 6, width: 15 });
  wall3.position.z = 10;
  wall3.position.y = 2;
  wall3.position.x = 0;
  wall3.checkCollisions = true;
  wall3.material = wallColor

  const wall4 = MeshBuilder.CreateBox("4", { size: 1, height: 6, width: 6 });
  wall4.position.z = -10;
  wall4.position.y = 2;
  wall4.position.x = 5;
  wall4.checkCollisions = true;
  wall4.material = wallMesh

  const wall5 = MeshBuilder.CreateBox("5", { size: 1, height: 6, width: 6 });
  wall5.position.z = -10;
  wall5.position.y = 2;
  wall5.position.x = -5;
  wall5.checkCollisions = true;
  wall5.material = pbrColor
};

// Will run on every frame render.  We are spinning the box on the y-axis.

const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    //box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
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
