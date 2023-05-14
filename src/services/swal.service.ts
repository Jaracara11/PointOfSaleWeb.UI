import Swal from 'sweetalert2';

const SwalObj = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info m-3',
    cancelButton: 'btn btn-outline-dark'
  },
  buttonsStyling: false
});

export const swalErrorAlert = (title: string, message: string) => {
  return SwalObj.fire({
    title: `Error: ${title}`,
    html: message,
    icon: 'error',
    showConfirmButton: false
  });
};

export const swalWarningAlert = (title: string, message: string) => {
  return SwalObj.fire({
    title: `Error: ${title}`,
    html: message,
    icon: 'warning',
    showConfirmButton: false
  });
};

export const swalSuccessAlert = (successMsg: string) => {
  return SwalObj.fire({
    title: successMsg,
    icon: 'success',
    showConfirmButton: false
  });
};

export const swalSaveConfirm = (title: string): Promise<boolean> =>
  SwalObj.fire({
    icon: 'info',
    title: title,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: 'Cancel'
  }).then((result) => {
    return result.isConfirmed;
  });
