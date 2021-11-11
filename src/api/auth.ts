import { TInitialValue } from "../components/LoginForm";
import http from "./http";

export async function signIn(data: TInitialValue) {
  try {
    return await http.post('api/auth/signIn', data);
  } catch (err: any) {
    throw err?.response?.data;
  }
}

export async function signUp(data: TInitialValue) {
  try {
    return await http.post('api/auth/signUp', data);
  } catch (err: any) {
    throw err?.response?.data;
  }
}

export async function getMe() {
  try {
    return await http.get('api/auth/getMe');
  } catch (err: any) {
    throw err?.response?.data;
  }
}
