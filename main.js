const noteForm = document.getElementById("note-form");
const noteContent = document.getElementById("note-content");
const noteCategory = document.getElementById("note-category");

const notesList = document.getElementById("notes-list");
const summaryTable = document.getElementById("summary-table");


const showArchiveButton = document.getElementById("show-archive");
const archivedNotesList = document.getElementById("archived-notes-list");

archivedNotesList.style.display = "none";

showArchiveButton.addEventListener("click", () => {
  if (archivedNotesList.style.display === "none") {
    archivedNotesList.style.display = "block";
    renderArchivedNotes();
  } else {
    archivedNotesList.style.display = "none";
  }
});


noteForm.addEventListener("submit", addNote);
notesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    handleEditMode(e);
  } else if (e.target.classList.contains("delete")) {
    deleteNote(e);
  }
});
notesList.addEventListener("blur", handleEditEnd, true);





notesList.addEventListener("click", (event) => {
  if (event.target.classList.contains("archive")) {
    const id = Number(event.target.getAttribute("data-id"));
    const note = notes.find((note) => note.id === id);
    note.archived = true;
    renderNotes();
  }
});





window.addEventListener("DOMContentLoaded", (event) => {
  renderNotes();
  renderSummary();
});
