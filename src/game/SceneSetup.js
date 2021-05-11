import { Engine, Scene, Vector3 } from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

const SceneSetup = (props) => {
  const canvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;

  useEffect(() => {
    if (canvas.current) {
      const engine = new Engine(
        canvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      const scene = new Scene(engine, sceneOptions);
      scene.collisionsEnabled = true;
      scene.gravity = new Vector3(0, -2, 0);

      if (scene.isReady()) {
        props.onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
  }, [canvas]);

  return <canvas ref={canvas} {...rest} />;
};

export default SceneSetup;
