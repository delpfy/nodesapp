import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { Node, Edge } from "./types";

interface NodesState {
  nodes: Node[];
  edges: Edge[];
  values: { id: number; value: string[] }[];
}

export const initialState: NodesState = {
  nodes: JSON.parse(localStorage.getItem("nodes") || "{}"),
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
  ],
  values: [
    { id: 1, value: [] },
    { id: 2, value: [] },
    { id: 3, value: [] },
    { id: 4, value: [] },
  ],
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const { id, position } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.position = position;
        const nodesInStorage = JSON.parse(
          localStorage.getItem("nodes") || "{}"
        );

        nodesInStorage[parseInt(id) - 1].position = position;
        localStorage.setItem("nodes", JSON.stringify(nodesInStorage));
      }
    },

    setNodes: (state, action) => {
      state.nodes = action.payload;
    },

    updateNodeValue: (
      state,
      action: PayloadAction<{ id: number; value: string }>
    ) => {
      const node = state.values.find((v) => v.id === action.payload.id);
      if (node) {
        if (node.id === 1) {
          node.value.pop();
          node.value.push(action.payload.value);

          state.values.forEach((item, i) => {
            if (item.id !== node.id) {
              item.value[0] = action.payload.value;
            }
          });
        } else {
          state.values.forEach((item, i) => {
            if (item.id >= node.id) {
              item.value[node.id - 1] = "-" + action.payload.value;
            }
          });
        }
      }
    },
  },
});

export const { updateNodePosition, updateNodeValue, setNodes } =
  nodesSlice.actions;
export const selectNodes = (state: RootState) => state.node.nodes;
export const nodesValues = (state: RootState) => state.node.values;

export default nodesSlice.reducer;
