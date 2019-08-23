import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {

    render () {
        return (null);
    }

    componentDidMount() {
        this.props.logOutHandler();
        this.props.history.goBack();
    }

}

export default withRouter(Logout);