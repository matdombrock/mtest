import React,{Component} from 'react';
import { actions as salesActions } from '../../../modules/sales';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpperControls from '../../pres/UpperControls';
import DataDisplayCardGrid from '../../pres/DataDisplayCardGrid';
import DataDisplayItemizedTable from '../../pres/DataDisplayItemizedTable';
import LeftNavigationMenu from '../../pres/LeftNavigationMenu';
import Grid from '@material-ui/core/Grid';
import Charts from '../../pres/Charts';
import DropboxUpload from '../../../dropbox/index'
import s from './style.module.scss';
class Dashboard extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
                <div className={s.container}>
                    <UpperControls />
                    <div>{console.log('props',this.props)}</div>
                    <Grid container className={s.gridContainer} >
                        <Grid item className={s.item} xs={1}>
                            <LeftNavigationMenu />
                        </Grid>
                        <Grid item xs={11} id='#report' className={s.inner}>
                            <DataDisplayCardGrid data={this.props.sales} />
                            <Charts data={this.props.sales} />
                            <DataDisplayItemizedTable data={this.props.sales} />
                            <DropboxUpload/>
                        </Grid>
                    </Grid>
                </div>
            );
    }
}

const mapStateToProps = (state) => ({
    sales: state.sales
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    ...salesActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
