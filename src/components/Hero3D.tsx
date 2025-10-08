import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

function CodeParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random particle positions in a more dynamic pattern
  const particleCount = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Create a spiral galaxy pattern
      const radius = Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 6;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Gradient colors from blue to purple
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.2);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { pos, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions.pos}
      colors={positions.colors}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingCodeSymbol({ 
  position, 
  symbol, 
  delay = 0 
}: { 
  position: [number, number, number]; 
  symbol: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() + delay;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.8;
      
      // Pulsing scale effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.9, 0.6)}
        wireframe
        emissive={new THREE.Color().setHSL(0.6, 0.8, 0.3)}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function CodeRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#6366f1"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
}

export default function Hero3D() {
  const codeSymbols = ['<>', '{}', '[]', '()', '/>', '<?'];
  
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#6366f1"
        />
        
        <CodeParticles />
        <CodeRing />
        
        {codeSymbols.map((symbol, index) => {
          const angle = (index / codeSymbols.length) * Math.PI * 2;
          const radius = 4;
          return (
            <FloatingCodeSymbol
              key={symbol}
              position={[
                Math.cos(angle) * radius,
                Math.sin(index) * 2,
                Math.sin(angle) * radius
              ]}
              symbol={symbol}
              delay={index * 0.5}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
