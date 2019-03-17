import {
    NOTE_ACTIONS,
    PRIORITY_TYPES
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
import storage from './utils/storage'


// const notepad = new Notepad(notes);
const refs = getRefs();
const notyf = new Notyf();
MicroModal.init();


const titleInput = refs.form.querySelector('input');
const bodyInput = refs.form.querySelector('textarea');

//Функция для заполнения полей новой заметки
const handleSubmit = e => {
  e.preventDefault();
  const newTitle = titleInput.value.trim();
  const newBody = bodyInput.value.trim();

  if (newTitle === '' || newBody === '') {
    return notyf.alert('Необходимо заполнить все поля!');
  }
  const savedItem = item.saveNote(newTitle, newBody);
  savedItem.then(savedNotes => addListItem(refs.list, savedNotes));
  event.currentTarget.reset();
  MicroModal.close('note-editor-modal');
  notyf.confirm("Заметка успешно добавлена")
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
const hendleListItemBtnClick = ({ target }) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;

  const action = target.parentNode.dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
   console.log('DELETE');
   notyf.confirm('Заметка успешно удалена')
      break;

    case NOTE_ACTIONS.EDIT:
      console.log('EDIT');
      notyf.confirm('Заметка успешно отредактирована')
      break;

    case NOTE_ACTIONS.INCREASE_PRIORITY:
      console.log('INCREASE_PRIORITY');
      break;

    case NOTE_ACTIONS.DECREASE_PRIORITY:
      console.log('DECREASE_PRIORITY');
      break;

    default:
      // Никогда не случится
      notyf.alert('Произошла ошибка')
  }
};

// Функция активации модального окна
const handleAddClick = element => {
  MicroModal.show('note-editor-modal');
}

// Загружаем с localStorage сохраненные заметки
const getNotesFromLocalStorage = storage.load('notes');
const getNotes = getNotesFromLocalStorage ? getNotesFromLocalStorage : [];

const item = new Notepad(getNotes);


// Вызов функции генерации заметок в DOM
renderListItems(refs.list, item.notes);


//  Добавление слушателей
refs.form.addEventListener('submit', handleSubmit);
refs.inputSearchForm.addEventListener('focus', search);
refs.list.addEventListener('click', handleRemoveNote);
refs.list.addEventListener('click', hendleListItemBtnClick);
refs.openEditorModalButton.addEventListener('click', handleAddClick)

// Выводим в консоль структуру DOM заметок
console.log(refs.list);