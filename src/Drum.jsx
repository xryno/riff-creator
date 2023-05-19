import { useState } from "react";

const Drum = ({ drumData, onNoteChange }) => {
  const [editingIndex, setEditingIndex] = useState(null);

  const handleNoteClick = (index) => {
    setEditingIndex(index);
  };

  const handleNoteChange = (event) => {
    const newNoteValue = event.target.value.trim() || "-";
    onNoteChange(editingIndex, newNoteValue);
    setEditingIndex(null);
  };

  return (
    <div>
      |
      {drumData.map((note, index) => (
        <span
          key={index}
          onClick={() => handleNoteClick(index)}
          className={editingIndex === index ? "editing" : ""}
        >
          {index % 4 === 0 && (index === 0 ? "" : "|")}
          {editingIndex === index ? (
            <input
              type="text"
              style={{ width: "12px" }}
              defaultValue={note === "-" ? "" : note}
              onBlur={handleNoteChange}
            />
          ) : (
            <span style={{ padding: "5px", height: "5px", width: "12px", display: "inline-block" }}>
              {note === "-" ? (
                <div style={{ marginTop: 5, height: 1, backgroundColor: "#797979" }}></div>
              ) : (
                note
              )}
            </span>
          )}
        </span>
      ))}
      |
    </div>
  );
};

export default Drum;
