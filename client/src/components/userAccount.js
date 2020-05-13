import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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

// const GET_USER = gql`
// {
//     user(id:$userId ){
//         _id
//         username
//         email
//         password
//     }
//   }
// `;

class userAccount extends Component {

    componentDidMount = () => {
        console.log("this is the id :" + this.props.match.params.id);
    }

    render() {
        return (

            <Query pollInterval={500} query={GET_USER} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    //  console.log(data.user.Logos[0].Texts[0].text);


                    return (
                        <div className="container center-block  text-center">

                            <div className="row1user center-block  text-center">

                                <div className="col col-lg-12 ">

                                    <div>
                                        <h1> Account </h1>
                                    </div>


                                </div>

                            </div>

                            <div className="row ">

                                <div className=" col-lg-12  center-block  text-center">

                                        <div className="panel">
                                            <div>
                                                <label> Username:</label>
                                            </div>
                                            <div>
                                                <label> {data.user.username} </label>
                                            </div>
                                            <div>
                                                <label> email:</label>
                                            </div>
                                            <div>
                                                <label> {data.user.email} </label>
                                            </div>
                                            <div>
                                                <label> Password:</label>
                                            </div>
                                            <div>
                                                <label> {(data.user.password )} </label>
                                            </div> 
                                        </div>


                                </div>

                            </div>





                        </div>




                    );
                }
                }
            </Query >
        );
    }
}

export default userAccount;
