import React from "react";
import { Handle, Position } from "react-flow-renderer";
import "./text-updater-node.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { nodesValues, updateNodeValue } from "../redux/nodesSlice";

const VariantOptions: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const values = useAppSelector(nodesValues);

  const handleSelectChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("evt.target.value " + evt.target.value)
      dispatch(updateNodeValue({ id: parseInt(id), value: evt.target.value }));
    },
    [id, dispatch]
  );

  function displayVariants() {
    let variants = ' ';
    if(values){
      values[parseInt(id) - 1].value.map((value) => {
        variants += value;
      })
    }
    else{
      variants = '1'
    }
    return variants.slice(0, -1);
  }

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={true}
      />
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <select onChange={handleSelectChange} defaultValue={values[parseInt(id) - 1].value.length === 0
              ? "Виберіть значення"
              : "Варіант " + values[parseInt(id) - 1].value} className="nodrag">
          

          <option value="1">Варіант {displayVariants() + '1'}</option>
          <option value="2">Варіант {displayVariants() + '2' }</option>
          <option value="3">Варіант {displayVariants() + '3' }</option>
          <option value="4">Варіант {displayVariants() + '4' }</option>
          <option value="5">Варіант {displayVariants() + '5' }</option>
          <option value="6">Варіант {displayVariants() + '6' }</option>
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

export default VariantOptions;
