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


const notepad = new Notepad(notes);
const refs = getRefs();
const notyf = new Notyf();
MicroModal.init();


// Почему не работает через refs.titleInput & refs.bodyInput???
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
  const newItem = {
    id: `${Notepad.generateUniqueId()}`,
    title: `${newTitle}`,
    body: `${newBody}`,
    priority: PRIORITY_TYPES.LOW,
  };
  notepad.saveNote(newItem);
  refs.form.reset();
  MicroModal.close('note-editor-modal');
  notyf.confirm("Заметка успешно добавлена")
  addListItem(refs.list, newItem);
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

// Вызов функции генерации заметок в DOM
renderListItems(refs.list, notes);


//  Добавление слушателей
refs.form.addEventListener('submit', handleSubmit);
refs.inputSearchForm.addEventListener('focus', search);
refs.list.addEventListener('click', handleRemoveNote);
refs.list.addEventListener('click', hendleListItemBtnClick);
refs.openEditorModalButton.addEventListener('click', handleAddClick)

// Выводим в консоль структуру DOM заметок
console.log(refs.list);