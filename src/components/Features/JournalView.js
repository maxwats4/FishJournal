import React, { useState } from "react";

const JournalView = () => {
  // Sample journal entries
  const [entries] = useState([
    {
      id: 1,
      title: "Day 1: Getting Started",
      content: "Today I started my journey in learning React. It was exciting!",
    },
    {
      id: 2,
      title: "Day 2: Components",
      content:
        "Learned about components today. They are the building blocks of a React application.",
    },
    {
      id: 3,
      title: "Day 3: State and Props",
      content:
        "Today I learned how to manage state and pass props in React components.",
    },
  ]);

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter entries based on search term
  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Journal Entries</h2>
        <input
          type="text"
          placeholder="Search entries"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
        <ul style={styles.entryList}>
          {filteredEntries.map((entry) => (
            <li
              key={entry.id}
              style={{
                ...styles.entryItem,
                ...(selectedEntry && selectedEntry.id === entry.id
                  ? styles.selectedEntryItem
                  : {}),
              }}
              onClick={() => setSelectedEntry(entry)}
            >
              {entry.title}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.content}>
        {selectedEntry ? (
          <>
            <h2>{selectedEntry.title}</h2>
            <p>{selectedEntry.content}</p>
          </>
        ) : (
          <p style={styles.placeholder}>
            Select a journal entry to view its content
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    border: "1px solid #e0e0e0", // Lighter grey border
    borderRadius: "5px",
    overflow: "hidden",
  },
  sidebar: {
    width: "25%",
    borderRight: "1px solid #ddd",
    padding: "20px",
    backgroundColor: "#fff",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  content: {
    width: "75%",
    padding: "20px",
    overflowY: "auto",
  },
  entryList: {
    listStyleType: "none",
    padding: 0,
  },
  entryItem: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
    backgroundColor: "transparent",
    transition: "background-color 0.3s",
  },
  selectedEntryItem: {
    backgroundColor: "#e9ecef",
  },
  placeholder: {
    color: "#6c757d",
  },
};

export default JournalView;
