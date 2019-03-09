import {
  PRIORITY_TYPES, PRIORITIES
} from './utils/constants';

// Функциональный класс 'Notepad'
export default class Notepad {

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
    let valuesPriorityType = Object.values(PRIORITY_TYPES);
    let idPriorities = PRIORITIES[priorityId].id;

    if (valuesPriorityType.includes(idPriorities)) {
        return PRIORITIES[priorityId].name;
    }
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

