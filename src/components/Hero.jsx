"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // ── Pagination ──
    const paginationItems = document.querySelectorAll(".hero__pagination-item");
    paginationItems.forEach((btn) => {
      btn.addEventListener("click", () => {
        paginationItems.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });

    // ── Grid Square Animation ──
    const allSquares = document.querySelectorAll(".grid-square");
    const hideOnHoverSquares = document.querySelectorAll(".hide-on-hover");



    // ── hover-squares.js logic ──
    allSquares.forEach(function (sq) {
      sq.setAttribute("fill", "#ffffff");
      sq.setAttribute("fill-opacity", "0");
      sq.classList.add("sq-hidden");
    });

    let currentHoveredSquare = null;
    let hoverTimeouts = [];

    function clearAllTimeouts() {
      hoverTimeouts.forEach(clearTimeout);
      hoverTimeouts = [];
    }

    function generateRandomPattern(triggerSquare) {
      clearAllTimeouts();

      hideOnHoverSquares.forEach(function (sq) {
        sq.classList.add("sq-force-hide");
      });

      allSquares.forEach(function (sq) {
        if (sq.classList.contains("hide-on-hover")) return;

        if (sq === triggerSquare) {
          sq.classList.remove("sq-hidden");
          sq.classList.add("sq-visible");
          sq.setAttribute("fill-opacity", "1");
          return;
        }

        const shouldShow = Math.random() > 0.85;
        const delay = Math.random() * 300;

        hoverTimeouts.push(
          setTimeout(function () {
            if (shouldShow) {
              sq.classList.remove("sq-hidden");
              sq.classList.add("sq-visible");
              sq.setAttribute("fill-opacity", "1");
            } else {
              sq.classList.remove("sq-visible");
              sq.classList.add("sq-hidden");
              sq.setAttribute("fill-opacity", "0");
            }
          }, delay)
        );
      });
    }

    function hideAllSquares() {
      clearAllTimeouts();

      hideOnHoverSquares.forEach(function (sq) {
        sq.classList.remove("sq-force-hide");
      });

      allSquares.forEach(function (sq) {
        const delay = Math.random() * 300;
        hoverTimeouts.push(
          setTimeout(function () {
            sq.classList.remove("sq-visible");
            sq.classList.add("sq-hidden");
            sq.setAttribute("fill-opacity", "0");
          }, delay)
        );
      });
    }

    allSquares.forEach(function (sq) {
      sq.addEventListener("mouseenter", function () {
        if (currentHoveredSquare === sq) return;
        currentHoveredSquare = sq;
        generateRandomPattern(sq);
      });
    });

    const gridSvg = document.querySelector(".hero__grid-wrapper svg");
    if (gridSvg) {
      gridSvg.addEventListener("mouseleave", function () {
        currentHoveredSquare = null;
        hideAllSquares();
      });
    }

    // ── THREE.JS WebGL Shader ──
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#ffffff", 1, 3);
    scene.background = new THREE.Color("#ffffff");

    const geometry = new THREE.PlaneGeometry(12, 12, 512, 512);

    const vertexShader = `
        uniform float uTime;
        uniform float uBigWavesElevation;
        uniform vec2 uBigWavesFrequency;
        uniform float uBigWaveSpeed;
        uniform float uSmallWavesElevation;
        uniform float uSmallWavesFrequency;
        uniform float uSmallWavesSpeed;
        uniform float uSmallWavesIterations;
        varying vec2 vUv;
        varying float vElevation;
        varying float vFogDepth;

        vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

        float cnoise(vec3 P) {
          vec3 Pi0 = floor(P);
          vec3 Pi1 = Pi0 + vec3(1.0);
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec3 Pf0 = fract(P);
          vec3 Pf1 = Pf0 - vec3(1.0);
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;
          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);
          vec4 gx0 = ixy0 / 7.0;
          vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);
          vec4 gx1 = ixy1 / 7.0;
          vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);
          vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
          vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
          vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
          vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
          vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
          vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
          vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
          vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);
          vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));
          g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));
          g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);
          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000,n100,n010,n110), vec4(n001,n101,n011,n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
          return 2.2 * n_xyz;
        }

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          float elevation =
            sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWaveSpeed)
            * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWaveSpeed)
            * uBigWavesElevation;

          for(float i = 1.0; i <= 10.0; i++) {
            elevation -= abs(
              cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed))
              * uSmallWavesElevation / i
            );
            if(i >= uSmallWavesIterations) { break; }
          }

          modelPosition.y += elevation;
          vec4 elevatedMvPosition = viewMatrix * modelPosition;
          gl_Position = projectionMatrix * elevatedMvPosition;

          vFogDepth = -elevatedMvPosition.z;

          vUv = uv;
          vElevation = elevation;
        }
    `;

    const fragmentShader = `
        precision mediump float;
        uniform vec3 uDepthColor;
        uniform vec3 uSurfaceColor;
        uniform float uColorOffset;
        uniform float uColorMultiplier;
        
        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;

        varying float vElevation;
        varying float vFogDepth;

        void main() {
          float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
          vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
          
          float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
          color = mix(color, fogColor, fogFactor);

          gl_FragColor = vec4(color, 1.0);
        }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uBigWavesElevation: { value: 0.214 },
      uBigWavesFrequency: { value: new THREE.Vector2(2.448, 2.136) },
      uBigWaveSpeed: { value: 1.598 },
      uSmallWavesElevation: { value: 0.195 },
      uSmallWavesFrequency: { value: 0 },
      uSmallWavesSpeed: { value: 0.323 },
      uSmallWavesIterations: { value: 0 },
      uDepthColor: { value: new THREE.Color("#93c5fd") },
      uSurfaceColor: { value: new THREE.Color("#2579fe") },
      uColorOffset: { value: 0.0893 },
      uColorMultiplier: { value: 2.735 },
      fogColor: { value: new THREE.Color("#ffffff") },
      fogNear: { value: 1.0 },
      fogFar: { value: 3.0 }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      uniforms: uniforms
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -(0.5 * Math.PI);
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(75, 2.25, 0.1, 100);
    camera.position.set(1, 1.4, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(1800, 800);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      const elapsedTime = clock.getElapsedTime();
      if (uniforms.uTime) {
        uniforms.uTime.value = elapsedTime;
      }
      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      const items = document.querySelectorAll(".hero__pagination-item");
      items.forEach(btn => {
          const clone = btn.cloneNode(true);
          if(btn.parentNode) btn.parentNode.replaceChild(clone, btn);
      });
      allSquares.forEach(sq => {
          const clone = sq.cloneNode(true);
          if(sq.parentNode) sq.parentNode.replaceChild(clone, sq);
      });
      if (gridSvg) {
          const clone = gridSvg.cloneNode(true);
          if(gridSvg.parentNode) gridSvg.parentNode.replaceChild(clone, gridSvg);
      }
    };
  }, []);

  return (
    <section className="hero">
      <div className="container-wide">
        <div className="hero-stage-wrapper">
          <div className="hero__wrapper">
            <div className="hero__label">
              <p>Personal digital portfolio</p>
              {/* Using standard img tag to preserve natural aspect ratio, avoiding stretching from next/image */}
              <img src="/mine_nobg.png" alt="Nur Hadi Imamuddin" />
            </div>
            <div className="hero__clouds">
              <canvas ref={canvasRef} id="webgl-canvas" className="webgl"></canvas>
            </div>
            <div className="hero__grid">
              <div className="hero__grid-wrapper">
                <svg width="1350" height="610" viewBox="0 0 1350 610" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 0 H 1350 V 610 H 0 Z M1348.86 0H1229V54C1269.27 46.0974 1309.29 37.3227 1349 27.6759L1348.86 0Z M1229 0H1108V75.174C1148.88 68.9824 1188.57 61.9034 1229 53.9375V0Z M1108 0H985V91.0678C1026.16 86.6544 1067.18 81.3564 1108 75.174V0Z M985 0H861V101.664C902.437 99.019 943.789 95.4867 985 91.0678V0Z M861 0H737V106.93C778.38 106.054 819.732 104.299 861 101.664V0Z M737 0H613V106.922C654.324 107.802 695.676 107.805 737 106.93V0Z M613 0H489V101.64C530.268 104.28 571.62 106.119 613 107V0Z M489 0H365V91.0264C406.211 95.451 447.563 98.9888 489 101.64V0Z M365 0H243V75.267C283.492 81.3903 324.177 86.6434 365 91.0264V0Z M121 54.0584V0H243V75.267C202.117 69.0845 161.432 62.015 121 54.0584Z M121 54V0H1V27.614C40.7109 37.2884 80.7296 46.0837 121 54Z M1107 75C1147.88 68.8135 1188.57 61.9551 1229 54V159.273C1188.57 164.046 1147.88 167.788 1107 171.5V75Z M1107 75C1066.51 81.1811 1025.82 86.4778 985 90.8903V181C1025.82 178.353 1066.51 175.174 1107 171.466V75Z M985 181.011V91C943.976 95.3738 902.248 98.9273 861 101.556V187.5C902.248 185.923 943.976 183.635 985 181.011Z M861 101.5C819.732 104.133 778.38 105.969 737 106.844V190.658C778.38 190.132 819.732 189.08 861 187.5V101.5Z M737 190.608C695.676 191.132 654.324 191.527 613 191V106.844C654.324 107.722 695.676 107.716 737 106.844V190.608Z M613 106.75C571.62 105.87 530.268 104.029 489 101.391V187.688C530.268 189.27 571.62 190.472 613 191V106.75Z M365 181.438L365 91C406.075 95.3773 447.701 98.7682 489 101.399L489 187.72C447.701 186.142 406.075 184.064 365 181.438Z M243 172C283.492 175.677 324.177 178.832 365 181.464V91C324.177 86.6132 283.492 81.3553 243 75.2266V172Z M243 75.2125C202.118 69.026 161.432 61.9551 121 54V159.273C161.433 164.046 202.118 168.288 243 172V75.2125Z M985 181C1025.68 178.357 1066.65 174.874 1107 171.177L1107 268.667C1066.65 269.9 1025.68 270.619 985 271.5V181Z M985 181C943.789 183.651 902.437 185.771 861 187.358V273.764C902.437 273.235 943.789 272.528 985 271.644V181Z M861 187.341C819.732 188.921 778.38 189.975 737 190.5V274.817C778.38 274.642 819.732 274.291 861 273.764V187.341Z M613 274.816V191.014C654.324 191.542 695.676 191.025 737 190.5V274.817C695.676 274.992 654.324 274.992 613 274.816Z M613 190.825C571.62 190.297 530.268 189.24 489 187.656V273.759C530.268 274.287 571.62 274.639 613 274.815V190.825Z M365 181.344C406.211 183.999 447.563 186.128 489 187.719V273.759C447.563 273.229 406.211 272.521 365 271.636L365 181.344Z M365 181.431C324.176 178.81 283.491 175.667 243 172V267.856C283.491 269.078 324.176 270.626 365 271.5V181.431Z M985 271.5C943.933 272.382 902.291 272.972 861 273.5V360C902.437 360.53 943.789 361.113 985 362V271.5Z M861 273.446C819.732 273.973 778.38 274.325 737 274.5V359C778.38 359.175 819.732 359.473 861 360V273.446Z M737 274.814C695.676 274.989 654.324 274.989 613 274.812V359C654.324 358.824 695.676 358.823 737 358.998V274.814Z M613 274.688C571.62 274.511 530.268 274.247 489 273.719V360C530.268 359.471 571.62 359.176 613 359V274.688Z M365 271.5V362C406.075 361.122 447.701 360.544 489 360.017V273.659C447.701 273.131 406.075 272.378 365 271.5Z M861 360C819.806 359.473 778.305 359.175 737 359V442.878C778.38 443.404 819.732 444.415 861 446V360Z M736.963 443C695.651 442.475 654.312 442.44 613 442.969V359C654.312 358.824 695.688 358.825 737 359L736.963 443Z M489 360C530.132 359.472 571.757 359.176 613 359V442.814C571.62 443.344 530.268 444.407 489 446V360Z M737 527.942C695.676 527.057 654.324 527.062 613 527.954V442.781C654.253 442.248 695.734 442.298 736.987 442.828L737 527.942Z" fill="white" fillRule="evenodd" className="grid-mask transition-all"/>
                  
                  {/* Row: top edge squares */}
                  <path d="M1348.86 0H1229V54C1269.27 46.0974 1309.29 37.3227 1349 27.6759L1348.86 0Z" fill="white" className="grid-square transition-all"/>
                  <path d="M1229 0H1108V75.174C1148.88 68.9824 1188.57 61.9034 1229 53.9375V0Z" fill="white" className="grid-square transition-all"/>
                  <path d="M1108 0H985V91.0678C1026.16 86.6544 1067.18 81.3564 1108 75.174V0Z" fill="white" className="grid-square transition-all"/>
                  <path d="M985 0H861V101.664C902.437 99.019 943.789 95.4867 985 91.0678V0Z" fill="white" className="grid-square transition-all"/>
                  <path d="M861 0H737V106.93C778.38 106.054 819.732 104.299 861 101.664V0Z" fill="white" className="grid-square transition-all"/>
                  <path d="M737 0H613V106.922C654.324 107.802 695.676 107.805 737 106.93V0Z" fill="white" className="grid-square transition-all"/>
                  <path d="M613 0H489V101.64C530.268 104.28 571.62 106.119 613 107V0Z" fill="white" className="grid-square transition-all"/>
                  <path d="M489 0H365V91.0264C406.211 95.451 447.563 98.9888 489 101.64V0Z" fill="white" className="grid-square transition-all"/>
                  <path d="M365 0H243V75.267C283.492 81.3903 324.177 86.6434 365 91.0264V0Z" fill="white" className="grid-square transition-all"/>
                  <path d="M121 54.0584V0H243V75.267C202.117 69.0845 161.432 62.015 121 54.0584Z" fill="white" className="grid-square transition-all"/>
                  <path d="M121 54V0H1V27.614C40.7109 37.2884 80.7296 46.0837 121 54Z" fill="white" className="grid-square transition-all"/>

                  {/* Row 2 squares */}
                  <path d="M1107 75C1147.88 68.8135 1188.57 61.9551 1229 54V159.273C1188.57 164.046 1147.88 167.788 1107 171.5V75Z" fill="white" className="grid-square hide-on-hover transition-all"/>
                  <path d="M1107 75C1066.51 81.1811 1025.82 86.4778 985 90.8903V181C1025.82 178.353 1066.51 175.174 1107 171.466V75Z" fill="white" className="grid-square transition-all"/>
                  <path d="M985 181.011V91C943.976 95.3738 902.248 98.9273 861 101.556V187.5C902.248 185.923 943.976 183.635 985 181.011Z" fill="white" className="grid-square hide-on-hover transition-all"/>
                  <path d="M861 101.5C819.732 104.133 778.38 105.969 737 106.844V190.658C778.38 190.132 819.732 189.08 861 187.5V101.5Z" fill="white" className="grid-square transition-all"/>
                  <path d="M737 190.608C695.676 191.132 654.324 191.527 613 191V106.844C654.324 107.722 695.676 107.716 737 106.844V190.608Z" fill="white" className="grid-square transition-all"/>
                  <path d="M613 106.75C571.62 105.87 530.268 104.029 489 101.391V187.688C530.268 189.27 571.62 190.472 613 191V106.75Z" fill="white" className="grid-square transition-all"/>
                  <path d="M365 181.438L365 91C406.075 95.3773 447.701 98.7682 489 101.399L489 187.72C447.701 186.142 406.075 184.064 365 181.438Z" fill="white" className="grid-square hide-on-hover transition-all"/>
                  <path d="M243 172C283.492 175.677 324.177 178.832 365 181.464V91C324.177 86.6132 283.492 81.3553 243 75.2266V172Z" fill="white" className="grid-square transition-all"/>
                  <path d="M243 75.2125C202.118 69.026 161.432 61.9551 121 54V159.273C161.433 164.046 202.118 168.288 243 172V75.2125Z" fill="white" className="grid-square hide-on-hover transition-all"/>

                  {/* Row 3 squares */}
                  <path d="M985 181C1025.68 178.357 1066.65 174.874 1107 171.177L1107 268.667C1066.65 269.9 1025.68 270.619 985 271.5V181Z" fill="white" className="grid-square hide-on-hover transition-all"/>
                  <path d="M985 181C943.789 183.651 902.437 185.771 861 187.358V273.764C902.437 273.235 943.789 272.528 985 271.644V181Z" fill="white" className="grid-square hide-on-hover transition-all"/>
                  <path d="M861 187.341C819.732 188.921 778.38 189.975 737 190.5V274.817C778.38 274.642 819.732 274.291 861 273.764V187.341Z" fill="white" className="grid-square transition-all"/>
                  <path d="M613 274.816V191.014C654.324 191.542 695.676 191.025 737 190.5V274.817C695.676 274.992 654.324 274.992 613 274.816Z" fill="white" className="grid-square transition-all"/>
                  <path d="M613 190.825C571.62 190.297 530.268 189.24 489 187.656V273.759C530.268 274.287 571.62 274.639 613 274.815V190.825Z" fill="white" className="grid-square transition-all"/>
                  <path d="M365 181.344C406.211 183.999 447.563 186.128 489 187.719V273.759C447.563 273.229 406.211 272.521 365 271.636L365 181.344Z" fill="white" className="grid-square hide-on-hover transition-all"/>
                  <path d="M365 181.431C324.176 178.81 283.491 175.667 243 172V267.856C283.491 269.078 324.176 270.626 365 271.5V181.431Z" fill="white" className="grid-square hide-on-hover transition-all"/>

                  {/* Row 4 squares */}
                  <path d="M985 271.5C943.933 272.382 902.291 272.972 861 273.5V360C902.437 360.53 943.789 361.113 985 362V271.5Z" fill="white" className="grid-square hide-on-hover transition-all"/>
                  <path d="M861 273.446C819.732 273.973 778.38 274.325 737 274.5V359C778.38 359.175 819.732 359.473 861 360V273.446Z" fill="white" className="grid-square transition-all"/>
                  <path d="M737 274.814C695.676 274.989 654.324 274.989 613 274.812V359C654.324 358.824 695.676 358.823 737 358.998V274.814Z" fill="white" className="grid-square transition-all"/>
                  <path d="M613 274.688C571.62 274.511 530.268 274.247 489 273.719V360C530.268 359.471 571.62 359.176 613 359V274.688Z" fill="white" className="grid-square transition-all"/>
                  <path d="M365 271.5V362C406.075 361.122 447.701 360.544 489 360.017V273.659C447.701 273.131 406.075 272.378 365 271.5Z" fill="white" className="grid-square hide-on-hover transition-all"/>

                  {/* Row 5+ squares */}
                  <path d="M861 360C819.806 359.473 778.305 359.175 737 359V442.878C778.38 443.404 819.732 444.415 861 446V360Z" fill="white" className="grid-square transition-all"/>
                  <path d="M736.963 443C695.651 442.475 654.312 442.44 613 442.969V359C654.312 358.824 695.688 358.825 737 359L736.963 443Z" fill="white" className="grid-square transition-all"/>
                  <path d="M489 360C530.132 359.472 571.757 359.176 613 359V442.814C571.62 443.344 530.268 444.407 489 446V360Z" fill="white" className="grid-square transition-all"/>

                  {/* Bottom squares */}
                  <path d="M737 527.942C695.676 527.057 654.324 527.062 613 527.954V442.781C654.253 442.248 695.734 442.298 736.987 442.828L737 527.942Z" fill="white" className="grid-square transition-all"/>

                  
                  <defs>
                    <clipPath id="boxes-clip">
                      <path d="M1348.86 0H1229V54C1269.27 46.0974 1309.29 37.3227 1349 27.6759L1348.86 0Z M1229 0H1108V75.174C1148.88 68.9824 1188.57 61.9034 1229 53.9375V0Z M1108 0H985V91.0678C1026.16 86.6544 1067.18 81.3564 1108 75.174V0Z M985 0H861V101.664C902.437 99.019 943.789 95.4867 985 91.0678V0Z M861 0H737V106.93C778.38 106.054 819.732 104.299 861 101.664V0Z M737 0H613V106.922C654.324 107.802 695.676 107.805 737 106.93V0Z M613 0H489V101.64C530.268 104.28 571.62 106.119 613 107V0Z M489 0H365V91.0264C406.211 95.451 447.563 98.9888 489 101.64V0Z M365 0H243V75.267C283.492 81.3903 324.177 86.6434 365 91.0264V0Z M121 54.0584V0H243V75.267C202.117 69.0845 161.432 62.015 121 54.0584Z M121 54V0H1V27.614C40.7109 37.2884 80.7296 46.0837 121 54Z M1107 75C1147.88 68.8135 1188.57 61.9551 1229 54V159.273C1188.57 164.046 1147.88 167.788 1107 171.5V75Z M1107 75C1066.51 81.1811 1025.82 86.4778 985 90.8903V181C1025.82 178.353 1066.51 175.174 1107 171.466V75Z M985 181.011V91C943.976 95.3738 902.248 98.9273 861 101.556V187.5C902.248 185.923 943.976 183.635 985 181.011Z M861 101.5C819.732 104.133 778.38 105.969 737 106.844V190.658C778.38 190.132 819.732 189.08 861 187.5V101.5Z M737 190.608C695.676 191.132 654.324 191.527 613 191V106.844C654.324 107.722 695.676 107.716 737 106.844V190.608Z M613 106.75C571.62 105.87 530.268 104.029 489 101.391V187.688C530.268 189.27 571.62 190.472 613 191V106.75Z M365 181.438L365 91C406.075 95.3773 447.701 98.7682 489 101.399L489 187.72C447.701 186.142 406.075 184.064 365 181.438Z M243 172C283.492 175.677 324.177 178.832 365 181.464V91C324.177 86.6132 283.492 81.3553 243 75.2266V172Z M243 75.2125C202.118 69.026 161.432 61.9551 121 54V159.273C161.433 164.046 202.118 168.288 243 172V75.2125Z M985 181C1025.68 178.357 1066.65 174.874 1107 171.177L1107 268.667C1066.65 269.9 1025.68 270.619 985 271.5V181Z M985 181C943.789 183.651 902.437 185.771 861 187.358V273.764C902.437 273.235 943.789 272.528 985 271.644V181Z M861 187.341C819.732 188.921 778.38 189.975 737 190.5V274.817C778.38 274.642 819.732 274.291 861 273.764V187.341Z M613 274.816V191.014C654.324 191.542 695.676 191.025 737 190.5V274.817C695.676 274.992 654.324 274.992 613 274.816Z M613 190.825C571.62 190.297 530.268 189.24 489 187.656V273.759C530.268 274.287 571.62 274.639 613 274.815V190.825Z M365 181.344C406.211 183.999 447.563 186.128 489 187.719V273.759C447.563 273.229 406.211 272.521 365 271.636L365 181.344Z M365 181.431C324.176 178.81 283.491 175.667 243 172V267.856C283.491 269.078 324.176 270.626 365 271.5V181.431Z M985 271.5C943.933 272.382 902.291 272.972 861 273.5V360C902.437 360.53 943.789 361.113 985 362V271.5Z M861 273.446C819.732 273.973 778.38 274.325 737 274.5V359C778.38 359.175 819.732 359.473 861 360V273.446Z M737 274.814C695.676 274.989 654.324 274.989 613 274.812V359C654.324 358.824 695.676 358.823 737 358.998V274.814Z M613 274.688C571.62 274.511 530.268 274.247 489 273.719V360C530.268 359.471 571.62 359.176 613 359V274.688Z M365 271.5V362C406.075 361.122 447.701 360.544 489 360.017V273.659C447.701 273.131 406.075 272.378 365 271.5Z M861 360C819.806 359.473 778.305 359.175 737 359V442.878C778.38 443.404 819.732 444.415 861 446V360Z M736.963 443C695.651 442.475 654.312 442.44 613 442.969V359C654.312 358.824 695.688 358.825 737 359L736.963 443Z M489 360C530.132 359.472 571.757 359.176 613 359V442.814C571.62 443.344 530.268 444.407 489 446V360Z M737 527.942C695.676 527.057 654.324 527.062 613 527.954V442.781C654.253 442.248 695.734 442.298 736.987 442.828L737 527.942Z" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#boxes-clip)">
                  {/* Horizontal curved stroke lines */}
                  <path d="M612.8 527.266C654.194 526.382 695.617 526.378 737.012 527.254" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M489 446C612.747 441.341 737.251 441.333 861 445.979" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M985 362C779.504 358.002 570.499 358 365 361.994" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M242.771 268.174C527.952 277.045 822.735 277.041 1107.91 268.165" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M121.165 159.011C483.816 201.817 866.877 201.806 1229.52 158.976" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M1 27C437.914 134.333 912.086 134.333 1349 27" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>

                  {/* Vertical stroke lines */}
                  <path d="M1229 0L1229 268" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M1107 0L1107 362" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M985 0C985 148.337 985 296.673 985 445" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M861 0C861 175.333 861 350.667 861 526" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M737 0L737 610" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M613 0L613 610" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M489 0L489 526" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M365 0C365 148.337 365 296.673 365 445" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M243 0L243 362" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <path d="M121 0L121 268" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <line x1="1.25" y1="-1.09278e-08" x2="1.25001" y2="159" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                  <line x1="1348.5" y1="-1.09278e-08" x2="1348.5" y2="159" stroke="#232323" strokeOpacity="0.2" strokeWidth="0.5" strokeMiterlimit="10"/>
                </g>
                </svg>

              </div>
            </div>
          </div>
        </div>

        <div className="hero__info">
          <div className="hero__info-left">
            <p className="heading-h4">Hello, I'm Nur <span style={{ backgroundColor: "var(--color-blue)", color: "white", padding: "0 8px" }}>Hadi</span> Imamuddin</p>
            <p className="body-text-m">January 18, 2005</p>
            <p className="body-text-m">Probolinggo, East Java, Indonesia</p>
          </div>

          <div className="hero__info-right">
            <p className="heading-h4">What I Do</p>
            <div className="hero__info-right-inner">
              <p className="body-text-m">build modern web applications, intuitive user interfaces, and smart IoT solutions with a focus on performance and reliability.</p>
              <a className="more-link body-text-s" href="#contact">Contact me -&gt;</a>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
