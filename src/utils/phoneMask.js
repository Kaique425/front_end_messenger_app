export const insertMaskInPhone = (phone) => {
  const noMask = phone.replace(/\D/g, '');
  const { length } = noMask;
  let maskedPhone = phone;
  if (length <= 11) {
    maskedPhone = noMask
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2');
  }

  return { unmaskedPhone: noMask, maskedPhone: maskedPhone };
};

export const inputHandlePhoneChange = (e, phoneStateSetter) => {
  const inputPhone = e.target.value;
  const resultedPhones = insertMaskInPhone(inputPhone);

  if (phoneStateSetter) {
    phoneStateSetter(resultedPhones.unmaskedPhone);
  }
  e.target.value = resultedPhones.maskedPhone;
};
