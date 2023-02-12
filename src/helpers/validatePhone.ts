export const validatePhone = (phone: string) => {
  const phoneRegex = /^\+\d{10,15}$/;
  if (phoneRegex.test(phone) || !phone.length) return true;
  return false;
}
