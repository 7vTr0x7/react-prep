import React, { useState } from "react";
import { dataFiles } from "./data";

const Files = ({ files, isOpen, setIsOpen, setFiles }) => {
  const addFile = (node) => {
    const name = prompt("Enter name");

    if (!name.trim()) return;

    const newFile = {
      id: new Date().getTime(),
      name,
      isFolder: false,
    };

    const exits = node?.children.find(
      (f) => f.name.toLowerCase() === name.toLowerCase(),
    );

    if (exits?.id) {
      alert("file already exists");
      return;
    }

    setFiles((p) =>
      p.map((f) =>
        f.id === node.id ? { ...f, children: [...f.children, newFile] } : f,
      ),
    );
  };

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
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => addFile(node)}>
                  {"📄"}
                </span>
              </>
            )}
          </div>
          <div style={{ padding: "0px 20px" }}>
            {node.children && isOpen[node.id] && (
              <Files
                files={node.children}
                setFiles={setFiles}
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
      <Files
        files={files}
        isOpen={isOpen}
        setFiles={setFiles}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default FileFolder;
