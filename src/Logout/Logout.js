import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {

    render () {
        return (null);
    }

    componentDidMount() {
        this.props.logOutHandler();
        this.props.history.replace("/welcome");
    }

}

export default withRouter(Logout);