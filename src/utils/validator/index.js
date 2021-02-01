export function nullValidate(account) {
  return account === undefined || account === null || account.length === 0;
}
export function passwordValidate(password) {
  return /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/.test(password);
}
