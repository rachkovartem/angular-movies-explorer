type ErrorProps = {
  maxlength?: number;
  minlength?: number;
  patternDescription?: string;
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
