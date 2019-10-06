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
          toolTitle="Distribusi Frekuensi"
          toolAuthor="Rayhan Hamada"
          toolDesc="Alat untuk menghitung distribusi frekuensi dan menyajikannya dalam tabel."
          toolTag={["Statistic", "Table"]}
        />
        {/* <ToolBox
          toolTitle="Simple market calculator"
          toolAuthor="Rayhan Hamada"
          toolDesc="A tool for calculate your market expenses"
        />
        <ToolBox
          toolTitle="Simple market calculator"
          toolAuthor="Rayhan Hamada"
          toolDesc="A tool for calculate your market expenses"
        />
        <ToolBox
          toolTitle="Simple market calculator"
          toolAuthor="Rayhan Hamada"
          toolDesc="A tool for calculate your market expenses"
        /> */}
      </div>
    </div>
  );
};

export default HomePage;
