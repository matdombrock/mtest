import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Grid } from '@material-ui/core';
import s from './style.module.scss';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function LeftNavigationMenu(props) {
  const [isFirstTabClicked, setIsFirstTabClicked] = useState(true)
  const [isSecondTabClicked, setIsSecondTabClicked] = useState(false)
  const classes = useStyles();
  const { active } = props
  const handleChange = (event, newValue) => {
    props.changeTab(newValue);
  };

  const handleFirstTabClick = () => {
    setIsFirstTabClicked(true)
    setIsSecondTabClicked(false)
  }

  const handleSecondTabClick = () => {
    setIsSecondTabClicked(true)
    setIsFirstTabClicked(false)
  }

  const styleFirstTab = () => {
    return {
      color: isFirstTabClicked ? 'var(--orange)' : '#000',
      textShadow: 'none',
      fontSize: '15px',
      textDecoration: isSecondTabClicked && 'underline'
    }
  }

  const styleSecondTab = () => {
    return {
      color: isSecondTabClicked ? 'var(--orange)' : '#000',
      textShadow: 'none',
      fontSize: '15px',
      textDecoration: isFirstTabClicked && 'underline'
    }
  }

  return (
    <div className={s.container}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Tabs
          // orientation="vertical"
          value={active}
          onChange={handleChange}
        >
          <Tab className={s.tab} label="Brand Dashboard" {...a11yProps(0)} onClick={handleFirstTabClick} style={styleFirstTab()} />
          <span className={s.dashboardSeparator}>|</span>
          <Tab className={s.tab} label="SKU Dashboard" {...a11yProps(1)} onClick={handleSecondTabClick} style={styleSecondTab()} />
        </Tabs>
      </Grid>
    </div>
  );
}