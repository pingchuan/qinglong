import { FormName } from './constant';

export interface RegisteredSubmitValues {
  [FormName.username]: string;
  [FormName.password]: string;
  [FormName.passwordRepeat]: string;
  [FormName.mail]: string;
  [FormName.mailCheckCode]: string;
}

export interface LoginSubmitValues {
  [FormName.mail]: string;
  [FormName.password]: string;
  [FormName.checkCode]?: string;
}

export interface MailCheckCodeSubmitValues {
  [FormName.mail]: string;
}
