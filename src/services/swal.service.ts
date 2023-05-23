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

export const swalConfirmAlert = async (
  title: string,
  buttonText: string,
  alertType: SweetAlertIcon
): Promise<boolean> => {
  return new Promise<boolean>(async (resolve) => {
    const result = await SwalObj.fire({
      icon: alertType,
      title: title,
      showCancelButton: true,
      confirmButtonText: `<strong>${buttonText}</strong>`,
      denyButtonText: 'Cancel'
    });
    resolve(result.isConfirmed);
  });
};
