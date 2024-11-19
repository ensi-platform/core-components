To simplify working with forms, we use the library [react-hook-form](https://react-hook-form.com/) (hereinafter RHF)    
To validate fields we use [Yup](https://github.com/jquense/yup)

### Form component
**Form** - is a wrapper for [RHF's](https://react-hook-form.com/) form initialization logic.  
It contains <a href="https://react-hook-form.com/docs/formprovider" target="_blank">`FormProvider`</a>, to which we pass all props, received from called right here <a href="https://react-hook-form.com/docs/useform" target="_blank">`useForm`</a> hook.   

There are several special components for use inside the form:

**FieldWrapper** − is a wrapper for any field, controlled with RHF. It pass necessary field props from <a href="https://react-hook-form.com/docs/usecontroller" target="_blank">`useController`</a> hook, important prop to change field value - `setFieldValue`, and some common props from the form context like `onChange` and `disabled`.

**Field** − is just `FieldWrapper` around `Input`, so it is commonly used 'field'.

**TypedField** − is just `Field` with onBlur-transformations according to special `fieldType` prop.

**FieldArray** − is a wrapper for an array of similar fields, controlled with RHF. It implements special logic for an array from <a href="https://react-hook-form.com/docs/usefieldarray" target="_blank">`useFieldArray`</a> hook.

**Reset** − is button with RHF's reset logic on click.

### Common questions


