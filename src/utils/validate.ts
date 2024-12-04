/* eslint-disable object-shorthand */
import { fieldsRegex } from './constants';

export type TValidateField = {
  error: boolean;
  errorText: string;
  value: string;
}

// Функция валидации для логина
export const validateLogin = (value: string): TValidateField => {
  if (!fieldsRegex.login.alfabet.test(value)) {
    return {
      error: true,
      errorText: 'Допускается латиница, цифры, дефис, и нижнее подчёркивание.',
      value: value,
    };
  } if (!fieldsRegex.login.minMax.test(value)) {
    return {
      error: true,
      errorText: 'Должен содержать от 3 до 20 символов.',
      value: value,
    };
  } if (!fieldsRegex.login.onlyNumbers.test(value)) {
    return {
      error: true,
      errorText: 'Не может целиком состоять из цифр.',
      value: value,
    };
  }
  return {
    error: false,
    errorText: '',
    value: value,
  };
};

// Функция валидации для пароля
export const validatePassword = (value: string): TValidateField => {
  if (!fieldsRegex.password.upLetterAndNumber.test(value)) {
    return {
      error: true,
      errorText: 'Должна быть хотя бы одна заглавная буква и цифра.',
      value: value,
    };
  } if (value.length < 8 || value.length > 40) {
    return {
      error: true,
      errorText: 'Должен содержать от 8 до 40 символов.',
      value: value,
    };
  }
  return {
    error: false,
    errorText: '',
    value: value,
  };
};

// Функция валидации для почты
export const validateMail = (value: string): TValidateField => {
  if (!fieldsRegex.email.mailChars.test(value)) {
    return {
      error: true,
      errorText: 'Допускается латиница, цифры, дефис, подчёркивание. Должна быть @ и точка после, но перед точкой должны быть буквы.',
      value: value,
    };
  }
  return {
    error: false,
    errorText: '',
    value: value,
  };
};

// Функция валидации для имени или фамилии
export const validateName = (value: string): TValidateField => {
  if (!fieldsRegex.name.alfabet.test(value)) {
    return {
      error: true,
      errorText: 'Допускается только латиница или кириллица.',
      value: value,
    };
  } if (!fieldsRegex.name.firstLetter.test(value)) {
    return {
      error: true,
      errorText: 'Первая буква должна быть заглавной.',
      value: value,
    };
  } if (!fieldsRegex.name.noSpecialChar.test(value)) {
    return {
      error: true,
      errorText: 'Не допускаются спецсимволы (допустим только дефис).',
      value: value,
    };
  }
  return {
    error: false,
    errorText: '',
    value: value,
  };
};

// Функция валидации для имени в чате
export const validateDisplayName = (value: string): TValidateField => {
  if (!fieldsRegex.display_name.alfabet.test(value)) {
    return {
      error: true,
      errorText: 'Допускается только латиница или кириллица (допустим дефис и пробел).',
      value: value,
    };
  } if (!fieldsRegex.display_name.firstLetter.test(value)) {
    return {
      error: true,
      errorText: 'Первая буква должна быть заглавной.',
      value: value,
    };
  }
  return {
    error: false,
    errorText: '',
    value: value,
  };
};

// Функция валидации для телефона
export const validatePhone = (value: string): TValidateField => {
  if (!fieldsRegex.phone.onlyNumbers.test(value)) {
    return {
      error: true,
      errorText: 'Должен состоять из цифр, может начинаться с плюса.',
      value: value,
    };
  } if (!fieldsRegex.phone.minMax.test(value)) {
    return {
      error: true,
      errorText: 'Должен содержать от 10 до 15 символов.',
      value: value,
    };
  }
  return {
    error: false,
    errorText: '',
    value: value,
  };
};

// Функция валидации для повтора пароля
export const validateConfirmationPassword = (value: string, prevValue: string | undefined): TValidateField => {
  if (value !== prevValue) {
    return {
      error: true,
      errorText: 'Пароли не совпадают.',
      value: value,
    };
  }
  return {
    error: false,
    errorText: '',
    value: value,
  };
};

// Функция валидации для телефона
export const validateMessage = (value: string): TValidateField => {
  if (!value) {
    return {
      error: true,
      errorText: 'Введите сообщение.',
      value: value,
    };
  }
  return {
    error: false,
    errorText: '',
    value: value,
  };
};

export const validate = (fieldName: string, value: string, prevValue?: string): TValidateField => {
  if (fieldName === 'login') {
    return validateLogin(value);
  } if (fieldName === 'password' || fieldName === 'oldPassword' || fieldName === 'newPassword') {
    return validatePassword(value);
  } if (fieldName === 'email') {
    return validateMail(value);
  } if (fieldName === 'first_name' || fieldName === 'second_name') {
    return validateName(value);
  } if (fieldName === 'display_name') {
    return validateDisplayName(value);
  } if (fieldName === 'phone') {
    return validatePhone(value);
  } if (fieldName === 'confirmation_password') {
    return validateConfirmationPassword(value, prevValue);
  } if (fieldName === 'message') {
    return validateMessage(value);
  }
  return { error: false, errorText: '', value: value };
};
