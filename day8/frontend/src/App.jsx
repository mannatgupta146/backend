import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [note, setNote] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get("https://backend-zd5e.onrender.com/api/notes");
    setNote(res.data.notes);
  };

  const addNotes = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    await axios.post("https://backend-zd5e.onrender.com/api/notes", { title, description });
    fetchNotes();
    e.target.reset();
  };

  const deleteNotes = async (id) => {
    await axios.delete(`https://backend-zd5e.onrender.com/api/notes/${id}`);
    fetchNotes();
  };

  const updateNotes = async (id, oldTitle, oldDesc) => {
    const title = prompt("Update title", oldTitle);
    const description = prompt("Update description", oldDesc);

    await axios.patch(`https://backend-zd5e.onrender.com/api/notes/${id}`, {
      title: title || oldTitle,
      description: description || oldDesc,
    });

    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="layout">
      <form className="sidebar" onSubmit={addNotes}>
        <h2>Create Note</h2>
        <input name="title" placeholder="Title" required />
        <textarea name="description" placeholder="Description" required />
        <button>Add</button>
      </form>

      <div className="notes">
        {note.map((n) => (
          <div className="note" key={n._id}>
            <h3>{n.title}</h3>
            <p>{n.description}</p>
            <div className="actions">
              <button onClick={() => updateNotes(n._id, n.title, n.description)}>Edit</button>
              <button onClick={() => deleteNotes(n._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
