import Swal, { SweetAlertIcon } from 'sweetalert2';

const SwalObj = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-warning m-3',
    cancelButton: 'btn btn-outline-dark'
  },
  buttonsStyling: false
});

export const swalMessageAlert = (msg: string, alertType: SweetAlertIcon) => {
  return SwalObj.fire({
    title: msg,
    icon: alertType,
    showConfirmButton: false
  });
};

export const swalMessageAlertWithTitle = (
  title: string,
  message: string,
  alertType: SweetAlertIcon
) => {
  return SwalObj.fire({
    title: title,
    html: message,
    icon: alertType,
    showConfirmButton: false
  });
};

export const swalConfirmAlert = (
  title: string,
  buttonText: string,
  alertType: SweetAlertIcon
): Promise<boolean> =>
  SwalObj.fire({
    icon: alertType,
    title: title,
    showCancelButton: true,
    confirmButtonText: `<strong>${buttonText}</strong>`,
    denyButtonText: 'Cancel'
  }).then((result) => {
    return result.isConfirmed;
  });
