import {
  PRIORITY_TYPES,
  PRIORITIES,
} from './utils/constants';
import * as api from './../services/api';

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
    if (valuesPriorityType.includes(priorityId)) {
      return PRIORITIES[priorityId].name;
    }

    return PRIORITY_TYPES.LOW;
  }


  // Конструктор класса
  constructor(notes = []) {
    this._notes = notes;
  }

  // Сохраняет новую заметку в масиве заметок
  saveNote(title, body) {
    return new Promise(resolve => {
        setTimeout(() => {
          const newItem = {
            id: Notepad.generateUniqueId(),
            title: title,
            body: body,
            priority: Notepad.getPriorityName(),
          };

          resolve(newItem);
        }, 200);
      })
      .then(note => {
        return api.saveNote(note);
      })
      .then(note => {
        this._notes.push(note);

        return note;
      });
  }

  // Получает ссылку на масив заметок
  get notes() {
    return api.getNotes().then(notes => {
      this._notes = notes;

      return this._notes;
    });
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
  filterNotesByQuery(query) {
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredNote = [];
        for (let i = 0; i < this._notes.length; i += 1) {
          const {
            title,
            body
          } = this._notes[i];
          const note = `${title} ${body}`;
          const resultNote = note.toLowerCase().includes(query.toLowerCase());
          if (resultNote) {
            filteredNote.push(this._notes[i]);
          }

          resolve(filteredNote);
        }
      }, 200);
    });
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
    return new Promise(resolve => {
        setTimeout(() => {
          this._notes = this._notes.filter(item => item.id !== id);

          resolve(this._notes);
        }, 200);
      })
      .then(() => {
        this._notes = this._notes.filter(item => item.id !== id);

        return id;
      })
      .then(id => {
        api.deleteNote(id);
      });
  }

};