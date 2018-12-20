'use strict';

// Есть массив logins с логинами пользователей. Напишите скрипт добавления логина в массив logins. 
// Добавляемый логин должен:
// - проходить проверку на длину от 4 до 16-ти символов включительно;
// - быть уникален, то есть отсутствовать в массиве logins;

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
const greeting = "Логин успешно добавлен!";
const error = "Ошибка! Логин должен быть от 4 до 16 символов";
const repetition = "Такой логин уже используется!";
const login = prompt('Введите логин!'); //запрос на ввод нового логина

//проверка введенного логина на количество символов
const isLoginValid = (login) => {
    if (login.length < 4 || login.length > 16) {
        alert(error);
        return false;
    }
    return true;
};

//проверка на совпадения введенного логина с существующими в масиве(logins)
const isLoginUnique = (login, allLogins) => {
    if (allLogins.includes(login)) {
        alert(repetition);
        return false;
    }
    return true;
};

// добавление нового логина в массив(logins)
const addLogin = (login) => {
    if (isLoginValid(login) && isLoginUnique(login, logins)) {
        alert(greeting);
        logins.push(login);
    }
};

//вызов функций
addLogin(login);

//Проверка

login = 'Bob'; // "Ошибка! Логин должен быть от 4 до 16 символов";
login = 'Poly'; // "Такой логин уже используется!";
login = 'Boby'; // "Логин успешно добавлен!";