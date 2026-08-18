import React, { useState } from "react";
import { dataFiles } from "./data";

const Files = ({ files, isOpen, setIsOpen }) => {
  return (
    <div>
      {files.map((node) => (
        <div key={node.id}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {node.isFolder && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setIsOpen((p) => ({ ...p, [node.id]: !p[node.id] }))
                }>
                {isOpen[node.id] ? "-" : "+"}
              </span>
            )}
            <span>{node.name}</span>
            {node.isFolder && (
              <>
                <span style={{ cursor: "pointer" }}>{"📂"}</span>
                <span style={{ cursor: "pointer" }}>{"📄"}</span>
              </>
            )}
          </div>
          <div style={{ padding: "0px 20px" }}>
            {node.children && isOpen[node.id] && (
              <Files
                files={node.children}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const FileFolder = () => {
  const [files, setFiles] = useState(dataFiles);
  const [isOpen, setIsOpen] = useState({});

  return (
    <div>
      <Files files={files} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default FileFolder;
