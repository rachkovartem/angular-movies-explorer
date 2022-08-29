import { FormControl, FormGroup } from '@angular/forms';

type ErrorProps = {
  maxlength?: number;
  minlength?: number;
  patternDescription?: string;
};

type GetErrosProps = {
  form: any;
  inputName: 'email' | 'password' | 'name';
  localeName: string;
  patternDescription?: string;
  maxlength?: number;
  minlength?: number;
};

export type ErrorTitles = 'required' | 'maxlength' | 'minlength' | 'pattern';

export const validateErrors = (inputName: string) => ({
  required() {
    return `Поле ${inputName} обязательное.`;
  },
  maxlength({ maxlength }: ErrorProps) {
    return `Максимальная длина поля ${inputName} ${maxlength}.`;
  },
  minlength({ minlength }: ErrorProps) {
    return `Минимальная длина поля ${inputName} ${minlength}.`;
  },
  pattern({ patternDescription }: ErrorProps) {
    return `Поле ${inputName} должно содержать ${patternDescription}`;
  },
});

export const getError = ({
  form,
  inputName,
  localeName,
  patternDescription,
  maxlength,
}: GetErrosProps) => {
  const errors = form.controls[inputName].errors || {};
  const touched = form.controls[inputName].touched;
  const firstError = Object.keys(errors)[0] as ErrorTitles;
  return (
    touched &&
    validateErrors(localeName)?.[firstError]?.({
      maxlength,
      patternDescription,
    })
  );
};
