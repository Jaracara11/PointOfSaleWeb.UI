import { useForm } from 'react-hook-form';
import { UserModalProps } from '../../../interfaces/modals/UserModalProps';
import { yupResolver } from '@hookform/resolvers/yup';
import { userValidationSchema } from '../../../services/yupValidation.service';

export const UpsertUserModal = ({ toggle, username }: UserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(userValidationSchema)
  });

  return <></>;
};
