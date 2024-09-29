export type RegisterFormValues = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
};

export type userCreatedResponse = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
};

export type LoginFormValues = {
  username: string;
  password: string;
};

export type userLoginResponse = {
  refresh: string;
  access: string;
};

export type UserGetMeResponse = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  company: string | null;
};
