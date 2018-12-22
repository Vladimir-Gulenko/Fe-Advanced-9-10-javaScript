'use strict';

// Есть массив logins с логинами пользователей. Напишите скрипт добавления логина в массив logins.
// Добавляемый логин должен:
// - проходить проверку на длину от 4 до 16-ти символов включительно;
// - быть уникален, то есть отсутствовать в массиве logins;
// Далее напишите функцию addLogin(allLogins, login) которая:

// Принимает новый логин и массив всех логинов как параметры
// Проверяет валидность логина используя вспомогательную функцию isLoginValid
// Если логин не валиден, прекратить исполнение функции addLogin и вернуть строку 'Ошибка! Логин должен быть от 4 до 16 символов'
// Если логин валиден, функция addLogin проверяеть уникальность логина с помощью функции isLoginUnique
// Если isLoginUnique вернет true, addLogin добавляет новый логин в logins и возвращает строку 'Логин успешно добавлен!'
// Если isLoginUnique вернет false, тогда addLogin не добавляет логин в массив и возвращает строку 'Такой логин уже используется!'

let logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
const greeting = 'Логин успешно добавлен!';
const error = 'Ошибка! Логин должен быть от 4 до 16 символов';
const repetition = 'Такой логин уже используется!';
const login = prompt('Введите логин!'); //запрос на ввод нового логина

//проверка введенного логина на количество символов
const isLoginValid = login => {
  if (login.length < 4 || login.length > 16) {
    // alert(error); - mistake
    return false;
  }
  return true;
};

//проверка на совпадения введенного логина с существующими в масиве(logins)
const isLoginUnique = (login, allLogins) => {
  if (allLogins.includes(login)) {
    // alert(repetition); - mistake
    return false;
  }
  return true;
};

const addLogin = (login, logins) => {
  if (isLoginValid(login) === false) {
    alert(error);
  } else if (isLoginUnique(login, logins) === false) {
    alert(repetition);
  } else {
    logins.push(login);
    alert(greeting);
  }
  console.log(logins);
};

//вызов функций
addLogin(login, logins);

// // добавление нового логина в массив(logins) - mistake
// const addLogin = (login, logins) => {
//     if (isLoginValid(login) && isLoginUnique(login, logins)) {
//         alert(greeting);
//         logins.push(login);
//     }
// };

//Проверка

// const login = 'Bob'; // "Ошибка! Логин должен быть от 4 до 16 символов";
// const login = 'Poly'; // "Такой логин уже используется!";
// const login = 'Boby'; // "Логин успешно добавлен!";
