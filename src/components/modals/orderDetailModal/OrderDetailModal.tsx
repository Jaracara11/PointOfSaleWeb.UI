import { Modal, Table } from 'react-bootstrap';
import { OrderDetailModalProps } from '../../../interfaces/modals/OrderDetailModalProps';
import { useEffect, useState } from 'react';
import { useGetOrderByID } from '../../../hooks/orders.hooks';

export const OrderDetailModal = ({ toggle, orderID }: OrderDetailModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(true);

  const order = useGetOrderByID(orderID);
  console.log(order.data);

  useEffect(() => {}, []);

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  return (
    order.data && (
      <Modal className="form-modal" show={showModal} onHide={closeModal} centered>
        <div className="card">
          <div className="card-body">
            <h4>Invoice # {order.data.orderID}</h4>
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
                  {order.products.map((orderItem: Product, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{orderItem.productName}</td>
                      <td>${orderItem.productPrice}</td>
                      <td>{orderItem.productQuantity} unit(s)</td>
                      <td>${calculateOrderTotal(index)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="order-summary">
                <div>
                  <div>
                    <span className="title">Billed by: </span>
                    <span>{getUserAuth()?.name}</span>
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
