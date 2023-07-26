function addNote(e) {
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
}


function handleEditMode(e) {
    if (!e.target.hasAttribute('data-id')) return;
    const noteId = e.target.getAttribute('data-id');
    const contentElement = e.target.parentElement.querySelector(`p[data-id="${noteId}"]`);
    contentElement.contentEditable = true;
    contentElement.focus();
}


function deleteNote(e) {
    if (!e.target.hasAttribute('data-id')) return;
    const noteId = e.target.getAttribute('data-id');
    notes = notes.filter(note => note.id !== Number(noteId));
    renderNotes();
    renderSummary();
}



