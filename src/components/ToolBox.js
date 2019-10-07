import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./ToolBox.css";

const ToolBox = ({ toolTitle, toolAuthor, toolDesc, toolTag }) => {
  return (
    <div className="box">
      <Link to={`/${toolTitle.split(/\s+/).join("")}`}>
        <span className="tool-title">{toolTitle}</span>
      </Link>
      <br />
      <small className="tool-author">By {toolAuthor}</small>
      <hr className="title-separator" />
      <span className="tool-desc">{toolDesc}</span>
      <br />
      <br/>
      {toolTag.map(tag => {
        return <span class="badge badge-pill badge-danger">{tag}</span>;
      })}
    </div>
  );
};

export default ToolBox;
