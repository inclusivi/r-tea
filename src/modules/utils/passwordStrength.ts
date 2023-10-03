// has number
const hasNumber = (str: string) => new RegExp(/[0-9]/).test(str);

// has mix of small and capitals
const hasMixed = (str: string) => new RegExp(/[a-z]/).test(str) && new RegExp(/[A-Z]/).test(str);

// has special chars
const hasSpecial = (str: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(str);

// set color based on password strength
export const strengthColor = (count: number) => {
  if (count < 2) return { label: 'Ruim', color: 'error.main' };
  if (count < 3) return { label: 'Fraca', color: 'warning.main' };
  if (count < 4) return { label: 'Normal', color: 'warning.dark' };
  if (count < 5) return { label: 'Boa', color: 'success.main' };
  if (count < 6) return { label: 'Forte', color: 'success.dark' };
  return { label: 'Poor', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator = (str: string) => {
  let strengths = 0;
  if (str.length > 5) strengths += 1;
  if (str.length > 7) strengths += 1;
  if (hasNumber(str)) strengths += 1;
  if (hasSpecial(str)) strengths += 1;
  if (hasMixed(str)) strengths += 1;
  return strengths;
};