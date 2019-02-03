"use strict"


// Функция создает DOM элемент(заметку) и возвращает ссылку на него
const createListItem = ({id,noteTitle,noteBody,priority}) => {
    const listItem = document.createElement('li');
    listItem.classList.add('note-list__item');
    listItem.dataset.id = id;

    const noteBox = document.createElement('div');
    noteBox.classList.add('note');

    const noteContent = createNoteContent(noteTitle, noteBody);
    const noteFooter = createNoteFooter(priority);
    noteBox.append(noteContent, noteFooter);

    listItem.append(noteBox);

    return listItem;
};

// Функция создает тело заметки и возвращает ссылку на него
const createNoteContent = () => {
    const noteContent = document.createElement('div');
    noteContent.classList.add('note_content');

    const noteTitle = document.createElement('h2');
    noteTitle.classList.add('note__title');
    noteTitle.textContent = 'Lorem, ipsum dolor.';

    const noteBody = document.createElement('p');
    noteBody.classList.add('note__body');
    noteBody.textContent =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus libero atque, sint quas impedit est illum labore veniam aspernatur nequenostrum aliquam dicta blanditiis.Esse porro impedit ratione soluta amet ? ';

    noteContent.append(noteTitle, noteBody);

    return noteContent;
};

// Функция создает 'footer' заметки и возвращает ссылку на него
const createNoteFooter = priority => {
    const noteFooter = document.createElement('footer');
    noteFooter.classList.add('note__footer');

    const noteFooterSectionFirst = document.createElement('section');
    noteFooterSectionFirst.classList.add('note__section');

    const noteButtonDecr = createActionButton(NOTE_ACTIONS.DECREASE_PRIORITY, ICON_TYPES.ARROW_DOWN);
    const noteButtonIncr = createActionButton(NOTE_ACTIONS.INCREASE_PRIORITY, ICON_TYPES.ARROW_UP, );

    const notePriority = document.createElement('span');
    notePriority.classList.add('note__priority');
    notePriority.textContent = `Priority: ${notepad.getPriorityName(priority)}`;

    const noteFooterSectionSecond = noteFooterSection.cloneNode(false);

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

const renderListItems = (listRef, initialNotes) => {
    const listItems = initialNotes.map(item => createListItem(item));
  
    listRef.append(...listItems);
  };

const list = document.querySelector('.note-list');

renderListItems(list, initialNotes);