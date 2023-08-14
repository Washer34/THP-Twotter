import { atom } from 'jotai';

const initialLoginState = {
  isLoggedIn: false,
  userId: null,
  username: '',
  token: null,
};

export const loginAtom = atom(initialLoginState);