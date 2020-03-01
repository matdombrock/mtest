import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
  const classes = useStyles();
  const {active} = props
  const handleChange = (event, newValue) => {
    props.changeTab(newValue);
  };

  return (
    <div className={s.container}>
      <Tabs
        orientation="vertical"
        value={active}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab className={s.tab} label="Brand Dashboard" {...a11yProps(0)} />
        <Tab className={s.tab} label="SKU Dashboard" {...a11yProps(1)} />
      </Tabs>
    </div>
  );
}