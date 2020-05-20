import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
const GET_USER = gql`
query User($id: String){
    user(id: $id ){
      _id
    username 
      email
      password
    }
  }

`;

const UPDATE_USER = gql`
mutation updateUser(
    $userId : String!,
    $username: String,
    $email : String, 
    ) {
        updateUser(
            userId: $userId,
            username : $username,
            email : $email
        ) {
            _id
            }
    }
`;
class userAccount extends Component {

    constructor(props) {
        super()
        this.state = {
            username: "",
            email: "",
            updated: false
        }
    }

    componentDidMount = () => {
        console.log("this is the id :" + this.props.match.params.id);
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    displayForm = (e, val) => {
        e.preventDefault();
        switch (val) {
            case true:
                document.getElementById("user_panel").style.display = "none";
                document.getElementById("input_panel").style.display = "initial";

                break;
            case false:
                document.getElementById("user_panel").style.display = "initial";
                document.getElementById("input_panel").style.display = "none";
                this.setState({updated: false});

        }

    }
    render() {

        return (

            <Query pollInterval={500} query={GET_USER} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    //  console.log(data.user.Logos[0].Texts[0].text);
                    if (this.state.updated === false) {
                        this.setState({ username: data.user.username, email: data.user.email, updated: true });

                    }
                    const { username, email } = this.state;
                    return (
                        <div className="container center-block  text-center">

                            <div className="row1user center-block  text-center">

                                <div className="col col-lg-12 ">

                                    <div>
                                        

                                        <div > <h1> Account </h1> </div>
                                    </div>


                                </div>


                            </div>

                            <div id="user_panel" className="row ">

                                <div className=" col-lg-12  center-block  text-center">

                                    <div className="panel">
                                        <div>
                                            <label> Username:</label>
                                        </div>
                                        <div>
                                            <label> {data.user.username}</label>
                                        </div>
                                        <div>
                                            <label> email:</label>
                                        </div>
                                        <div>
                                            <label >  {data.user.email} </label>
                                        </div>

                                        <div>
                                            <Link to="/homescreen">
                                                <button className="btn btn-primary ">cancel</button>
                                            </Link>

                                            <button className="btn btn-primary " onClick={(e) => this.displayForm(e, true)}> Update User</button>
                                        </div>

                                    </div>


                                </div>

                            </div>


                            <Mutation mutation={UPDATE_USER} key={data.user._id} onCompleted={() => this.props.history.push(`/homescreen`)}>
                                {(updateUser, { loading, error }) => ( 
                                    
                                    <form id="input_panel" style={{ display: "none" }} onSubmit={e => {
                                        e.preventDefault();
                                        updateUser({ variables: { userId: this.props.match.params.id, username: this.state.username, email: this.state.email } });
                                    }}  >
                                        <div className="panel">
                                            <div>
                                                <label> Username:</label>
                                            </div>
                                            <div>
                                                <input name="username" type="text" onChange={this.onChange} value={username} />
                                            </div>
                                            <div>
                                                <label> email:</label>
                                            </div>
                                            <div>
                                                <input type="email" value={email} name="email" onChange={this.onChange} />
                                            </div>
                                            <div>
                                                <button className="btn btn-primary " type="submit">Update</button>
                                                <button onClick={(e) => this.displayForm(e, false)} className="btn btn-primary ">Cancel</button>
                                            </div>

                                           
                                        </div>
                                                    
                                    </form>

                                )}
                                       
                                    </Mutation>

                        </div>




                    );
                }
                }
            </Query >
        );
    }
}

export default userAccount;
