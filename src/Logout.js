import { Component } from 'react';

class Logout extends Component {

    render () {
        return (null);
    }

    componentDidMount() {
        this.props.logOutHandler();
    }

}

export default Logout;