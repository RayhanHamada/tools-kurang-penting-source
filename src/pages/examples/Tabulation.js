import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Tabulation.css";

const Tabulation = () => {
  // method string custom
  String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(
      new RegExp(
        str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"),
        ignore ? "gi" : "g"
      ),
      typeof str2 == "string" ? str2.replace(/\$/g, "$$$$") : str2
    );
  };

  const [state, setState] = useState({
    data: [],
    tableData: [],
    banyakData: 0,
    banyakKelas: 0,
    banyakKelasFix: 0,
    min: 0,
    max: 0,
    range: 0,
    interval: 0,
    intervalFix: 0
  });

  const [uiState, setUiState] = useState({
    opsi1: 0,
    opsi2: 0,
    intervalLow: 0,
    intervalUp: 0,
    opcheck: true,
    intervalCheck: true
  });

  const hitungJumlahData = () => {
    const numArray = document
      .getElementById("input-angka")
      .value.replace(/,+$/, "") // remove semua trailing koma
      .replaceAll(" ", "") // remove semua spasi
      .replaceAll(",", " ") // remove semua koma diantara, jadiin spasi
      .split(" ") // bikin string jadi array
      .map(val => {
        return parseInt(val);
      });

    const min = Math.min(...numArray);
    const max = Math.max(...numArray);
    const range = max - min;

    const banyakKelas = (1.0 + 3.332 * Math.log10(numArray.length)).toPrecision(
      3
    );

    const jk1 = document.getElementById("jk1");
    const jk2 = document.getElementById("jk2");

    const banyakKelasFix = jk1.checked
      ? parseInt(jk1.value)
      : parseInt(jk2.value);

    const interval = (range / banyakKelasFix).toPrecision(3);
    // console.log(interval);

    const i1 = document.getElementById("i1");
    const i2 = document.getElementById("i2");

    const intervalFix = i1.checked ? parseInt(i1.value) : parseInt(i2.value);

    setState({
      ...state,
      data: [...numArray],
      banyakData: numArray.length,
      banyakKelas: banyakKelas,
      max: max,
      min: min,
      range: range,
      interval: interval,
      banyakKelasFix: banyakKelasFix,
      intervalFix: intervalFix
    });

    setUiState({
      ...uiState,
      opsi1: Math.ceil(banyakKelas),
      opsi2: Math.floor(banyakKelas),
      intervalLow: Math.floor(interval),
      intervalUp: Math.ceil(interval)
    });
  };

  const bikinRecord = () => {
    const sortedData = [...state.data].sort((a, b) => a - b);
    const interval = state.intervalFix;
    console.log(interval);
    const banyakKelas = state.banyakKelasFix;
    console.log(banyakKelas);
    const banyakData = state.banyakData;
    console.log(banyakData);
    const min = state.min;
    console.log(min);
    const max = state.max;
    let currentRow = {
      kelas: "",
      ntengah: 0,
      frek: 0,
      frel: 0,
      frelp: 0,
      fkumkur: 0,
      fkumleb: 0
    };
    console.log(sortedData);
    let rowContainer = [];
    let currentKelasMulai = min - 1;
    let currentKelasAkhir = currentKelasMulai + interval - 1;

    for (let i = 0; i < banyakKelas; i++) {
      currentRow.kelas = `${currentKelasMulai} - ${currentKelasAkhir}`;
      currentRow.ntengah = (currentKelasMulai + currentKelasAkhir) / 2;

      // hitung frekuensi
      let frek = 0;
      for (let j = 0; j < sortedData.length; j++) {
        if (sortedData[j] >= currentKelasMulai && sortedData[j] <= currentKelasAkhir) frek++;
      }

      console.log(frek);

      currentRow.frek = frek;
      console.log(frek);
      currentRow.frel = (frek / banyakData).toPrecision(4);
      console.log(currentRow.frel);
      currentRow.frelp = (currentRow.frel * 100).toPrecision(4);

      // hitung frekuensi kumulatif kurang dari
      let kurangDari = 0;
      for (let k = 0; k < sortedData.length; k++) {
        if (sortedData[k] < currentKelasMulai) kurangDari++;
      }

      currentRow.fkumkur = kurangDari;

      // hitung frekuensi kumulatif lebih dari
      let lebihDari = 0;
      for (let l = 0; l < sortedData.length; l++) {
        if (sortedData[l] > currentKelasMulai - 1) lebihDari++;
      }

      currentRow.fkumleb = lebihDari;

      // masukin ke rowContainer
      rowContainer.push(currentRow);
      currentRow = {};
      currentKelasMulai += interval;
      currentKelasAkhir += interval;
    }

    setState({ ...state, tableData: rowContainer });
    console.log(rowContainer);
  };

  return (
    <div className="wrapper-tabulation">
      <input
        onChange={hitungJumlahData}
        id="input-angka"
        type="text"
        className="input-angka form-control"
        placeholder="Input himpunan angka, dipisahkan dengan koma"
      />
      <br />
      <span className="jumlah-data white-text" id="jumlah-data">
        Banyak Data : {state.banyakData}
      </span>
      <br />
      <span className="white-text">
        Data Terkecil : {state.min}, Data Terbesar : {state.max}
      </span>
      <br />
      <span id="jumlah-kelas" className="white-text">
        Banyak Kelas : {state.banyakKelas}
      </span>
      <br />
      <span className="white-text">Pilih Banyak Kelas Yang Fix !</span>
      <label className="radio-inline white-text">
        <input
          className="white-text"
          id="jk1"
          type="radio"
          name="optradio1"
          value={uiState.opsi1}
          onClick={() => {
            setUiState({ ...uiState, opcheck: true });
            setState({ ...state });
            hitungJumlahData();
          }}
        />
        {uiState.opsi1}
      </label>
      <label className="radio-inline white-text">
        <input
          className="white-text"
          id="jk2"
          type="radio"
          name="optradio1"
          value={uiState.opsi2}
          onClick={() => {
            setUiState({ ...uiState, opcheck: !uiState.opcheck });
            setState({ ...state });
            hitungJumlahData();
          }}
        />
        {uiState.opsi2}
      </label>
      <br />
      <span className="white-text">Range: {state.range}</span>
      <br />
      <span className="white-text">Interval : {state.interval}</span>
      <br />
      <span className="white-text">Pilih Interval Yang Fix !</span>
      <label className="radio-inline white-text">
        <input
          className="white-text"
          id="i1"
          type="radio"
          name="optradio"
          value={uiState.intervalLow}
          onClick={() => {
            setUiState({ ...uiState, intervalCheck: true });
            setState({ ...state });
            hitungJumlahData();
          }}
        />
        {uiState.intervalLow}
      </label>
      <label className="radio-inline white-text">
        <input
          className="white-text"
          id="i2"
          type="radio"
          name="optradio"
          value={uiState.intervalUp}
          onClick={() => {
            setUiState({ ...uiState, intervalCheck: !uiState.intervalCheck });
            setState({ ...state });
            hitungJumlahData();
          }}
        />
        {uiState.intervalUp}
      </label>
      <br />
      <br />
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Kelas</th>
            <th scope="col">Nilai Tengah</th>
            <th scope="col">Frekuensi</th>
            <th scope="col">F. Relatif</th>
            <th scope="col">F. Relative %</th>
            <th scope="col">F. Kumkur</th>
            <th scope="col">F. Kumleb</th>
          </tr>
        </thead>
        <tbody>
          {state.tableData.map((row, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx}</th>
                <td>{row.kelas}</td>
                <td>{row.ntengah}</td>
                <td>{row.frek}</td>
                <td>{row.frel} %</td>
                <td>{row.frelp}</td>
                <td>{row.fkumkur}</td>
                <td>{row.fkumleb}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={bikinRecord}>Test</button>
    </div>
  );
};

export default Tabulation;
