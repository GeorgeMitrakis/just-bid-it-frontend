import React from "react";
import { withRouter } from 'react-router-dom';
import { getUserInfoField } from './Utility';
import './UserData.css'

class UserData extends React.Component{
    constructor(props) {
        super(props);
        this.state = { //state is by default an object
            students: [
                { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
                { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
                { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
                { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
            ]
        }
    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
            const { id, name, age, email } = student //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{email}</td>
                </tr>
            )
        })
    }



    render() {
        return(


            <div>

                <h3> Thank you for your sign up , !</h3>
                <h4> Confrirmation pending...</h4>
                    <h1 id='title'></h1>
                    <table id='students'>
                        <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                        </tbody>
                    </table>


            </div>

        )
    }


}
export default withRouter(UserData);