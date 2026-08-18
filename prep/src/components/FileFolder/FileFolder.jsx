import React, { useState } from "react";
import { dataFiles } from "./data";

const Files = ({ files, isOpen, setIsOpen, setFiles }) => {
  const addFile = (parent) => {
    const name = prompt("Enter name");

    if (!name.trim()) return;

    const newFile = {
      id: new Date().getTime(),
      name,
      isFolder: false,
    };

    const exits = parent?.children.find(
      (f) => f.name.toLowerCase() === name.toLowerCase(),
    );

    if (exits?.id) {
      alert("file already exists");
      return;
    }

    const updateTree = (nodes) => {
      return nodes.map((node) => {
        if (node.id === parent.id) {
          return {
            ...node,
            children: [...node.children, newFile],
          };
        }

        if (node?.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }

        return node;
      });
    };

    setFiles((p) => updateTree(p));
  };

  const addFolder = (parent) => {
    const name = prompt("enter name");

    if (!name.trim()) return;

    const exists = parent.children.find(
      (node) => node.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists?.id) {
      alert("Already exists");
      return;
    }

    let newFolder = {
      id: new Date().getTime(),
      name,
      isFolder: true,
      children: [],
    };

    const updateTree = (nodes) => {
      return nodes.map((node) => {
        if (node.id === parent.id) {
          return {
            ...node,
            children: [...node.children, newFolder],
          };
        }
        if (node?.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };

    setFiles((prev) => updateTree(prev));
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
            {node?.isFolder && (
              <>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => addFolder(node)}>
                  {"📂"}
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => addFile(node)}>
                  {"📄"}
                </span>
              </>
            )}
            <span style={{ cursor: "pointer" }} onClick={() => addFile(node)}>
              {"❌"}
            </span>
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
