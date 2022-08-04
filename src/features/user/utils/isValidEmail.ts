export const isValidEmail = (pass: string): boolean => {
  const emailPattern =/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
  const result = pass.match(emailPattern);
  if (result) {
    return true;
  }
  return false;
};
