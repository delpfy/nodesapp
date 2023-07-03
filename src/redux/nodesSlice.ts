import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { Node, Edge } from "./types";

interface NodesState {
  nodes: Node[];
  edges: Edge[];
  values: { id: number; value: string[] }[];
}

export const initialState: NodesState = {
  nodes: [
    {
      id: "1",
      type: "textUpdater",
      data: { label: "Node 1" },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      type: "textUpdater",
      data: { label: "Node 2" },
      position: { x: 210, y: 115 },
    },
    {
      id: "3",
      type: "textUpdater",
      data: { label: "Node 3" },
      position: { x: 420, y: 230 },
    },
    {
      id: "4",
      type: "textUpdater",
      data: { label: "Node 4" },
      position: { x: 630, y: 345 },
    },
  ],
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
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const { id, position } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.position = position;
      }
    },

    setNodes: (state, action) => {
      state.nodes = action.payload;
    },

    changeEdges: (state, action) => {
      state.nodes = action.payload;
    },

    updateNodeValue : (state, action:PayloadAction<{id: number, value: string}>)=> {
      const node = state.values.find((v) => v.id === action.payload.id);
       if(node){
        if(node.id === 1){
          node.value.pop();
          node.value.push(action.payload.value )

          state.values.forEach((item, i) => {if(item.id !== node.id){item.value[0] = action.payload.value}} )
          
          console.log("\nNEWLINE\nVALUE 1: " + state.values.find((v)=> v.id == 1)?.value)
          console.log("VALUE 2: " + state.values.find((v)=> v.id == 2)?.value)
          console.log("VALUE 3: " + state.values.find((v)=> v.id == 3)?.value)
          console.log("VALUE 4: " + state.values.find((v)=> v.id == 4)?.value)
        }
        else{
          
          
          state.values.forEach((item, i) => {if(item.id >= node.id){item.value[node.id-1] = ("-" + action.payload.value)}} )

          console.log("\nNEWLINE\nVALUE 1: " + state.values.find((v)=> v.id == 1)?.value)
          console.log("VALUE 2: " + state.values.find((v)=> v.id == 2)?.value)
          console.log("VALUE 3: " + state.values.find((v)=> v.id == 3)?.value)
          console.log("VALUE 4: " + state.values.find((v)=> v.id == 4)?.value)
        }
        
        console.log("ID: " + node.id);
        console.log("VALUE: " + node.value);
       }
    },


  },
});

export const { addNode, updateNodePosition, updateNodeValue, setNodes, changeEdges } =
  nodesSlice.actions;
export const selectNodes = (state: RootState) => state.node.nodes;
export const nodesValues = (state: RootState) => state.node.values;

export default nodesSlice.reducer;
