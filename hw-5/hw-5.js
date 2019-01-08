'use strict'
// Написать функцию-конструктор "Notepad" для создания объекта управляющего коллекцией заметок.

// Карта приоритетов:

const PRIORITY_TYPES = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
};

const Notepad = function Notepad(notes = []) {
    this.notes = notes;

    this.getNotes = function () {
            return this.notes;
        },

        this.findNoteById = function (id) {
            for (const note of this.notes) {
                if (note.id === id)
                    return note;
            }
        },
        this.saveNote = function (note) {
            return this.notes.push(note);
        },

        this.updateNotePriority = function (id, priority) {
            const note = this.findNoteById(id);
            if (!note) {
                return;
            }
            note.priority = priority;
        },

        this.filterNotes = function (query = "") {
            let newFilteredNotes = [];
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

        this.updateNoteContent = function(id, updatedContent) {
            let note = this.findNoteById(id);
            if (!note) return;
        
            for (let field in updatedContent) {
              note[field] = updatedContent[field];
            }
        
            return note;
          };

        this.deleteNote = function (id) {
            for (let i = 0; i < this.notes.length; i += 1) {
                const note = this.notes[i];
                if (note.id === id) {
                    this.notes.splice(i, 1);
                    return;
                }
            }
        }

};

const initialNotes = [{
        id: 1,
        title: 'JavaScript essentials',
        body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
        priority: PRIORITY_TYPES.HIGH,
    },
    {
        id: 2,
        title: 'Refresh HTML and CSS',
        body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
        priority: PRIORITY_TYPES.NORMAL,
    },
];



const notepad = new Notepad(initialNotes);

/*
  Смотрю что у меня в заметках после инициализации
*/
console.log('Все текущие заметки: ', notepad.getNotes());

/*
  Добавляю еще 2 заметки и смотрю что получилось
*/
notepad.saveNote({
    id: 3,
    title: 'Get comfy with Frontend frameworks',
    body: 'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
});

notepad.saveNote({
    id: 4,
    title: 'Winter clothes',
    body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
});

console.log('Все текущие заметки: ', notepad.getNotes());

/*
  Зима уже близко, пора поднять приоритет на покупку одежды
*/
notepad.updateNotePriority(4, PRIORITY_TYPES.NORMAL);
console.log(
    'Заметки после обновления приоритета для id 4: ',
    notepad.getNotes(),
);

/*
  Решил что фреймворки отложу немного, понижаю приоритет
*/
notepad.updateNotePriority(3, PRIORITY_TYPES.LOW);
console.log(
    'Заметки после обновления приоритета для id 3: ',
    notepad.getNotes(),
);

/*
  Решил отфильтровать заметки по слову html
*/
console.log(
    'Отфильтровали заметки по ключевому слову "html": ',
    notepad.filterNotes('html'),
);

/*
  Решил отфильтровать заметки по слову javascript
*/
console.log(
    'Отфильтровали заметки по ключевому слову "javascript": ',
    notepad.filterNotes('javascript'),
);

/*
  Обновим контент заметки с id 3
*/
notepad.updateNoteContent(3, {
    title: 'Get comfy with React.js or Vue.js'
});
console.log(
    'Заметки после обновления контента заметки с id 3: ',
    notepad.getNotes(),
);

/*
  Повторил HTML и CSS, удаляю запись c id 2
*/
notepad.deleteNote(2);
console.log('Заметки после удаления с id 2: ', notepad.getNotes());