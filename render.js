function renderNotes() {
  const activeNotes = notes.filter((note) => !note.archived);
  const categories = Array.from(
    new Set(activeNotes.map((note) => note.category))
  );
  const notesByCategory = categories.map((category) =>
    activeNotes.filter((note) => note.category === category)
  );
  const maxNotes =
    notesByCategory.length > 0
      ? Math.max(...notesByCategory.map((notes) => notes.length))
      : 0;
  notesList.innerHTML = `
    <table>
    <h1>Active notes</h1>
      <tr>
        ${categories
          .map((category) => `<th>${category}</th><th>Dates</th>`)
          .join("")}
      </tr>
      ${new Array(maxNotes)
        .fill()
        .map(
          (_, i) => `
            <tr>
              ${notesByCategory
                .map(
                  (notes) => `
                    <td>
                      ${
                        notes[i]
                          ? `<p data-id="${notes[i].id}" contenteditable="false">${notes[i].content} </p>
                             <button class="edit" data-id="${notes[i].id}">Edit</button>
                             <button class="delete" data-id="${notes[i].id}">Delete</button>
                             <button class="archive" data-id="${notes[i].id}">Archive</button>`
                          : ""
                      }
                    </td>
                    <td>
                      ${notes[i] ? `${notes[i].datesMentioned.join(", ")}` : ""}
                    </td>`
                )
                .join("")}
            </tr>
          `
        )
        .join("")}
    </table>
  `;
}

function renderSummary() {
  const categories = Array.from(new Set(notes.map((note) => note.category)));
  const summary = categories.map((category) => ({
    category,
    active: notes.filter((note) => !note.archived && note.category === category)
      .length,
    archived: notes.filter(
      (note) => note.archived && note.category === category
    ).length,
  }));
  summaryTable.innerHTML = `
        <table>
            <tr>
                <th>Category</th>
                <th>Active</th>
                <th>Archived!</th>
            </tr>
            ${summary
              .map(
                (row) => `
                <tr>
                    <td>${row.category}</td>
                    <td>${row.active}</td>
                    <td>${row.archived}</td>
                </tr>
            `
              )
              .join("")}
        </table>
    `;
}

function renderArchivedNotes() {
  const archivedNotes = notes.filter((note) => note.archived);
  const categories = Array.from(new Set(archivedNotes.map((note) => note.category)));
  const notesByCategory = categories.map((category) =>
    archivedNotes.filter((note) => note.category === category)
  );
  const maxNotes = notesByCategory.length > 0 ? Math.max(...notesByCategory.map((notes) => notes.length)) : 0;
  archivedNotesList.innerHTML = `
    <table>
    <h1>Archived notes</h1>
      <tr>
        ${categories
          .map((category) => `<th>${category}</th><th>Dates</th>`)
          .join("")}
      </tr>
      ${new Array(maxNotes)
        .fill()
        .map(
          (_, i) => `
            <tr>
              ${notesByCategory
                .map(
                  (notes) => `
                    <td>
                      ${
                        notes[i]
                          ? `<p data-id="${notes[i].id}" contenteditable="false">${notes[i].content} </p>
                             <button class="unarchive" data-id="${notes[i].id}">Unarchive</button>`
                          : ""
                      }
                    </td>
                    <td>
                      ${notes[i] ? `${notes[i].datesMentioned.join(", ")}` : ""}
                    </td>`
                )
                .join("")}
            </tr>
          `
        )
        .join("")}
    </table>
  `;
}
