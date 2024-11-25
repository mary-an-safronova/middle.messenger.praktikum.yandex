type TSignUpFormState = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  confirmation_password: string;
}

export type TSignUpFormProps = {
  formState: TSignUpFormState;
};
