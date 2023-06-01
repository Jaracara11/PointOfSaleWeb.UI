import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userValidationSchema } from '../../../services/yupValidation.service';
import { useEffect, useState } from 'react';

export const UpsertUserModal = ({ toggle, userID }: { toggle: () => void; userID: number }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue
  } = useForm({
    resolver: yupResolver(userValidationSchema)
  });

  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    setShowModal(false);
    toggle();
  };

  useEffect(() => {
    if (userID) {
      setValue('productID', product.productID);
      setValue('productName', product.productName);
      setValue('productDescription', product.productDescription);
      setValue('productStock', product.productStock);
      setValue('productCost', product.productCost);
      setValue('productPrice', product.productPrice);
      setValue('productCategoryID', product.productCategoryID);
    }
  }, [product]);

  return <></>;
};
