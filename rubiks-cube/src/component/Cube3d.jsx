import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function Cube3d(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [upPressed, upPress] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += (upPressed ? 0.01 : 0)));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale = {clicked ? 1.5 : 1.0}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      onKeyPress={(event) => alert(`${event.key} was pressed`)}
    >
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial
        wireframe={props.wireframe}
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}
 
export default Cube3d;