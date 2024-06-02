import logo from './logo.svg';                          
import './App.css';
import { Table } from './components/Table';
import { Modal } from "./components/Modal";
import { useState, useEffect } from 'react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(getCurrentDayIndex());

  const [rows, setRows] = useState(() => {
    
    const storedRows = localStorage.getItem('rows-' + selectedDay);
    return storedRows ? JSON.parse(storedRows) : [
      { time: "Time 1", description: "this is the first section", status: "live" },
      { time: "Time 2", description: "this is the second section", status: "live" },
      { time: "Time 3", description: "this is the third third", status: "live" },
    ];
  });

  const [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
    
    localStorage.setItem('rows-' + selectedDay, JSON.stringify(rows));
  }, [rows, selectedDay]);

  useEffect(() => {
    handleSelectDay(selectedDay);
  }, [selectedDay]);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
        rows.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;
          return newRow;
        })
      );

    setRowToEdit(null);
    setModalOpen(false);
  };

  function getCurrentDayIndex() {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  }

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    
    const storedRows = localStorage.getItem('rows-' + day);
    setRows(storedRows ? JSON.parse(storedRows) : [
      { time: "Time 1", description: "this is the first section", status: "live" },
      { time: "Time 2", description: "this is the second section", status: "live" },
      { time: "Time 3", description: "this is the third third", status: "live" },
    ]);
  };

  return (
    <div className="App">
      <div>
        <h3>Selected Day: {days[selectedDay]}</h3>
        <label>Select Day: </label>
        <select onChange={(e) => handleSelectDay(parseInt(e.target.value))} value={selectedDay}>
          {days.map((day, index) => (
            <option key={index} value={index}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button className='btn' onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && (
        <Modal
          closemodal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default App;