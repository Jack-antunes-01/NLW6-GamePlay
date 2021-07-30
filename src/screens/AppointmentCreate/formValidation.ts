import * as yup from "yup";

export const validateForm = () =>
  yup.object().shape({
    day: yup.number().min(1).max(31).defined("Dia inválido"),
    month: yup.number().min(1).max(12).defined("Dia inválido"),
    hour: yup.number().min(0).max(23).defined("Dia inválido"),
    minute: yup.number().min(0).max(60).defined("Dia inválido"),
    // details: yup.string().required('Dia inválido'),
  });
