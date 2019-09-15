import React from "react";
// import { Page,  Button } from "tabler-react";
import { withRouter,Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Button} from 'reactstrap';


class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            limit: 5, // optional
            page: 1
        };
    }

    paginateValue = (page) => {
        this.setState({ page: page });
        console.log(page)
    }

    paginatePrevValue = (page) => {
        this.setState({ page: page });
        console.log(page)
    }
    paginateNxtValue = (page) => {
        this.setState({ page: page });
        console.log(page)
    }

    render() {
        return (
            <>
                <div>
                    <Button.List>
                        <Button
                            disabled={this.state.page === 0}
                            onClick={() => this.paginatePrevValue(this.state.page - 1)}
                            outline
                            color="primary"
                        >
                            Previous
                        </Button>

                        {this.state.array.map((value, index) => {
                            return (
                                <Button
                                    onClick={() => this.paginateValue(value)}
                                    color={
                                        this.state.page === value
                                            ? "primary"
                                            : "secondary"
                                    }
                                >
                                    {value}
                                </Button>
                            );
                        })}

                        <Button
                            onClick={() => this.paginateNxtValue(this.state.page + 1)}
                            outline
                            color="secondary"
                        >
                            Next
                        </Button>
                    </Button.List>
                </div>
            </>

        )
    }
}

export default withRouter(Pagination);