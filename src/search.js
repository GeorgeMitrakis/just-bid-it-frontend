import React from 'react';
import { withRouter } from 'react-router-dom';
//import ReactSearchBox from 'react-search-box'
import SearchField from "react-search-field";




class search extends React.Component {
    constructor(props) {
        super(props);
    }

    data = [
        {
            key: 'john',
            value: 'John Doe',
        },
        {
            key: 'jane',
            value: 'Jane Doe',
        },
        {
            key: 'mary',
            value: 'Mary Phillips',
        },
        {
            key: 'robert',
            value: 'Robert',
        },
        {
            key: 'karius',
            value: 'Karius',
        },
    ]

    render() {
        return (
            <SearchField
                placeholder="Placeholder"
                value="Doe"
                data={this.data}
                callback={record => console.log(record)}
            />

        )
    }
}
export default withRouter(search);

