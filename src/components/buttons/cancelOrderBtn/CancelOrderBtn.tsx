import { Button } from 'react-bootstrap';
import { swalConfirmAlert } from '../../../services/swal.service';
import { useCancelOrder } from '../../../hooks/orders.hooks';

export const CancelOrderBtn = ({ orderID }: { orderID: string }) => {
  const cancelOrderMutation = useCancelOrder();

  const handleOrderCancellationRequest = async () => {
    const confirmTitle = 'Are you sure you want to cancel this order?';

    const isConfirmed = await swalConfirmAlert(confirmTitle, 'Confirm', 'warning');

    isConfirmed && cancelOrderMutation.mutateAsync(orderID);
  };

  return (
    <Button variant="danger" onClick={() => handleOrderCancellationRequest()}>
      Cancel Order
    </Button>
  );
};
