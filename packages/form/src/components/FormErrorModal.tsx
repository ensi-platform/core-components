import { useFormContext } from 'react-hook-form';

const FormError = () => {
    const {
        formState: { errors },
    } = useFormContext();

    // useError({
    //     message: Object.keys(errors).length > 0 ? 'Форма заполнена некорректно' : '',
    //     code: '',
    //     status: 400,
    //     name: 'Ошибка формы',
    // });

    return null;
};
export default FormError;
