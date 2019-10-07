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
    jumlahData: 0,
    banyakData: 0,
    mean: 0,
    median: 0,
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

    const jumlahData = numArray.reduce((prev, curr) => prev + curr);
    const min = Math.min(...numArray);
    const max = Math.max(...numArray);
    const range = max - min;

    const banyakKelas = (1.0 + 3.332 * Math.log10(numArray.length)).toPrecision(
      3
    );

    const jk1 = document.getElementById("jk1");
    const jk2 = document.getElementById("jk2");

    const banyakKelasFix = jk1.checked ? uiState.opsi1 : uiState.opsi2;

    const interval = (
      range / (banyakKelasFix == 0 ? Math.ceil(banyakKelas) : banyakKelasFix)
    ).toPrecision(3);
    // console.log(interval);

    const i1 = document.getElementById("i1");

    const intervalFix = i1.checked ? uiState.intervalUp : uiState.intervalLow;
    console.log(`${uiState.intervalLow}`);

    setState({
      ...state,
      data: [...numArray],
      banyakData: numArray.length,
      jumlahData: jumlahData,
      banyakKelas: banyakKelas,
      banyakKelasFix: banyakKelasFix,
      max: max,
      min: min,
      range: range,
      interval: interval,
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
    const banyakKelas = state.banyakKelasFix;
    const banyakData = state.banyakData;
    const min = state.min;
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
    let rowContainer = [];
    let currentKelasMulai = min - 1;
    let currentKelasAkhir = currentKelasMulai + interval - 1;

    for (let i = 0; i < banyakKelas; i++) {
      currentRow.kelas = `${currentKelasMulai} - ${currentKelasAkhir}`;
      currentRow.ntengah = (currentKelasMulai + currentKelasAkhir) / 2;

      // hitung frekuensi
      let frek = 0;
      for (let j = 0; j < sortedData.length; j++) {
        if (
          sortedData[j] >= currentKelasMulai &&
          sortedData[j] <= currentKelasAkhir
        )
          frek++;
      }

      currentRow.frek = frek;
      currentRow.frel = (frek / banyakData).toPrecision(4);
      currentRow.frelp = (currentRow.frel * 100).toPrecision(4);

      // hitung frekuensi kumulatif kurang dari
      let kurangDari = 0;
      for (let k = 0; k < sortedData.length; k++) {
        if (sortedData[k] < currentKelasMulai) kurangDari++;
      }

      currentRow.fkumkur = `${kurangDari}  (< ${currentKelasMulai})`;

      // hitung frekuensi kumulatif lebih dari
      let lebihDari = 0;
      for (let l = 0; l < sortedData.length; l++) {
        if (sortedData[l] > currentKelasMulai - 1) lebihDari++;
      }

      currentRow.fkumleb = `${lebihDari} (>${currentKelasMulai - 1})`;

      // masukin ke rowContainer
      rowContainer.push(currentRow);
      currentRow = {};
      currentKelasMulai += interval;
      currentKelasAkhir += interval;
    }

    setState({ ...state, tableData: rowContainer });
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
        Banyak Data : <b>{state.banyakData}</b>, Jumlah Data:{" "}
        <b>{state.jumlahData}</b>
      </span>
      <br />
      <span className="white-text">
        Data Terkecil : <b>{state.min}</b>, Data Terbesar : <b>{state.max}</b>
      </span>
      <br />
      <span id="jumlah-kelas" className="white-text">
        Banyak Kelas : <b>{state.banyakKelas}</b>
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
            setState({
              ...state,
              banyakKelasFix: uiState.opsi1,
              interval: (state.range / uiState.opsi1).toPrecision(3)
            });
            hitungJumlahData();
          }}
          defaultChecked
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
            setState({
              ...state,
              banyakKelasFix: uiState.opsi2,
              interval: (state.range / uiState.opsi2).toPrecision(3)
            });
            hitungJumlahData();
          }}
        />
        {uiState.opsi2}
      </label>
      <br />
      <span className="white-text">
        Range: <b>{state.range}</b>
      </span>
      <br />
      <span className="white-text">
        Interval : <b>{state.interval}</b>
      </span>
      <br />
      <span className="white-text">Pilih Interval Yang Fix !</span>
      <label className="radio-inline white-text">
        <input
          className="white-text"
          id="i1"
          type="radio"
          name="optradio"
          value={uiState.intervalUp}
          onClick={() => {
            setUiState({ ...uiState, intervalCheck: true });
            setState({
              ...state,
              banyakKelasFix: uiState.opsi1,
              interval: (state.range / uiState.opsi1).toPrecision(3)
            });
            setState({ ...state, intervalFix: uiState.intervalUp });
            hitungJumlahData();
          }}
          defaultChecked
        />
        {uiState.intervalUp}
      </label>
      <label className="radio-inline white-text">
        <input
          className="white-text"
          id="i2"
          type="radio"
          name="optradio"
          value={uiState.intervalLow}
          onClick={() => {
            setUiState({ ...uiState, intervalCheck: !uiState.intervalCheck });
            setState({
              ...state,
              banyakKelasFix: uiState.opsi2,
              interval: (state.range / uiState.opsi2).toPrecision(3)
            });
            setState({ ...state, intervalFix: uiState.intervalLow });
            hitungJumlahData();
          }}
        />
        {uiState.intervalLow}
      </label>
      <br />
      <button className="btn btn-outline-primary" onClick={hitungJumlahData}>
        Hitung/Update Data
      </button>
      <br />
      <button className="btn btn-outline-primary" onClick={bikinRecord}>
        Tampilkan/Update Tabel
      </button>
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
                <th scope="row">{idx + 1}</th>
                <td>{row.kelas}</td>
                <td>{row.ntengah}</td>
                <td>{row.frek}</td>
                <td>{row.frel}</td>
                <td>{row.frelp} %</td>
                <td>{row.fkumkur}</td>
                <td>{row.fkumleb}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tabulation;
