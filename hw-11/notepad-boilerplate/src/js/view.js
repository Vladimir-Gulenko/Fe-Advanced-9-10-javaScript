
import Notepad from './notepad-model'
import noteTemplate from './../templates/note.hbs';


// Функция возвращает ссылки на обьявления
export const getRefs = () => ({
    list: document.querySelector('.note-list'),
    inputSearchForm: document.querySelector('.search-form__input'),
    form: document.querySelector('.note-editor'),
    openEditorModalButton: document.querySelector(
        'button[data-action="open-editor"]',
    ),
});

// Добавление заметки из шаблона

const createNoteMarkup = note => {
    // const noteWithPriority = Object.assign(note, {
    //   priority: Notepad.getPriorityName(),
    // });
  
    return noteTemplate(note);
  };
  
  const createNoteListItemsMarkup = notes => {
    return notes.map(note => createNoteMarkup(note)).join('');
  };
  
  export const addListItem = (listRef, note) => {
    const noteMarkup = createNoteMarkup(note);
  
    listRef.insertAdjacentHTML('beforeend', noteMarkup);
  };
  
  export const findParentListItem = child => {
    const parentListItem = child.closest('.note-list__item');
  
    return parentListItem;
  };
  
  export const removeListItem = listItem => {
    listItem.remove();
  };
  
  export const renderListItems = (listRef, notes) => {
    const markup = createNoteListItemsMarkup(notes);
  
    listRef.innerHTML = '';
    listRef.insertAdjacentHTML('beforeend', markup);
  };

  