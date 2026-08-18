import React, { useState } from "react";
import { data } from "./data";

const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} style={{ width: "200px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  width: "30px",
                  height: "30px",
                  textAlign: "center",
                  backgroundColor: "lightgray",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}>
                <span>{comment.author.name.charAt(0)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <span>{comment.author.name}</span>
                <span>{comment.comment}</span>
              </div>
            </div>
            <span>{comment.date}</span>
          </div>
          <div style={{ padding: "10px 20px" }}>
            {comment.replies && <Comments comments={comment.replies} />}
          </div>
        </div>
      ))}
    </div>
  );
};

const NestedComments = () => {
  const [comments, setComments] = useState(data);

  return (
    <div style={{ padding: "100px" }}>
      <Comments comments={comments} />
    </div>
  );
};

export default NestedComments;
