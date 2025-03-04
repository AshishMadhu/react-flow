import React, { memo, FC, useMemo, CSSProperties } from 'react';

import { Handle, Position, NodeProps } from 'react-flow-renderer';

const nodeStyles: CSSProperties = { padding: 10, border: '1px solid #ddd' };

const CustomNode: FC<NodeProps> = ({ data }) => {
  const handles = useMemo(
    () =>
      Array.from({ length: data.handleCount }, (x, i) => {
        const handleId = `handle-${i}`;
<<<<<<< HEAD
        return <Handle key={handleId} type="source" position={Position.Right} id={handleId} style={{ top: 10 * i }} />;
      }),
    [data.handleCount]
=======
        return (
          <Handle
            key={handleId}
            type="source"
            position={Position.Right}
            id={handleId}
            style={{ top: 10 * i + data.handlePosition * 10 }}
          />
        );
      }),
    [data.handleCount, data.handlePosition]
>>>>>>> 0950e52f9368e1f86a3c992c0e3a6617b12bacb4
  );

  return (
    <div style={nodeStyles}>
      <Handle type="target" position={Position.Left} />
      <div>output handle count: {data.handleCount}</div>
      {handles}
    </div>
  );
};

export default memo(CustomNode);
