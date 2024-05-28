/* eslint-disable react/prop-types */

// material
import { Alert } from "@mui/material"

const ErrorAlert = (props) => {
    const { message } = props
    return (
        <>
        <Alert severity="error">Ocurrió un error de tipo: {message}</Alert>
        </>
    )
}

export default ErrorAlert