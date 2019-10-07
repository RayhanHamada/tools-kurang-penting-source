import React from "react";
import ToolBox from "./../components/ToolBox";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="tools-content">
      <div className="search-box">
        <input
          type="text"
          className="form-control"
          placeholder="Find Your Muffs Here"
        />
      </div>
      <div className="tools-list">
        <ToolBox
          toolTitle="Tabulasi"
          toolAuthor="Rayhan Hamada"
          toolDesc="Alat untuk menghitung distribusi frekuensi dan menyajikannya dalam tabel."
          toolTag={["Statistic", "Table"]}
        />
      </div>
    </div>
  );
};

export default HomePage;
