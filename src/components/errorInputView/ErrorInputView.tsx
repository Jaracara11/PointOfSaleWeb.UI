import { FieldErrorsImpl } from 'react-hook-form';

export const ErrorInputView = ({ error }: FieldErrorsImpl) => {
  return (
    <>
      {error && (
        <p className="alert alert-danger mt-1" role="alert">
          {error?.message?.toString()}
        </p>
      )}
    </>
  );
};
