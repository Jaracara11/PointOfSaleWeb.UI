import { ErrorInfo } from '../interfaces/ErrorInfo';
import { swalErrorAlert } from './swal.service';

export const handleErrorResponse = (error: any, errorKey: string) => {
  if (error.code === 'ERR_NETWORK') {
    swalErrorAlert(error.code, error.message + ' please try again later.');
  } else {
    const errorResponse: ErrorInfo = {
      statusCode: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data[errorKey][0]
    };

    swalErrorAlert(
      `${errorResponse.statusCode}: ${errorResponse.statusText}`,
      errorResponse.message
    );
  }
};
