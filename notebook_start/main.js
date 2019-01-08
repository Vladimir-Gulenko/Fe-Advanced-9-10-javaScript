// Задача: Создать объект "notepad" для работы с массивом заметок.

// Каждая заметка это объект следующего формата:

// id: string | integer (уникальный идентификатор объекта, чтобы можно было найти его в коллекции),
// title: string (заголовок заметки, строка),
// body: string (текст заметки, строка),
// priority: integer [0-2] (значение приоритета, от 0 (низкий) до 2 (высокий)).

// Карта приоритетов:

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

// Модель обьекта "notepad":

const notepad = {
  notes: [],

  getNotes() {
    return this.notes;
  },

  saveNote(note) {
    //   Сохраняет заметку в массив notes.
    return this.notes.push(note);
  },

  findNoteById(id) {
    //   Ищет заметку в массиве notes.
    for (const note of this.notes) {
      if (note.id === id) {
        return note;
      }
    }
  },

  filterNotes(query = '') {
    // Фильтрует массив заметок по подстроке 'query',
    // Если значение 'query' есть в заголовке или теле заметки, то она подходит:
    newFilteredNotes = [];
    for (const note of this.notes) {
      const hasQueryInTitle = note.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const hasQueryInBody = note.body
        .toLowerCase()
        .includes(query.toLowerCase());
      if (hasQueryInTitle || hasQueryInBody) {
        newFilteredNotes.push(note);
      }
    }
    return newFilteredNotes;
  },

  updateNotePriority(id, priority) {
    // Обновляет приоритет заметки по идентификатору заметки.
    const note = this.findNoteById(id);
    if (!note) {
      return;
    }
    note.priority = priority;
  },

  updateNoteContent(id, { field, value }) {
    // Дестуктуризируем поле 'title' в заметка по указанному id:
    const note = this.findNoteById(id);

    if (!note) return;

    note[field] = value;
  },

  deleteNote(id) {
    // Удаляет заметку по идентификатору (id) из массива notes.
    for (let i = 0; i < this.notes.length; i += 1) {
      const note = this.notes[i];

      if (note.id === id) {
        this.notes.splice(i, 1);
        return;
      }
    }
  },

};

// Проверка рабочей модели тестами:

// Добавим 4 новые заметки.

notepad.saveNote({
  id: 1,
  title: 'JavaScript essentials',
  body:
    'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
  priority: PRIORITY_TYPES.HIGH,
});

notepad.saveNote({
  id: 2,
  title: 'Refresh HTML and CSS',
  body:
    'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
  priority: PRIORITY_TYPES.NORMAL,
});

notepad.saveNote({
  id: 3,
  title: 'Get comfy with Frontend frameworks',
  body:
    'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: PRIORITY_TYPES.NORMAL,
});

notepad.saveNote({
  id: 4,
  title: 'Winter clothes',
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW,
});

// Выводим все текущие заметки:
console.log('Все текущие заметки: ', notepad.getNotes());

// Выводим заметку с существующим id:
console.log(notepad.findNoteById(2));

// Выводим заметку с несуществующим id:
console.log(notepad.findNoteById(5));

//   Oтфильтровать и отобразить заметки по слову 'html' в заголовке или теле заметки:
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotes('html'),
);

//   Oтфильтровать и отобразить  заметки по слову 'javascript' в заголовке или теле заметки:
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotes('javascript'),
);

//   Повышаем приоритет заметки с id:4
notepad.updateNotePriority(4, PRIORITY_TYPES.HIGH);
//  Выводим все текущие заметки:
console.log(
  'Заметки после обновления приоритета для id 4: ',
  notepad.getNotes(),
);

//   Понижаем приоритет заметки с id:3
notepad.updateNotePriority(3, PRIORITY_TYPES.LOW);
// Выводим все текущие заметки:
console.log(
  'Заметки после обновления приоритета для id 3: ',
  notepad.getNotes(),
);

// Обновим поле 'title' в заметке с id 3:
notepad.updateNoteContent(3, {
  field: 'title',
  value: 'Get comfy with React.js',
});
// Выводим все текущие заметки:
console.log(
  'Заметки после обновления контента заметки с id 3: ',
  notepad.getNotes(),
);

// Удаляем заметку с id:2 и проверяем масив после удаления заметки:
notepad.deleteNote(2);
console.log('Заметки после удаления с id 2: ', notepad.getNotes());
