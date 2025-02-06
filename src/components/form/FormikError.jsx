import React from 'react';

const FormikError = ({children}) => {
    return (
        <small className='d-block text-danger mb-4 error_message mt-1'>{children}</small>
    );
}

export default FormikError;
