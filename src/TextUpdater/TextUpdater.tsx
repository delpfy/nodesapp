import React from "react";
import { Handle, Position } from "react-flow-renderer";
import "./text-updater-node.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { initialState, nodesValues, updateNodeValue } from "../redux/nodesSlice";

const TextUpdaterNode: React.FC<{id: string}> = ({id}) => {

    const dispatch = useAppDispatch();
    const values = useAppSelector(nodesValues)
 
    const handleSelectChange  = React.useCallback(
    (evt: React.ChangeEvent<HTMLSelectElement>) => {
     dispatch(updateNodeValue({id: parseInt(id), value:evt.target.value }))
     
     console.log("CURRENT VALUE: " + values[parseInt(id)-1].value.length)
    },
    []
  )
  

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={true}
      />
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <select  onChange={handleSelectChange}     className="nodrag">
          <option value="" disabled selected hidden>
          {
           values[parseInt(id)-1].value.length == 0 ?
            "Виберіть значення" :
            "Варіант "+ values[parseInt(id)-1].value
        } 
          
          </option>
          
          <option value="1">Варіант {values[parseInt(id)-1].value}</option>
          <option value="2">Варіант {values[parseInt(id)-1].value}</option>
          <option value="3">Варіант {values[parseInt(id)-1].value}</option>
          <option value="4">Варіант {values[parseInt(id)-1].value}</option>
          <option value="5">Варіант {values[parseInt(id)-1].value}</option>
          <option value="6">Варіант {values[parseInt(id)-1].value}</option>
        </select>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={true}
      />
    </div>
  );
};

export default TextUpdaterNode;
