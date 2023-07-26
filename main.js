import { notes } from "./data.js";
import { addNote, deleteNote, handleEditMode } from "./actions.js";
import { renderNotes, renderSummary, renderArchivedNotes } from "./render.js";

const noteForm = document.getElementById("note-form");
const notesList = document.getElementById("notes-list");
const showArchiveButton = document.getElementById("show-archive");
const archivedNotesList = document.getElementById("archived-notes-list");

if (archivedNotesList) {
  archivedNotesList.style.display = "none";
}

if (showArchiveButton) {
  showArchiveButton.addEventListener("click", () => {
    if (archivedNotesList && archivedNotesList.style.display === "none") {
      archivedNotesList.style.display = "block";
      showArchiveButton.innerText = "Hide archive";
      try {
        renderArchivedNotes(archivedNotesList);
      } catch (error) {
        console.error(
          "An error occurred while rendering the archived notes: ",
          error
        );
      }
    } else {
      archivedNotesList.style.display = "none";
      showArchiveButton.innerText = "Show archive";
    }
  });
}

if (noteForm) {
  noteForm.addEventListener("submit", (e) => {
    try {
      addNote(e, noteForm);
    } catch (error) {
      console.error("An error occurred while adding a note: ", error);
    }
  });
}

if (notesList) {
  const archiveNote = (e) => {
    try {
      if (!e.target.hasAttribute("data-id")) return;
      const noteId = Number(e.target.getAttribute("data-id"));
      const noteIndex = notes.findIndex((note) => note.id === noteId);
      if (noteIndex > -1) {
        notes[noteIndex].archived = true;
        renderNotes();
        renderArchivedNotes(archivedNotesList);
        renderSummary();
      }
    } catch (error) {
      console.error("An error occurred during archiving a note: ", error);
    }
  };

  notesList.addEventListener("click", (e) => {
    try {
      if (e.target.classList.contains("edit")) {
        handleEditMode(e);
      } else if (e.target.classList.contains("delete")) {
        deleteNote(e);
      } else if (e.target.classList.contains("archive")) {
        archiveNote(e);
      }
    } catch (error) {
      console.error(
        "An error occurred during the click event listener: ",
        error
      );
    }
  });
}

window.addEventListener("DOMContentLoaded", (event) => {
  try {
    renderNotes();
    renderSummary();
  } catch (error) {
    console.error(
      "An error occurred while rendering the notes or the summary: ",
      error
    );
  }
});

if (archivedNotesList) {
  archivedNotesList.addEventListener("click", (event) => {
    try {
      if (event.target.classList.contains("unarchive")) {
        const id = Number(event.target.getAttribute("data-id"));
        const note = notes.find((note) => note.id === id);

        if (note) {
          note.archived = false;
        }

        renderNotes();
        renderArchivedNotes(archivedNotesList);
        renderSummary();
      }
    } catch (error) {
      console.error(
        "An error occurred during the unarchive click event listener: ",
        error
      );
    }
  });
}
