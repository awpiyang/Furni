import { loadGLTF } from "./libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
  const nordicBtn = document.getElementById("nordicBtn");
  const kruzoBtn = document.getElementById("kruzoBtn");
  const ergoBtn = document.getElementById("ergoBtn");

  const startAR = async (targetName) => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: `./assets/targets/${targetName}.mind`,
    });

    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const anchor = mindarThree.addAnchor(0);

    const model = await loadGLTF(`./assets/models/${targetName}.glb`);
    model.scene.scale.set(0.5, 0.5, 0.5);
    model.scene.position.set(0, -0.5, 0);
    anchor.group.add(model.scene);

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  // Button event listeners
  nordicBtn.addEventListener("click", () => {
    disableButtons();
    startAR("nordic");
  });

  kruzoBtn.addEventListener("click", () => {
    disableButtons();
    startAR("kruzo");
  });

  ergoBtn.addEventListener("click", () => {
    disableButtons();
    startAR("ergo");
  });

  const disableButtons = () => {
    nordicBtn.disabled = true;
    kruzoBtn.disabled = true;
    ergoBtn.disabled = true;
  };
});