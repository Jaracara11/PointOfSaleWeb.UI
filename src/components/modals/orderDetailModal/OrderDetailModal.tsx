import { Modal, Table, Button } from 'react-bootstrap';
import { OrderDetailModalProps } from '../../../interfaces/modals/OrderDetailModalProps';
import { useEffect, useState } from 'react';
import { useGetOrderByID } from '../../../hooks/orders.hooks';
import { OrderInfo } from '../../../interfaces/order/OrderInfo';

export const OrderDetailModal = ({ toggle, orderID }: OrderDetailModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  const order = useGetOrderByID(orderID);

  useEffect(() => {
    if (order.data) {
      setOrderInfo(order.data);
    }
  }, [order.data]);

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  console.log(orderInfo);

  return (
    orderInfo && (
      <Modal className="form-modal" show={showModal} onHide={closeModal} centered>
        <div className="card">
          <div className="card-body">
            <h4>Invoice # {orderInfo.orderID}</h4>
            <hr />
            <div>
              <h5>Order Summary</h5>
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderInfo.products.map((orderItem: OrderProduct, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{orderItem.productName}</td>
                      <td>${orderItem.productPrice}</td>
                      <td>{orderItem.productQuantity} unit(s)</td>
                      {/* <td>${calculateOrderTotal(index)}</td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="order-summary">
                <div>
                  <div>
                    <span className="title">Billed by: </span>
                    <span>{/* Define getUserAuth()?.name here */}</span>
                  </div>
                  <div>
                    <span className="title">Purchase Date: </span>
                    <span>{orderInfo.orderDate.toString()}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <span className="title">Sub-Total: </span>
                      <span>${orderInfo.orderSubTotal.toFixed(2)}</span>
                    </div>
                    {orderInfo.discount && (
                      <div>
                        <span className="title">Discount: </span>
                        <span>-${(orderInfo.discount * orderInfo.orderSubTotal).toFixed(2)}</span>
                      </div>
                    )}
                    <div>
                      <span className="title">Total: </span>
                      <span>${orderInfo.orderTotal.toFixed(2)}</span>
                    </div>

                    <Button variant="dark" onClick={() => window.print()}>
                      Print
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};
