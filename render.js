import { notes } from "./data.js";
const notesList = document.getElementById("notes-list");
const summaryTable = document.getElementById("summary-table");
const archivedNotesList = document.getElementById("archived-notes-list");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function renderNotes() {
  const activeNotes = notes.filter((note) => !note.archived);

  let html = '<h1>Active notes</h1><table><tr><th>Category</th><th>Note</th><th>Created at</th><th>Dates</th><th>Action</th></tr>';

  activeNotes.forEach(note => {
    const createdTime = new Date(note.createdTime);
    const formattedTime = `${months[createdTime.getMonth()]}, ${createdTime.getDate()}, ${createdTime.getFullYear()}`;
    html += `<tr><td>${note.category}</td><td>${note.content}</td><td>${formattedTime}</td><td>${note.datesMentioned.join(", ")}</td><td><button class="edit" data-id="${note.id}">Edit</button><button class="delete" data-id="${note.id}">Delete</button><button class="archive" data-id="${note.id}">Archive</button></td></tr>`;
  });

  html += '</table>';
  notesList.innerHTML = html;
}

export function renderSummary() {
  const categories = Array.from(new Set(notes.map((note) => note.category)));
  const summary = categories.map((category) => ({
    category,
    active: notes.filter((note) => !note.archived && note.category === category).length,
    archived: notes.filter((note) => note.archived && note.category === category).length,
  }));

  let html = '<table><tr><th>Category</th><th>Active</th><th>Archived</th></tr>';

  summary.forEach(row => {
    html += `<tr><td>${row.category}</td><td>${row.active}</td><td>${row.archived}</td></tr>`;
  });

  html += '</table>';
  summaryTable.innerHTML = html;
}

export function renderArchivedNotes() {
  const archivedNotes = notes.filter((note) => note.archived);

  let html = '<h1>Archived notes</h1><table><tr><th>Category</th><th>Note</th><th>Created at</th><th>Dates</th><th>Action</th></tr>';

  archivedNotes.forEach(note => {
    const createdTime = new Date(note.createdTime);
    const formattedTime = `${months[createdTime.getMonth()]}, ${createdTime.getDate()}, ${createdTime.getFullYear()}`;
    html += `<tr><td>${note.category}</td><td>${note.content}</td><td>${formattedTime}</td><td>${note.datesMentioned.join(", ")}</td><td><button class="unarchive" data-id="${note.id}">Unarchive</button></td></tr>`;
  });

  html += '</table>';
  archivedNotesList.innerHTML = html;
}
