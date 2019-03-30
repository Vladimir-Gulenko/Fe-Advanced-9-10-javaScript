import {
  NOTE_ACTIONS,
  NOTIFICATION_MESSAGES
} from './utils/constants';
import Notepad from './notepad-model';
import notes from './../assets/notes.json';
import {
  getRefs,
  addListItem,
  renderListItems
} from './view';
import Notyf from 'notyf';
import MicroModal from 'micromodal';
import 'notyf/dist/notyf.min.css';
import * as api from './servises/api';


const refs = getRefs();
const notyf = new Notyf();
MicroModal.init();
const item = new Notepad(notes);


const titleInput = refs.form.querySelector('input');
const bodyInput = refs.form.querySelector('textarea');

// Функция получения заметок с сервера
api
  .getNotes()
  .then(note => {
    renderListItems(refs.list, note);
    item._notes = note;
  })
  .catch(error => {
    notyf.confirm(`${error}`);
  });


//Функция для заполнения полей новой заметки
const handleSubmit = e => {
  e.preventDefault();
  const newTitle = titleInput.value.trim();
  const newBody = bodyInput.value.trim();

  if (newTitle === '' || newBody === '') {
    return notyf.alert('Необходимо заполнить все поля!');
  }
  try {
    const savedItem = item.saveNote(newTitle, newBody);
    savedItem.then(savedNotes => addListItem(refs.list, savedNotes));
    event.currentTarget.reset();
  } catch (error) {
    notyf.confirm(`Произошла ошибка: ${error.message}`);
  }
  MicroModal.close('note-editor-modal');
};

// Функция заполнения поисковой формы
const curentInputValue = e => {
  const target = e.target;
  const searchedItem = item.filterNotesByQuery(target.value);
  refs.list.innerHTML = '';
  return renderListItems(refs.list, searchedItem);
};

// Функция поиска заметок
const search = e => {
  const target = e.target;
  target.oninput = curentInputValue;
};

// Функция удаления заметок
const handleRemoveNote = e => {
  const target = e.target;
  const nodeName = target.nodeName;
  if (target.textContent !== "delete" || nodeName !== 'I') return;
  const liRemove = target.closest("li");
  const idRemove = liRemove.dataset.id;
  item.deleteNote(idRemove);
  liRemove.remove();
};

// Функция активации кнопок заметки
const hendleListItemBtnClick = ({
  target
}) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;

  const action = target.parentNode.dataset.action;

  switch (action) {

    case NOTE_ACTIONS.DELETE:
      notyf.confirm(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS)
      break;

    case NOTE_ACTIONS.EDIT:
      notyf.confirm(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY)
      break;

    case NOTE_ACTIONS.INCREASE_PRIORITY:
      notyf.confirm(NOTIFICATION_MESSAGES. INCREASE_PRIORITY_UP)
      break;

    case NOTE_ACTIONS.DECREASE_PRIORITY:
      notyf.confirm(NOTIFICATION_MESSAGES. INCREASE_PRIORITY_DOWN)
      break;
};
};

// Функция активации модального окна
const handleAddClick = element => {
  MicroModal.show('note-editor-modal');
};

// Вызов функции генерации заметок в DOM
renderListItems(refs.list, item.notes);

//  Добавление слушателей
refs.form.addEventListener('submit', handleSubmit);
refs.inputSearchForm.addEventListener('input', search);
refs.list.addEventListener('click', handleRemoveNote);
refs.list.addEventListener('click', hendleListItemBtnClick);
refs.openEditorModalButton.addEventListener('click', handleAddClick);

// Выводим в консоль структуру DOM заметок
console.log(refs.list);