"use strict"

// Функциональный класс 'Notepad'

class Notepad {
    constructor(notes = []) {
        this._notes = notes;
    }
    static getPriorityName(priorityId) {
        return Notepad.PRIORITIES[priorityId].name;
    };
    get notes() {
        return this._notes;
    };
    findNoteById(id) {
        for (const note of this._notes) {
            if (note.id === id) return note;
        }
    };
    saveNote(note) {
        return this._notes.push(note);
    };
    updateNotePriority(id, priority) {
        const note = this.findNoteById(id);
        if (!note) {
            return;
        }
        note.priority = priority;
    };
    filterNotesByQuery(query = '') {
        let newFilteredNotes = [];
        for (const note of this._notes) {
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
    };
    filterNotesByPriority(priority) {
        const newFilterNotesByPriority = [];

        for (const note of this._notes) {
            if (note.priority === priority) {
                newFilterNotesByPriority.push(note);
            }
        }
        return newFilterNotesByPriority;
    };
    updateNoteContent(id, updatedContent) {
        let note = this.findNoteById(id);
        if (!note) return;

        for (let field in updatedContent) {
            note[field] = updatedContent[field];
        }
        return note;
    };
    deleteNote(id) {
        for (let i = 0; i < this._notes.length; i += 1) {
            const note = this._notes[i];
            if (note.id === id) {
                this._notes.splice(i, 1);
                return;
            }
        }
    }
};

// Карта приоритетов
Notepad.PRIORITIES = {
    0: {id: 0,value: 0,name: 'Low'},
    1: {id: 1,value: 1,name: 'Normal'},
    2: {id: 2,value: 2, name: 'High'},
};

// Инициализация всех текущих заметок
const notepad = new Notepad(initialNotes);

// // Проверка списка всех текущих заметок
// console.log('Все текущие заметки: ', notepad.notes);


// // Добавление заметок
// notepad.saveNote({});
// console.log('Все текущие заметки: ', notepad.notes);

// // Изменение приоритета для заметок
// notepad.updateNotePriority(n, PRIORITY_TYPES.'VALUES');
// console.log('Заметки после обновления приоритета для id 'n': ', notepad.notes);
 
// // Фильтр заметок по слову(строке) "qwerty"
// console.log(
// 'Отфильтровали заметки по ключевому слову "qwerty": ',
// notepad.filterNotesByQuery('qwerty'),
// );

// // Фильтр заметок по приоритету
// console.log(
// 'Отфильтровали заметки по значению приоритету: ',
// notepad.filterNotesByPriority(PRIORITY_TYPES.'знач'),
// );

// // Обновление контента заметки по id
// notepad.updateNoteContent('id', {
// title: 'qwertyqwertyqwerty'
// });
// console.log(
// 'Заметки после обновления контента заметки с id '...': ',
// notepad.notes,
// );

// // Удаление заметки по id
// notepad.deleteNote('id');
// console.log('Заметки после удаления: ', notepad.notes);