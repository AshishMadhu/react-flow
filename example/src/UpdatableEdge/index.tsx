import React, { useState } from 'react';
import ReactFlow, {
  Controls,
  updateEdge,
  addEdge,
  Elements,
  OnLoadParams,
  Connection,
  Edge,
} from 'react-flow-renderer';

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          Node <strong>A</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: (
        <>
          Node <strong>B</strong>
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: (
        <>
          Node <strong>C</strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'This is a draggable edge' },
];

const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.fitView();
<<<<<<< HEAD
=======
const onEdgeUpdateStart = (_: React.MouseEvent, edge: Edge) => console.log('start update', edge);
>>>>>>> 0950e52f9368e1f86a3c992c0e3a6617b12bacb4

const UpdatableEdge = () => {
  const [elements, setElements] = useState<Elements>(initialElements);
  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));

  return (
<<<<<<< HEAD
    <ReactFlow elements={elements} onLoad={onLoad} snapToGrid={true} onEdgeUpdate={onEdgeUpdate} onConnect={onConnect}>
=======
    <ReactFlow
      elements={elements}
      onLoad={onLoad}
      snapToGrid={true}
      onEdgeUpdate={onEdgeUpdate}
      onConnect={onConnect}
      onEdgeUpdateStart={onEdgeUpdateStart}
    >
>>>>>>> 0950e52f9368e1f86a3c992c0e3a6617b12bacb4
      <Controls />
    </ReactFlow>
  );
};

export default UpdatableEdge;
