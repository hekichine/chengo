export interface ValidateErrors {
  email? :string[],
  password? :string[],
  confirmPassword? :string[],
  [key:string]:string[] | undefined
}
export const validateSignUp = (formData: FormData) => {
  const errors: ValidateErrors = {};
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm_password') as string;

  if (!email) {
    errors.email = ['Email is required'];
  }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ['Email invalid'];
  }
  if (!password) {
    errors.password = ['Password is required'];
  }else if (password.length < 6) {
    errors.password = ['Password min 6 characters'];
  }
  if (!confirmPassword) {
    errors.confirmPassword = ['Confirm Password is required'];
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = ['Password do not match!'];
  }
  return errors; 
}