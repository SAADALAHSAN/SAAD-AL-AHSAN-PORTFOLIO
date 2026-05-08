import * as THREE from "three";
import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
} from "@react-three/rapier";

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const spheresData = [...Array(20)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

function SphereGeo({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, material, isActive }) {
  const api = useRef(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3(), isActive }) {
  const ref = useRef(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

function InstancedSpheres({ isActive }) {
  const imageUrls = [
    "/images/react2.webp",
    "/images/next2.webp",
    "/images/node2.webp",
    "/images/express.webp",
    "/images/mongo.webp",
    "/images/mysql.webp",
    "/images/typescript.webp",
    "/images/javascript.webp",
  ];
  
  const textures = useTexture(imageUrls);
  
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          color: "#ffffff",
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.2,
          metalness: 0.0,
          roughness: 0.8,
          envMapIntensity: 0.0,
        })
    );
  }, [textures]);

  return (
    <>
      {spheresData.map((props, i) => (
        <SphereGeo
          key={i}
          {...props}
          material={materials[Math.floor(Math.random() * materials.length)]}
          isActive={isActive}
        />
      ))}
    </>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = window.innerHeight * 1.5; 
      setIsActive(scrollY > threshold);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full h-[600px] relative rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f13] shadow-2xl">
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        
        <Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            <InstancedSpheres isActive={isActive} />
          </Physics>
          
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
        </Suspense>
        
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#050505" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
      <div className="absolute top-8 left-8 pointer-events-none">
        <h3 className="text-2xl font-bold tracking-widest text-white/90">TECH STACK <span className="text-white/30 text-sm ml-2">INTERACTIVE</span></h3>
      </div>
    </div>
  );
};

export default TechStack;

