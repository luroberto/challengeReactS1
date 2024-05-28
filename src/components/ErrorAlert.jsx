/* eslint-disable react/prop-types */

// material
import { Alert, Box } from "@mui/material"

const ErrorAlert = (props) => {
    const { message } = props
    return (
        <Box display='flex' justifyContent='center'>
        <Alert severity="error">Ocurrió un error de tipo: {message}</Alert>
        </Box>
    )
}

export default ErrorAlert