import React, { useCallback } from "react";
import create  from 'zustand';
import ReactFlow, {
  ReactFlowProvider,
  ReactFlowInstance,
  Controls,
  NodeDragHandler,
  OnConnect,
  addEdge,
  OnNodesChange,
  applyNodeChanges,
  FitViewOptions,
  DefaultEdgeOptions,
  OnEdgesChange,
  applyEdgeChanges,
} from "react-flow-renderer";

import {
  addNode,
  initialState,
  selectNodes,
  setNodes,
  updateNodePosition,
} from "../redux/nodesSlice";
import { Node, Edge } from "../redux/types";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import TextUpdater from "../TextUpdater/TextUpdater";
import TextUpdaterNode from "../TextUpdater/TextUpdater";



const FlowWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(selectNodes);

  
  //const edges = useAppSelector(selectEdges);

  const [edges, setEdges] = React.useState<Edge[]>(initialState.edges);
  const [selectedValue, setSelectedValue] = React.useState<string | number | readonly string[] | undefined>("");

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
    (connection) => setEdges((eds: Edge[]) => addEdge(connection, eds)),
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

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    (event, node) => {
      dispatch(updateNodePosition({ id: node.id, position: node.position }));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (selectedValue !== null) {
      const updatedNodes = nodes.map((node, index) => {
        if (index !== 0) {
          return {
            ...node,
            data: {
              ...node.data,
              label: `${selectedValue}-${node.data.label}`,
            },
          };
        }
        return node;
      });
      setNodes(updatedNodes);
    }
  }, [selectedValue, nodes]);

  const nodeTypes = ({textUpdater: TextUpdaterNode});

  /* const addNewNode = () => {
    const id = String(nodes.length + 1);
    const newNode = {
      id,
      type: nodeTypes,
      data: { label: `Node ${id}` },
      position: { x: 0, y: 0 },
      style: nodeStyle
    };
    dispatch(addNode(newNode));
  }; */

  return (
    <div style={{ height: "600px" }}>
      {/* <button onClick={addNewNode}>Add Node</button> */}
      
      <ReactFlowProvider>
      
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onLoad={onLoad}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          /*  onNodesDelete={onElementsRemove} */
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
