const noteForm = document.getElementById('note-form');
const noteContent = document.getElementById('note-content');
const noteCategory = document.getElementById('note-category');
const notesList = document.getElementById('notes-list');
const summaryTable = document.getElementById('summary-table');

noteForm.addEventListener('submit', addNote);
notesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit')) {
        handleEditMode(e);
    } else if (e.target.classList.contains('delete')) {
        deleteNote(e);
    }
});
notesList.addEventListener('blur', handleEditEnd, true);
window.addEventListener('DOMContentLoaded', (event) => {
    renderNotes();
    renderSummary();
});



// let notes = [
//     {
//         time: new Date('2023-01-01T10:00:00'),
//         content: 'Content of note 1. Meeting on 1/2/2023.',
//         category: 'Task',
//         archived: false,
//         datesMentioned: ['1/2/2023']
//     },
//     {
//         time: new Date('2023-01-02T10:00:00'),
//         content: 'Content of note 2. Meeting on 2/3/2023.',
//         category: 'Random Thought',
//         archived: false,
//         datesMentioned: ['2/3/2023']
//     },
//     {
//         time: new Date('2023-02-02T10:00:00'),
//         content: 'Content of note 3. Meeting on 3/4/2023.',
//         category: 'Idea',
//         archived: false,
//         datesMentioned: ['3/4/2023']
//     },
//     {
//         time: new Date('2023-03-02T10:00:00'),
//         content: 'Content of note 4. Meeting on 4/5/2023.',
//         category: 'Task',
//         archived: false,
//         datesMentioned: ['4/5/2023']
//     },
//     {
//         time: new Date('2023-04-02T10:00:00'),
//         content: 'Content of note 5. Meeting on 5/6/2023.',
//         category: 'Random Thought',
//         archived: false,
//         datesMentioned: ['5/6/2023']
//     },
//     {
//         time: new Date('2023-05-02T10:00:00'),
//         content: 'Content of note 6. Meeting on 6/7/2023.',
//         category: 'Idea',
//         archived: false,
//         datesMentioned: ['6/7/2023']
//     },
//     {
//         time: new Date('2023-06-02T10:00:00'),
//         content: 'Content of note 7. Meeting on 7/8/2023.',
//         category: 'Task',
//         archived: false,
//         datesMentioned: ['7/8/2023']
//     }
// ];










// const noteForm = document.getElementById('note-form');
// const noteContent = document.getElementById('note-content');
// const noteCategory = document.getElementById('note-category');
// const notesList = document.getElementById('notes-list');
// const summaryTable = document.getElementById('summary-table');

// function addNote(e) {
//     e.preventDefault();
//     const note = {
//         id: Date.now(),
//         time: new Date(),
//         content: noteContent.value,
//         category: noteCategory.value,
//         archived: false,
//         datesMentioned: getDatesMentioned(noteContent.value),
//     };
//     notes.push(note);
//     renderNotes();
//     renderSummary();
//     noteForm.reset();
// }

// function getDatesMentioned(content) {
//     const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
//     return content.match(dateRegex) || [];
// }

// function handleEditMode(e) {
//     if (!e.target.hasAttribute('data-id')) return;
//     const noteId = e.target.getAttribute('data-id');
//     const contentElement = e.target.parentElement.querySelector(`p[data-id="${noteId}"]`);
//     contentElement.contentEditable = true;
//     contentElement.focus();
// }

// function handleEditEnd(e) {
//     if (!e.target.hasAttribute('data-id')) return;
//     const noteId = e.target.getAttribute('data-id');
//     const note = notes.find(note => note.id === Number(noteId));
//     if (!note) return;
//     note.content = e.target.textContent;
//     e.target.contentEditable = false;
//     renderSummary();
// }

// function deleteNote(e) {
//     if (!e.target.hasAttribute('data-id')) return;
//     const noteId = e.target.getAttribute('data-id');
//     notes = notes.filter(note => note.id !== Number(noteId));
//     renderNotes();
//     renderSummary();
// }

// function renderNotes() {
//     const categories = Array.from(new Set(notes.map(note => note.category)));
//     const notesByCategory = categories.map(category => notes.filter(note => note.category === category));
//     notesList.innerHTML = `
//         <table>
//             <tr>
//                 ${categories.map(category => `<th>${category}</th>`).join('')}
//             </tr>
//             ${new Array(Math.max(...notesByCategory.map(notes => notes.length))).fill().map((_, i) => `
//                 <tr>
//                     ${notesByCategory.map(notes => `
//                         <td>
//                             ${notes[i] ? `<p data-id="${notes[i].id}" contenteditable="false">${notes[i].content}</p><button class="edit" data-id="${notes[i].id}">Edit</button><button class="delete" data-id="${notes[i].id}">Delete</button>` : ''}
//                         </td>`).join('')}
//                 </tr>
//             `).join('')}
//         </table>
//     `;
// }

// function renderSummary() {
//     const categories = Array.from(new Set(notes.map(note => note.category)));
//     const summary = categories.map(category => ({
//         category,
//         active: notes.filter(note => !note.archived && note.category === category).length,
//         archived: notes.filter(note => note.archived && note.category === category).length,
//     }));
//     summaryTable.innerHTML = `
//         <table>
//             <tr>
//                 <th>Category</th>
//                 <th>Active</th>
//                 <th>Archived</th>
//             </tr>
//             ${summary.map(row => `
//                 <tr>
//                     <td>${row.category}</td>
//                     <td>${row.active}</td>
//                     <td>${row.archived}</td>
//                 </tr>
//             `).join('')}
//         </table>
//     `;
// }

// noteForm.addEventListener('submit', addNote);
// notesList.addEventListener('click', (e) => {
//     if (e.target.classList.contains('edit')) {
//         handleEditMode(e);
//     } else if (e.target.classList.contains('delete')) {
//         deleteNote(e);
//     }
// });
// notesList.addEventListener('blur', handleEditEnd, true);
// window.addEventListener('DOMContentLoaded', (event) => {
//     renderNotes();
//     renderSummary();
// });