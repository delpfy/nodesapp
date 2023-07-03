import React, { useCallback } from "react";

import ReactFlow, {
  ReactFlowProvider,
  ReactFlowInstance,
  Controls,
  NodeDragHandler,
  OnConnect,
  addEdge,
  FitViewOptions,
  DefaultEdgeOptions,
} from "react-flow-renderer";

import {
  initialState,
  selectNodes,
  updateNodePosition,
} from "../redux/nodesSlice";
import { Edge } from "../redux/types";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import TextUpdaterNode from "../VariantOptions/VariantOptions";

const FlowWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(selectNodes);

  const nodeTypes = { textUpdater: TextUpdaterNode };

  const [edges, setEdges] = React.useState<Edge[]>(initialState.edges);

  const reactFlowInstance = React.useRef<ReactFlowInstance>(null);

  const onLoad = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView();
    }
  }, []);

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

  const onNodeDragStop: NodeDragHandler = useCallback(
    (event, node) => {
      dispatch(updateNodePosition({ id: node.id, position: node.position }));
    },
    [dispatch]
  );

  return (
    <div style={{ height: "600px" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onLoad={onLoad}
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
