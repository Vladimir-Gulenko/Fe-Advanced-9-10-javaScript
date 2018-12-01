'use strict';

// Напишите скрипт имитирующий авторизацию администратора в панели управления.

// При загрузке страницы у посетителя запрашивается логин через prompt:

// Если посетитель нажал Cancel — показывать alert с текстом Отменено пользователем!
// Если было введено что либо другое, что не совпадает со значением константы adminLogin, показывать alert с текстом Доступ запрещен, неверный логин!
// Если был введен логин совпадающий со значением константы adminLogin, спрашивать пароль через prompt.
// При вводе пароля:

// Если нажали Cancel, показывать alert с текстом Отменено пользователем!
// Если введен пароль который не совпадает со значением константы adminPassword, показывать alert с текстом Доступ запрещен, неверный пароль!
// Если введён пароль который совпадает со значением константы adminPassword, показывать alert с текстом Добро пожаловать!

const adminLogin = 'admin';
const adminPassword = 'm4ng0h4ckz';

const adminLoginInputWrong = 'Доступ запрещен, неверный логин!';
const adminLoginInputCancel = 'Отменено пользователем!';

const adminPasswordWrong = 'Доступ запрещен, неверный логин!';
const admminPasswordCancel = 'Отменено пользователем!';

const adminInputCorrect = 'Добро пожаловать!';

const adminLoginInput = prompt('Пожалуйста введите Ваш логин!', '');
if (adminLoginInput === null) {
    alert(adminLoginInputCancel);
} else if (adminLoginInput !== adminLogin) {
    alert(adminLoginInputWrong);
} else {
    const adminPasswordInput = prompt('Пожалуйста введите Ваш пароль!', '');
    if (adminPasswordInput === null) {
        alert(admminPasswordCancel);
    } else if (adminPasswordInput !== adminPassword) {
        alert(adminPasswordWrong);
    } else {
        alert(adminInputCorrect);
    }
}