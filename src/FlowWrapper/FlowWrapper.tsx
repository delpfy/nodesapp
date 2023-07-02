import React, { useCallback } from "react";

import ReactFlow, {
    ReactFlowProvider,
    ReactFlowInstance,
    Controls,
    NodeDragHandler,
  
    Edge,
    OnConnect,
    addEdge,
    OnNodesChange,
    applyNodeChanges,
    FitViewOptions,
    DefaultEdgeOptions,
  } from "react-flow-renderer";


import {
  addNode,
  
  initialState,
  
  selectNodes,
  setNodes,
  updateNodePosition,
} from "../redux/nodesSlice";
import { Node } from "../redux/types";

import { useAppDispatch, useAppSelector } from "../redux/hooks";




const FlowWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(selectNodes);

 
  const [edges, setEdges] = React.useState<Edge[]>(initialState.edges);

  const reactFlowInstance = React.useRef<ReactFlowInstance>(null);

  const onLoad = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView();
    }
  }, []);

  

  /* const onElementsRemove = useCallback((elementsToRemove: Node[]) => {
    setElements((prevElements) =>
      prevElements.filter((element) => !elementsToRemove.includes(element))
    );
  }, []); */

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const fitViewOptions: FitViewOptions = {
    padding: 0.2,
  };
  
  const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
  };
  
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    (event, node) => {
      dispatch(updateNodePosition({ id: node.id, position: node.position }));
    },
    [dispatch]
  );

  const addNewNode = () => {
    const id = String(nodes.length + 1);
    const newNode = {
      id,
      data: { label: `Node ${id}` },
      position: { x: 0, y: 0 },
    };
    dispatch(addNode(newNode));
  };

  return (
    <div style={{ height: "600px" }}>
      <button onClick={addNewNode}>Add Node</button>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          onLoad={onLoad}
          onNodesChange={onNodesChange}
         /*  onNodesDelete={onElementsRemove} */
          edges={edges}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          fitView
      fitViewOptions={fitViewOptions}
      defaultEdgeOptions={defaultEdgeOptions}
        >
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowWrapper;
