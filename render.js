function renderNotes() {
    const categories = Array.from(new Set(notes.map(note => note.category)));
    const notesByCategory = categories.map(category => notes.filter(note => note.category === category));
    notesList.innerHTML = `
        <table>
            <tr>
                ${categories.map(category => `<th>${category}</th>`).join('')}
            </tr>
            ${new Array(Math.max(...notesByCategory.map(notes => notes.length))).fill().map((_, i) => `
                <tr>
                    ${notesByCategory.map(notes => `
                        <td>
                            ${notes[i] ? `<p data-id="${notes[i].id}" contenteditable="false">${notes[i].content}</p><button class="edit" data-id="${notes[i].id}">Edit</button><button class="delete" data-id="${notes[i].id}">Delete</button>` : ''}
                        </td>`).join('')}
                </tr>
            `).join('')}
        </table>
    `;
}

function renderSummary() {
    const categories = Array.from(new Set(notes.map(note => note.category)));
    const summary = categories.map(category => ({
        category,
        active: notes.filter(note => !note.archived && note.category === category).length,
        archived: notes.filter(note => note.archived && note.category === category).length,
    }));
    summaryTable.innerHTML = `
        <table>
            <tr>
                <th>Category</th>
                <th>Active</th>
                <th>Archived</th>
            </tr>
            ${summary.map(row => `
                <tr>
                    <td>${row.category}</td>
                    <td>${row.active}</td>
                    <td>${row.archived}</td>
                </tr>
            `).join('')}
        </table>
    `;
}
