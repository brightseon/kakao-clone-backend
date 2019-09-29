// Auth
const AUTH = '/auth';
const JOIN = '/join';
const DUPLICATE_CHECK = '/duplicateCheck';
const LOGIN = '/login';
const LOGOUT = '/logout';

// User
const USER = '/user';
const EDIT_USER = `/edit/:id`;

export const authRoute = {
    auth : AUTH,
    join : JOIN,
    duplicateCheck : DUPLICATE_CHECK,
    login : LOGIN,
    logout : LOGOUT
};

export const userRoute = {
    user : USER,
    editUser : EDIT_USER
};