import React from 'react'
import { Button } from '@material-ui/core'

const DownloadCSVButton = () => {
    return (
        <Button variant="contained" style={style}>
            DOWNLOAD
        </Button>
    )
}

export default DownloadCSVButton

const style = {
    fontSize: '15px',
    fontFamily: 'Montserrat, sans- serif',
    fontWeight: '900',
    letterSpacing: '1px',
    marginBottom: '20px',
    padding: '7px 25px 5px 25px',
    borderRadius: '0px',
    backgroundColor: '#4fbcc3',
    color: 'white'
}