import React, { Component } from 'react'
import '../Styles2.css'
class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            username: "",
            submitClicked: false,
            updateClicked: false,
            deleteClicked: false,
            arrayOfNames: []
        }

    }
    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { arrayOfNames, nameBeforeUpdate, } = this.state
        if (this.state.updateClicked) {
            let a = arrayOfNames.filter(o => o.nameAfter == nameBeforeUpdate)[0]
            a.nameAfter = event.target[0].value
            a.usernameAfter = event.target[1].value
            console.log(arrayOfNames)
            this.setState({
                deleteClicked: false,
                arrayOfNames: arrayOfNames,
                name: "",
                username: "",
                updateClicked: false
            })

        }

        else {
            this.setState({
                deleteClicked: false,
                arrayOfNames: [...this.state.arrayOfNames, { nameAfter: this.state.name, usernameAfter: this.state.username }],
                name: "",
                username: "",
                updateClicked: false,
            })
        }
    }
    handleUpdate(user) {

        this.setState({
            name: user.nameAfter,
            username: user.usernameAfter,
            updateClicked: true,
            nameBeforeUpdate: user.nameAfter,
            usernameBeforeUpdate: user.usernameAfter

        })


    }
    handleDelete(user) {
        let tempName = user
        console.log(tempName)
        let tempArray = [...this.state.arrayOfNames]
        let tempObject = tempArray.filter(o => o.nameAfter != tempName.nameAfter);
        if (tempObject != null) {
           
            this.setState({
                arrayOfNames: tempObject
            })
        }
    }

    render() {
        return (
            <div>
                <h2>CURD OPERATIONS</h2>
                <form onSubmit={this.handleSubmit} class="block-1">
                    <div class="form-control">
                        <p>Name</p>
                        <input type="text" value={this.state.name} onChange={this.handleName} name="name" />
                    </div>
                    <div class="form-control">
                        <p>
                            Username
                        </p>
                        <input type="text" value={this.state.username} onChange={this.handleUserName} name="username" />
                    </div>
                    <button class="submitButton" type="submit">ADD</button>

                </form>
                <div >
                    {
                        this.state.arrayOfNames.map(user =>
                            
                            <>
                                {user.nameAfter != "" && user.usernameAfter != "" ?
                                    <div class="block-2" >
                                        {!this.state.deleteClicked ?

                                            <div >

                                                <div class="flexStyle">
                                                    <div class="widthStyle">
                                                        <span>{user.nameAfter} </span>
                                                        <span>{user.usernameAfter}</span>
                                                    </div>

                                                    <div class="widthStyle">
                                                        <button onClick={() => this.handleUpdate(user)}>Update</button>


                                                        <button onClick={() => this.handleDelete(user)}>Delete</button>
                                                    </div>
                                                </div>


                                            </div> : null
                                        }


                                    </div> : null

                                }
                            </>

                        )
                    }


                </div>
            </div>
        )
    }
}
export default ToDoList