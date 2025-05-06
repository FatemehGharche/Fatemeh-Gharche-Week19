import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import Modal from './Modal';
import styles from './ContactForm.module.css';
import InputField from './InputField'; 


const schema = yup.object({
  name: yup.string().required('Name is required.'),
  lastname: yup.string().required('Last name is required.'),
  email: yup.string().email('Invalid email.').required('Email is required.'),
  job: yup.string(),
  phone: yup.string().required('Phone number is required.'),
});

const ContactForm = ({
  initialValues = { name: '', lastname: '', email: '', job: '', phone: '' },
  labels = {
    name: 'First Name',
    lastname: 'Last Name',
    email: 'Email',
    job: 'Job Title',
    phone: 'Phone Number',
    submit: 'Submit',
    success: 'Contact submitted successfully!',
    confirmAdd: 'Are you sure you want to add this contact?',
    confirmEdit: 'Are you sure you want to save the changes?',
  },
  onSubmitData,
  onSuccess,
  onClose,
  editing = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,  
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const values = watch();

  useEffect(() => {
    reset(initialValues);  
  }, [initialValues, reset]);

  const handleFormSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    const finalData = {
      ...values,
      id: editing && values.id ? values.id : uuidv4(),
    };

    if (onSubmitData) onSubmitData(finalData);

    reset(initialValues);
    setShowConfirmModal(false);
    setShowSuccessMessage(true);
    if (onSuccess) onSuccess();
    if (onClose) onClose();

    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <InputField label="First Name" name="name" register={register} error={errors.name} />
      <InputField label="Last Name" name="lastname" register={register} error={errors.lastname} />
      <InputField label="Email" name="email" type="email" register={register} error={errors.email} />
      <InputField label="Job Title" name="job" register={register} error={errors.job} />
      <InputField label="Phone Number" name="phone" type="tel" register={register} error={errors.phone} />

      <button
        type="submit"
        className={styles.action}
        disabled={!isDirty}
        style={{ opacity: isDirty ? 1 : 0.5, cursor: isDirty ? 'pointer' : 'not-allowed' }}
      >
        {labels.submit}
      </button>

      {showConfirmModal && (
        <Modal
          title="Confirmation"
          message={editing ? labels.confirmEdit : labels.confirmAdd}
          onConfirm={confirmSubmit}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      {showSuccessMessage && (
        <div className={styles.success}>{labels.success}</div>
      )}
    </form>
  );
};


export default ContactForm;
