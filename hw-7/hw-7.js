'use strict';

// Массив пользователей

const users = [{
        id: '701b29c3-b35d-4cf1-a5f6-8b12b29a5081',
        name: 'Moore Hensley',
        email: 'moorehensley@indexia.com',
        eyeColor: 'blue',
        friends: ['Sharron Pace'],
        isActive: false,
        balance: 2811,
        skills: ['ipsum', 'lorem'],
        gender: 'male',
        age: 37,
    },
    {
        id: '7a3cbd18-57a1-4534-8e12-1caad921bda1',
        name: 'Sharlene Bush',
        email: 'sharlenebush@tubesys.com',
        eyeColor: 'blue',
        friends: ['Briana Decker', 'Sharron Pace'],
        isActive: true,
        balance: 3821,
        skills: ['tempor', 'mollit', 'commodo', 'veniam', 'laborum'],
        gender: 'female',
        age: 34,
    },
    {
        id: '88beb2f3-e4c2-49f3-a0a0-ecf957a95af3',
        name: 'Ross Vazquez',
        email: 'rossvazquez@xinware.com',
        eyeColor: 'green',
        friends: ['Marilyn Mcintosh', 'Padilla Garrison', 'Naomi Buckner'],
        isActive: false,
        balance: 3793,
        skills: ['nulla', 'anim', 'proident', 'ipsum', 'elit'],
        gender: 'male',
        age: 24,
    },
    {
        id: '249b6175-5c30-44c6-b154-f120923736f5',
        name: 'Elma Head',
        email: 'elmahead@omatom.com',
        eyeColor: 'green',
        friends: ['Goldie Gentry', 'Aisha Tran'],
        isActive: true,
        balance: 2278,
        skills: ['adipisicing', 'irure', 'velit'],
        gender: 'female',
        age: 21,
    },
    {
        id: '334f8cb3-eb04-45e6-abf4-4935dd439b70',
        name: 'Carey Barr',
        email: 'careybarr@nurali.com',
        eyeColor: 'blue',
        friends: ['Jordan Sampson', 'Eddie Strong'],
        isActive: true,
        balance: 3951,
        skills: ['ex', 'culpa', 'nostrud'],
        gender: 'male',
        age: 27,
    },
    {
        guid: '150b00fb-dd82-427d-9faf-2879ea87c695',
        name: 'Blackburn Dotson',
        email: 'blackburndotson@furnigeer.com',
        eyeColor: 'brown',
        friends: ['Jacklyn Lucas', 'Linda Chapman'],
        isActive: false,
        balance: 1498,
        skills: ['non', 'amet', 'ipsum'],
        gender: 'male',
        age: 38,
    },
    {
        id: 'e1bf46ab-7168-491e-925e-f01e21394812',
        name: 'Sheree Anthony',
        email: 'shereeanthony@kog.com',
        eyeColor: 'brown',
        friends: ['Goldie Gentry', 'Briana Decker'],
        isActive: true,
        balance: 2764,
        skills: ['lorem', 'veniam', 'culpa'],
        gender: 'female',
        age: 39,
    },
];

//   Получить массив имен всех пользователей (поле name).

// Альтернативная запись функции
// const getAllNames = users.map(user => user.name);
// console.log(getAllNames);

const getAllNames = users => {
    return users
        .map(user => user.name);
};
console.log(getAllNames(users));

// Получить массив объектов пользователей по цвету глаз (поле eyeColor).

// Альтернативная запись функции
// const getUsersByEyeColor = users.filter(user => user.eyeColor === 'blue');
// console.log(getUsersByEyeColor);

const getUsersByEyeColor = (users, color) => {
    return users
        .filter(user => user.eyeColor === color);
};

console.log(getUsersByEyeColor(users, 'blue'));

// Получить массив имен пользователей по полу (поле gender).

// Альтернативная запись функции
// const getUsersByGender = users.filter(user => user.gender === 'male').map(user => user.name);
// console.log(getUsersByGender);

const getUsersByGender = (users, gender) => {
    return users
        .filter(user => user.gender === gender)
        .map(user => user.name);
};
console.log(getUsersByGender(users, 'male'));

// Получить массив только неактивных пользователей (поле isActive).

// Альтернативная запись функции
// const getInactiveUsers = users.filter(user => user.isActive !== true);
// console.log(getInactiveUsers);

const getInactiveUsers = users => {
    return users
        .filter(user => user.isActive !== true);
};

console.log(getInactiveUsers(users));

// Получить пользоваля (не массив) по email (поле email, он уникальный).

const getUserByEmail = (users, email) => {
    return users
        .find(user => user.email === email);
};

console.log(getUserByEmail(users, 'shereeanthony@kog.com'));
console.log(getUserByEmail(users, 'elmahead@omatom.com'));

// Получить массив пользователей попадающих в возрастную категорию от min до max лет (поле age).

const getUsersWithAge = (users, min, max) => {
    return users
        .filter(user => user.age >= min && user.age <= max);
};

console.log(getUsersWithAge(users, 20, 30));
console.log(getUsersWithAge(users, 30, 40));


// Получить общую сумму баланса (поле balance) всех пользователей.

const getTotalBalance = users => {
    return users
        .reduce((totalBalance, user) => totalBalance + user.balance, 0);
};

console.log(getTotalBalance(users));

// Массив имен всех пользователей у которых есть друг с указанным именем.

const getUsersByFriend = (users, name) => {
    return getAllNames(users
        .filter(user => user.friends.some(friendName => {
            return friendName === name;
        }))
    );
};

console.log(getUsersByFriend(users, 'Briana Decker'));
console.log(getUsersByFriend(users, 'Goldie Gentry'));