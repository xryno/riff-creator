import { useState, useRef, useEffect } from "react";

const Guitar = ({ stringData, onNoteChange, name }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (editingIndex !== null && inputRefs.current[editingIndex]) {
      inputRefs.current[editingIndex].focus();
    }
  }, [editingIndex]);

  const handleRef = (element, index) => {
    inputRefs.current[index] = element;
  };

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
      <span style={{ display: "inline-block", width: 50, marginRight: 3, textAlign: "right" }}>
        {name}
      </span>
      |
      {stringData.map((note, index) => (
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
              ref={(element) => handleRef(element, index)}
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

export default Guitar;
