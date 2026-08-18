import React, { useState } from "react";
import { dataFiles } from "./data";

const Files = ({ files }) => {
  return (
    <div>
      {files.map((node) => (
        <div key={node.id}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span>{"+"}</span>
            <span>{node.name}</span>
            <span>{"📂"}</span>
            <span>{"📄"}</span>
          </div>
          <div style={{ padding: "0px 20px" }}>
            {node.children && <Files files={node.children} />}
          </div>
        </div>
      ))}
    </div>
  );
};

const FileFolder = () => {
  const [files, setFiles] = useState(dataFiles);

  return (
    <div>
      <Files files={files} />
    </div>
  );
};

export default FileFolder;
