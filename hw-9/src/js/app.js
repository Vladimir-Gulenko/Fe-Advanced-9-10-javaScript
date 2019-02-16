'use strict';

// Карта с числовыми значениями приоритетов
const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

// Идентификаторы иконок
const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

// Идентификаторы кнопок
const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

// Масив заметок по умолчанию
const notes = [
  {
    id: 1,
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 2,
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 3,
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 4,
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

// Функциональный класс 'Notepad'
class Notepad {

  // Генерирует уникальный ID
  static generateUniqueId() {
    const uniqueId =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    return uniqueId;
  }

  // Получает приоритет заметки
  static getPriorityName(priorityId) {
    return Notepad.PRIORITIES[priorityId].name;
  }

  // Конструктор класса
  constructor(notes = []) {
    this._notes = notes;
  }

  // Сохраняет новую заметку в масиве заметок
  saveNote(note) {
    this._notes.push(note);
  }
  // Получает ссылку на масив заметок
  get notes() {
    return this._notes;
  }

  // Поиск заметки по ID
  findNoteById(id) {
    const note = this._notes.find(note => note.id === id);
    return note;
  }

  // Обновляет приоритет заметки по ID
  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) {
      return;
    }
    note.priority = priority;
    return note;
  }

  // Фильтрует заметки по строке
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
  }

  // Фильтрует заметки по приоритету
  filterNotesByPriority(priority) {
    const newFilterNotesByPriority = [];

    for (const note of this._notes) {
      if (note.priority === priority) {
        newFilterNotesByPriority.push(note);
      }
    }
    return newFilterNotesByPriority;
  }

  // Обновляет тело заметки
  updateNoteContent(id, updatedContent) {
    let note = this.findNoteById(id);
    if (!note) return;

    for (let field in updatedContent) {
      note[field] = updatedContent[field];
    }
    return note;
  }

  // Удаляет заметку
  deleteNote(id) {
    this._notes = this._notes.filter(note => note.id !== id);
  }

};

// Карта приоритетов
Notepad.PRIORITIES = {
  0: {
    id: 0,
    value: 0,
    name: 'Low',
  },
  1: {
    id: 1,
    value: 1,
    name: 'Normal',
  },
  2: {
    id: 2,
    value: 2,
    name: 'High',
  },
};

// Инициализация функционального класа для всех заметок
const notepad = new Notepad(notes);

// CСобираем ссылки на объявления DOM узлов в одном обьекте
const refs = {
  list: document.querySelector('.note-list'),
  inputSearchForm: document.querySelector('.search-form__input'),
  form : document.querySelector('.note-editor'),
  // titleInput: document.querySelector('input'),
  // bodyInput: document.form.querySelector('textarea'),
};

// Функция создает DOM элемент(заметку) и возвращает ссылку на него
const createListItem = ({ id, title, body, priority }) => {
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
  noteBody.textContent = body;

  noteContent.append(noteTitle, noteBody);

  return noteContent;
};

// Функция создает 'footer' заметки и возвращает ссылку на него
const createNoteFooter = priority => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const noteFooterSectionFirst = document.createElement('section');
  noteFooterSectionFirst.classList.add('note__section');

  const noteButtonDecr = createActionButton(
    NOTE_ACTIONS.DECREASE_PRIORITY,
    ICON_TYPES.ARROW_DOWN,
  );
  const noteButtonIncr = createActionButton(
    NOTE_ACTIONS.INCREASE_PRIORITY,
    ICON_TYPES.ARROW_UP,
  );

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${Notepad.getPriorityName(priority)}`;

  const noteFooterSectionSecond = noteFooterSectionFirst.cloneNode(false);

  const noteButtonEdit = createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT);
  const noteButtonDelete = createActionButton(
    NOTE_ACTIONS.DELETE,
    ICON_TYPES.DELETE,
  );

  noteFooterSectionFirst.append(noteButtonDecr, noteButtonIncr, notePriority);
  noteFooterSectionSecond.append(noteButtonEdit, noteButtonDelete);

  noteFooter.append(
    noteFooterSectionFirst,
    notePriority,
    noteFooterSectionSecond,
  );

  return noteFooter;
};

// Функция создает кнопки для секций тела заметок и возвращает ссылки на них
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

// Функция генерирует заметки в DOM
const renderListItems = (listRef, notes) => {
  const renderListItem = notes.map(note => createListItem(note));
  listRef.append(...renderListItem);

  return listRef;
};

// Вызов функции генерации заметок в DOM
renderListItems(refs.list, notes);

// Почему не работает через refs.titleInput & refs.bodyInput???
const titleInput = refs.form.querySelector('input');
const bodyInput = refs.form.querySelector('textarea');

//Функция для заполнения полей новой заметки
const handleSubmit = e => {
  e.preventDefault();
  const newTitle = titleInput.value.trim();
  const newBody = bodyInput.value.trim();

  if (newTitle === '' || newBody === '') {
    return alert('Необходимо заполнить все поля!');
  }
  const newItem = {
    id: `${Notepad.generateUniqueId()}`,
    title: `${newTitle}`,
    body: `${newBody}`,
    priority: PRIORITY_TYPES.LOW,
  };
  notepad.saveNote(newItem);
  refs.form.reset();
  addListItem(refs.list, newItem);
};

//Функция добавления новой заметки
const addListItem = (listRef, note) => {
  const renderNewListItem = createListItem(note);
  listRef.append(renderNewListItem);
};

// Функция заполнения поисковой формы
const curentInputValue = evt => {
  const target = evt.target;
  const searchedItem = notepad.filterNotesByQuery(target.value);
  refs.list.innerHTML = '';
  renderListItems(refs.list, searchedItem);
};

// Функция поиска заметок
const search = evt => {
  const target = evt.target;
  target.oninput = curentInputValue;
};

// Функция удаления заметок
const handleRemoveNote = e => {
  const target = e.target;
  const nodeName = target.nodeName;
  const action = target.textContent;
  if (nodeName !== 'I' || action !== 'delete') return;
  const parent = target.closest('.note-list__item');
  parent.remove();
};

// Функция активации кнопок заметки
const hendleListItemBtnClick = ({ target }) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;

  const action = target.parentNode.dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
   console.log('DELETE');
      break;

    case NOTE_ACTIONS.EDIT:
      console.log('EDIT');
      break;

    case NOTE_ACTIONS.INCREASE_PRIORITY:
      console.log('INCREASE_PRIORITY');
      break;

    case NOTE_ACTIONS.DECREASE_PRIORITY:
      console.log('DECREASE_PRIORITY');
      break;

    default:
      // Никогда не случится
      alert('NOT A BUTTON');
  }
};

//  Добавление слушателей
refs.form.addEventListener('submit', handleSubmit);
refs.inputSearchForm.addEventListener('focus', search);
refs.list.addEventListener('click', handleRemoveNote);
refs.list.addEventListener('click', hendleListItemBtnClick);

// Выводим в консоль структуру DOM заметок
console.log(refs.list);
