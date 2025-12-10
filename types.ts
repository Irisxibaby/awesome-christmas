import React from 'react';

export type TreeState = 'CHAOS' | 'FORMED';

export interface TreeColors {
  bottom: string;
  top: string;
}

export interface HandGesture {
  isOpen: boolean;
  position: { x: number; y: number }; // Normalized -1 to 1
  isDetected: boolean;
}

interface ThreeElements {
  ambientLight: any;
  pointLight: any;
  spotLight: any;
  group: any;
  mesh: any;
  points: any;
  instancedMesh: any;
  bufferGeometry: any;
  boxGeometry: any;
  sphereGeometry: any;
  planeGeometry: any;
  torusKnotGeometry: any;
  meshStandardMaterial: any;
  meshBasicMaterial: any;
  shaderMaterial: any;
  bufferAttribute: any;
  primitive: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}