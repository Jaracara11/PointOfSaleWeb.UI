import Swal from 'sweetalert2';
import { ErrorInfo } from '../interfaces/ErrorInfo';

const SwalObj = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-outline-info m-3',
    cancelButton: 'btn btn-outline-dark'
  },
  buttonsStyling: false
});

export const swalErrorAlert = (error: ErrorInfo, errorKey: string) => {
  return SwalObj.fire({
    title: `Error ${error.status}: ${error.statusText}`,
    html: `<strong>${error.data[errorKey][0]}</strong>`,
    icon: 'error',
    showConfirmButton: false
  });
};
