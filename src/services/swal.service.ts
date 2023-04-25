import Swal from 'sweetalert2';

const SwalObj = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-outline-info m-3',
    cancelButton: 'btn btn-outline-dark'
  },
  buttonsStyling: false
});

export const swalErrorAlert = (
  statusCode: number,
  error: Error,
  title?: string
) => {
  return SwalObj.fire({
    title: `Error ${statusCode}: ${title}`,
    html: `<strong>${error}</strong>`,
    icon: 'error',
    showConfirmButton: false
  });
};
