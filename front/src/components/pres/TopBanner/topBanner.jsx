import React from 'react'
import { Grid, Button } from '@material-ui/core'
import Navbar from '../Navbar'

import style from './style.module.scss'

const TopBanner = () => {
    const user = sessionStorage.getItem('moda_username')

    const handleBtnLogoutClick = () => {
        sessionStorage.clear()
        window.location.reload()
    }

    return <>
        <div style={{ flexGrow: 1 }}>
            <Grid
                className={style.topBannerWrapper}
                container
                direction='row'
                justify='space-between'
                alignItems='center'
            >
                <Grid item xs>
                </Grid>
                <Grid item xs >
                    <p className={style.topBannerTitle}>ANALYTICS PORTAL</p>
                </Grid>
                <Grid item xs>
                    <Grid container justify='flex-end' alignItems='right' style={profile}>
                        <Grid item>
                            <Navbar />
                        </Grid>
                        <Grid item style={{ paddingTop: '12px', color: '#fff' }}>
                            -
                        </Grid>
                        <Grid item>
                            {
                                user &&
                                <p style={btnLogout} onClick={handleBtnLogoutClick}>LOGOUT</p>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </>
}

const btnLogout = { //not working on style.module.scss
    color: '#fff',
    textDecoration: 'underline',
    backgroundColor: 'transparent',
    paddingRight: '30px',
    paddingLeft: '8px',
    fontSize: '13px'
}

const profile = { //not working on style.module.scss
    marginTop: '-8px'
}


export default TopBanner