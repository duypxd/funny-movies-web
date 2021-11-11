import { TInitialValue } from "../components/LoginForm";
import http from "./http";

export async function signIn(data: TInitialValue) {
  return http.post('api/auth/signIn', data);
}

export async function signUp(data: TInitialValue) {
  return http.post('api/auth/signUp', data);
}

export async function getMe() {
  return http.get('api/auth/getMe');
}
