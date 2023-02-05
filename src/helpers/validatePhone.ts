export const validatePhone = (phone: string) => {
  const phoneRegex = /^\+\d{10,15}$/;
  return phoneRegex.test(phone);
}
