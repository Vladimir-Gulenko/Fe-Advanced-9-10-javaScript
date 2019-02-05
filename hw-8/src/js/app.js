'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less'
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority'
};


const notes = [{
    id: 1,
    title: 'JavaScript essentials',
    body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH
  },
  {
    id: 2,
    title: 'Refresh HTML and CSS',
    body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL
  },
  {
    id: 3,
    title: 'Get comfy with Frontend frameworks',
    body: 'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL
  },
  {
    id: 4,
    title: 'Winter clothes',
    body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW
  }
];

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
  0: {
    id: 0,
    value: 0,
    name: 'Low'
  },
  1: {
    id: 1,
    value: 1,
    name: 'Normal'
  },
  2: {
    id: 2,
    value: 2,
    name: 'High'
  },
};

// Инициализация всех текущих заметок
const notepad = new Notepad(notes);


// Функция создает DOM элемент(заметку) и возвращает ссылку на него
const createListItem = ({id, title, body, priority}) => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;

  const noteBox = document.createElement('div');
  noteBox.classList.add('note');

  const noteContent = createNoteContent(title, body);
  const noteFooter = createNoteFooter(priority);
  noteBox.append(noteContent, noteFooter);

  listItem.append(noteBox);

  return listItem;
};

// Функция создает тело заметки и возвращает ссылку на него
const createNoteContent = (title, body) => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note_content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent =body;

  noteContent.append(noteTitle, noteBody);

  return noteContent;
};

// Функция создает 'footer' заметки и возвращает ссылку на него
const createNoteFooter = (priority) => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const noteFooterSectionFirst = document.createElement('section');
  noteFooterSectionFirst.classList.add('note__section');

  const noteButtonDecr = createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY, ICON_TYPES.ARROW_DOWN);
  const noteButtonIncr = createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY, ICON_TYPES.ARROW_UP, );

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${Notepad.getPriorityName(priority)}`;

  const noteFooterSectionSecond = noteFooterSectionFirst.cloneNode(false);

  const noteButtonEdit = createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT);
  const noteButtonDelete = createActionButton(NOTE_ACTIONS.DELETE, ICON_TYPES.DELETE, );

  noteFooterSectionFirst.append(noteButtonDecr, noteButtonIncr, notePriority);
  noteFooterSectionSecond.append(noteButtonEdit, noteButtonDelete);

  noteFooter.append(noteFooterSectionFirst, notePriority, noteFooterSectionSecond);

  return noteFooter;
};


// Функция добавляет кнопки в секции
const createActionButton = (action, icon) => {
  const actionButton = document.createElement('button');
  actionButton.classList.add('action');
  actionButton.dataset.action = action;

  const actionIcon = document.createElement('i');
  actionIcon.classList.add('material-icons', 'action__icon');
  actionIcon.textContent = icon;

  actionButton.append(actionIcon);
  return actionButton;
};

const renderListItems = (listRef, notes) => {
  const listItems = notes.map(note => createListItem(note));

  listRef.append(...listItems);
};

const list = document.querySelector('.note-list');

renderListItems(list, notes);


console.log(list);
