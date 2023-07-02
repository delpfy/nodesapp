import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import {Node} from './types'
import { Edge } from 'react-flow-renderer';
import { act } from '@testing-library/react';

interface NodesState {
  nodes: Node[];
  edges: Edge[];
}

export const initialState: NodesState = {
  nodes: [{ id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },],
  edges: [],
};

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    updateNodePosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const { id, position } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.position = position;
      }
    },

    setNodes: (state, action) => {
        state.nodes = action.payload;
    }
    
  },
});

export const { addNode, updateNodePosition, setNodes } = nodesSlice.actions;
export const selectNodes = (state: RootState) => state.node.nodes;

export default nodesSlice.reducer;