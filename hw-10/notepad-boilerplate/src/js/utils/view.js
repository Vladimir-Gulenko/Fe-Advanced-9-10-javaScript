import {
    ICON_TYPES,
    NOTE_ACTIONS
} from './../utils/constants';

import Notepad from './notepad-model'

// Функция возвращает ссылки на обьявления
export const getRefs = () => ({
    list: document.querySelector('.note-list'),
    inputSearchForm: document.querySelector('.search-form__input'),
    form: document.querySelector('.note-editor'),
});

// Функция создает DOM элемент(заметку) и возвращает ссылку на него
export const createListItem = ({id,title,body,priority}) => {
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
export const createNoteContent = (title, body) => {
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
export const createNoteFooter = priority => {
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
export const createActionButton = (action, icon) => {
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
export const renderListItems = (listRef, notes) => {
    const renderListItem = notes.map(note => createListItem(note));
    listRef.innerHTML = '';
    listRef.append(...renderListItem);

    return listRef;
};