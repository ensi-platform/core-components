To simplify working with forms, we use the library [react-hook-form](https://react-hook-form.com/) (hereinafter RHF)    
To validate fields we use [Yup](https://github.com/jquense/yup)

**Form** - is a wrapper for [RHF's](https://react-hook-form.com/) form initialization logic.  
It contains <a href="https://react-hook-form.com/docs/formprovider" target="_blank">`FormProvider`</a>, to which we pass all props, received from called right here RHF's <a href="https://react-hook-form.com/docs/useform" target="_blank">`useForm`</a> hook.   

## Hooks
There are two hooks to get form provider context:  
- `useForm` is our self-written hook, from which you can get: `disabled`, `onChange`, `onSubmit` props, that you pass into the `Form`.  
- `useFormContext` is RHF hook to get <a href="https://react-hook-form.com/docs/formprovider" target="_blank">`FormProvider`</a> context.  
  

**❗Important**: don't import `useFormContext` hook from the 'react-hook-form' directly, as in this case it will not be able to access the context that was created inside the library. Always import it from '@ensi-platform/core-components'.

As for the rest of the RHF's hooks (e.g. useWatch, useController, useFieldArray, useFormState): they also need access to the context, which they also cannot get if you import them from the 'react-hook-form'. Therefore, in the same way, either import them from '@ensi-platform/core-components', or pass to them the prop `control`, provided by `useFormContext`.

## Components
There are several special components for use inside the form:

**FieldWrapper** − is a wrapper for any field, controlled with RHF. It pass necessary field props from <a href="https://react-hook-form.com/docs/usecontroller" target="_blank">`useController`</a> hook, important prop to change field value - `setFieldValue`, and some common props from the form context like `onChange` and `disabled`.

**Field** − is just `FieldWrapper` around `Input`, so it is commonly used 'field'.

**TypedField** − is just `Field` with onBlur-transformations according to special `fieldType` prop.

**Reset** − is button with RHF's reset logic on click.

## Common questions

There's nothing here yet.


