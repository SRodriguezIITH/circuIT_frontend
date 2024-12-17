
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Link from 'next/link';
import Image from 'next/image';
//import { HStack } from '@/components/ui/';

import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
    weight:'400',
    subsets:['latin'],
})

interface Component {
  name: string;
  selected: boolean;
}

const componentsList: Component[] = [
  { name: 'arduino', selected: false },
  { name: 'battery', selected: false },
  { name: 'breadboard', selected: false },
  { name: 'led', selected: false },
  { name: 'motor', selected: false },
  { name: 'resistor', selected: false },
  { name: 'switch', selected: false },
  { name: 'wheel', selected: false },
];

const componentToCharCode: Record<string, string> = {
  arduino: 'A',
  battery: 'Y',
  breadboard: 'B',
  led: 'L',
  motor: 'M',
  resistor: 'R',
  switch: 'S',
  wheel: 'W',
};

const CHome = () => {
  const [components, setComponents] = useState<Component[]>(componentsList);
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRadioChange = (name: string, value: boolean) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.name === name ? { ...component, selected: value } : component
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const selectedVertices = components.filter((c) => c.selected).map((c) => c.name);
    try {
      await axios.post('http://127.0.0.1:5000/select_components', { selected_vertices: selectedVertices });
      const { data } = await axios.post('http://127.0.0.1:5000/get_3d_data', {});

      setResponseData(data.data);
    } catch (error) {
      setError('An error occurred while fetching data. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (responseData) {
      const updatedComponents = components.map((component) => {
        const charCode = componentToCharCode[component.name];
        const selectedValues = responseData[charCode];
        const isSelected = selectedValues ? selectedValues.length > 0 : false;
        return { ...component, selected: isSelected };
      });
      setComponents(updatedComponents);

      render3DModels(responseData);
    }
  }, [responseData]);

  const render3DModels = (data: { [key: string]: number[] }) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = document.getElementById('3d-view');
    if (!container) {
      console.error('3D view container not found');
      return;
    }
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const pcdLoader = new PCDLoader();
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const loadedVertices: { [key: string]: THREE.Vector3 } = {};
    const colorMap: { [key: string]: THREE.Color } = {};
    const indexToCharCode: { [key: number]: string } = {
      0: 'A',
      1: 'Y',
      2: 'B',
      3: 'L',
      4: 'M',
      5: 'R',
      6: 'S',
      7: 'W',
      8: 'C',
      9: 'N',
    };

    // Generate a unique color for each vertex
    const generateRandomColor = () => new THREE.Color(Math.random(), Math.random(), Math.random());

    // Randomize position for each component
    const randomPosition = () => new THREE.Vector3(
      Math.random() * 10 - 5,  // X between -5 and 5
      Math.random() * 10 - 5,  // Y between -5 and 5
      Math.random() * 10 - 5   // Z between -5 and 5
    );

    const loadPCDFile = (vertexName: string, pcdPath: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        pcdLoader.load(
          pcdPath,
          (points: THREE.Points) => {
            points.name = vertexName;
            points.geometry.computeBoundingBox();
            const center = points.geometry.boundingBox?.getCenter(new THREE.Vector3()) || new THREE.Vector3();
            loadedVertices[vertexName] = randomPosition(); // Assign random position

            // Assign a color to the PCD file
            if (!colorMap[vertexName]) {
              colorMap[vertexName] = generateRandomColor();
            }
            const color = colorMap[vertexName];
            points.material = new THREE.PointsMaterial({ color, size: 0.1 });
            points.position.copy(loadedVertices[vertexName]); // Set position to random position
            scene.add(points);
            resolve();
          },
          undefined,
          (error: ErrorEvent) => {
            console.error(`Error loading PCD for ${vertexName}:`, error);
            reject(error);
          }
        );
      });
    };

    const connectEdges = () => {
      for (const [charCode, edges] of Object.entries(data)) {
        const vertexName = Object.keys(componentToCharCode).find(
          (key) => componentToCharCode[key] === charCode
        );
        if (!vertexName || !loadedVertices[vertexName]) continue;

        const startVertex = loadedVertices[vertexName];
        (edges as number[]).forEach((index) => {
          const targetCharCode = indexToCharCode[index];
          const targetVertexName = Object.keys(componentToCharCode).find((key) => componentToCharCode[key] === targetCharCode);
          if (targetVertexName && loadedVertices[targetVertexName]) {
            const endVertex = loadedVertices[targetVertexName];

            const geometry = new THREE.BufferGeometry().setFromPoints([startVertex, endVertex]);
            const line = new THREE.Line(geometry, material);
            lineGroup.add(line);
          }
        });
      }
    };
    
    
    

    const loadAllPCDFiles = async () => {
      const promises = Object.keys(data).map((charCode) => {
        const vertexName = Object.keys(componentToCharCode).find((key) => componentToCharCode[key] === charCode);
        if (!vertexName) return Promise.resolve();

        const pcdPath = `./elec_comp_pcd/${charCode}.pcd`;
        return loadPCDFile(vertexName, pcdPath);
      });

      await Promise.all(promises);
      connectEdges();
    };

    loadAllPCDFiles();
    camera.position.set(0, 0, 10);

    const animate = () => {
      controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  return (
    <>
  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
    <span
      className={ubuntu.className}
      style={{
        fontSize: '3rem',
        padding: '2rem',
        color: '#1d1d1d',
        letterSpacing: '1px',
        display: 'inline-block',
        maxWidth: '100%',
        wordBreak: 'break-word',
      }}
    >
      Circu
      <span style={{ color: '#30EB33', fontWeight: '700' }}>IT</span> GPT
    </span>
  </div>

  <div
    style={{
      backgroundColor: '#1d1d1d',
      color: '#fff',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      maxWidth: '800px',
      margin: '0 auto',
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 150px)', // Ensure the container fits within the window height
    }}
  >
    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
      Select Components for Your Circuit
    </h2>
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: '15px' }}>
        {components.map((component, index) => (
          <div
            key={component.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #444',
              paddingBottom: '10px',
            }}
          >
            <label style={{ fontSize: '1.2rem', margin: '0' }}>
              <input
                type="checkbox"
                checked={component.selected}
                onChange={(e) => handleRadioChange(component.name, e.target.checked)}
                style={{ width: '20px', height: '20px', marginRight: '10px' }}
              />
              {component.name}
            </label>
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: '500',
                color: component.selected ? '#30EB33' : '#888',
              }}
            >
              {component.selected ? 'Selected' : 'Not Selected'}
            </span>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          fontSize: '18px',
          padding: '12px 25px',
          backgroundColor: '#30EB33',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '100%',
          marginTop: '20px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#28a745')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#30EB33')}
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </form>
    {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>}

    <div
      id="3d-view"
      style={{
        width: '100%',
        height: '500px',
        marginTop: '30px',
        borderRadius: '8px',
        backgroundColor: '#000',
        overflow: 'auto', // Ensure it scrolls if it exceeds the available space
      }}
    ></div>
  </div>

  {/* Responsive Adjustments */}
  <style jsx>{`
    @media (max-width: 768px) {
      .${ubuntu.className} {
        font-size: 2rem;
      }
      h2 {
        font-size: 1.5rem;
      }
      button {
        font-size: 16px;
        padding: 10px 20px;
      }
      #3d-view {
        height: 400px;
      }
    }
  `}</style>
</>


  );
};

export default CHome;
