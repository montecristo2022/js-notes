import { notes } from "./data.js";
import { renderNotes, renderSummary, renderArchivedNotes } from "./render.js";
import { getDatesMentioned } from "./utility.js";

const noteContent = document.getElementById("note-content");
const noteCategory = document.getElementById("note-category");

export function addNote(e, noteForm) {
  try {
    e.preventDefault();
    console.log(noteContent.value);
    const note = {
      id: Math.random(),

      content: noteContent.value,
      category: noteCategory.value,
      archived: false,
      datesMentioned: getDatesMentioned(noteContent.value),
    };
    notes.push(note);
    renderNotes();
    renderSummary();
    noteForm.reset();
  } catch (error) {
    console.error("An error occurred during adding a note: ", error);
  }
}

export function handleEditMode(e) {
  const noteId = Number(e.target.getAttribute("data-id"));
  const noteElement = document.querySelector(`[data-id="${noteId}"]`);
  const note = notes.find((note) => note.id === noteId);

  if (noteElement.isContentEditable) {
    noteElement.setAttribute("contenteditable", "false");
    note.content = noteElement.innerText;
    note.datesMentioned = getDatesMentioned(noteElement.innerText); 
    e.target.innerText = "Edit";
    renderNotes();
    noteElement.removeEventListener("blur", handleBlur); 
  } else {
    noteElement.setAttribute("contenteditable", "true");
    noteElement.focus();
    e.target.innerText = "Save";

    const handleBlur = () => {
      note.content = noteElement.innerText;
      note.datesMentioned = getDatesMentioned(noteElement.innerText); 
      renderNotes();
      noteElement.removeEventListener("blur", handleBlur); 
    };
    noteElement.addEventListener("blur", handleBlur);
  }
}

export function deleteNote(e) {
  try {
    if (!e.target.hasAttribute("data-id")) return;
    const noteId = Number(e.target.getAttribute("data-id"));
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex > -1) {
      notes.splice(noteIndex, 1);
      renderNotes();
      renderSummary();
    }
  } catch (error) {
    console.error("An error occurred during deleting a note: ", error);
  }
}

export function archiveNote(e) {
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
}
