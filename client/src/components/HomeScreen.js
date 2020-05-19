import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import jwt_decode from 'jwt-decode';
const GET_LOGOS = gql`
query User($userId: String!){
    user(id: $userId) {
      _id
      username
      email
      Logos {
        _id
        Texts {
          _id
          text
          fontSize
        }
        images {
          _id
          imageURL
        }
      }
    }
  }
`;


class HomeScreen extends Component {

  constructor(props){
    super()
    this.state={
      userId: ""
    }
  }

  componentDidMount() {
    let token = localStorage.jwtToken
    let decoded = jwt_decode(token)
    console.log("the token is :")
    console.log(decoded._id)
    this.setState({userId:decoded._id});
  
  }


  render() {
    return (
      <Query pollInterval={500} query={GET_LOGOS} variables={{ userId: this.state.userId}}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          //  console.log(data.user.Logos[0].Texts[0].text);
          let Logos = data.user.Logos;

          console.log(data.user._id);

          // console.log(Logos[0].Texts[0].text);
          // data.logos.sort((a,b)=> (a.lastUpdate < b.lastUpdate)? 1: -1);
          // for( let i =0 ;i < data.logos.length; i++){
          //     if(data.logos[i].text.length > 25){
          //         data.logos[i].text = data.logos[i].text.substring(0, 25 )+ "...";
          //     }
          // }

          return (
            <div class="container ">
              <div class="row1Header center-block  text-center">
                <div class="col-lg-12  ">
                  <h1>Welcome {data.user.username}</h1>
                </div>
              </div>

              <div class="row center-block  text-center h-100 ">
                <div class="col-lg-8 ">
                  <div class="well">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div>
                    <h3>Recent Work</h3>
                    {data.user.Logos.map((logo, index) => (
                      <div
                        key={index}
                        className="home_logo_link"
                        style={{ cursor: 'pointer' }}
                      >
                        <Link
                          style={{ color: 'black' }}
                          to={`/view/${data.user._id}/${logo._id}`}
                        >
                          {logo.Texts[0].text}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div class="col col-lg-offset-6">
                  <div class="well">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div class="vcenter">
                    <div>
                      <h3> Menu </h3>
                    </div>

                    <div>
                      {console.log('user id ' + data.user._id)}
                      <Link to={`/user/${data.user._id}`}>
                        <button type="button" class="btn btn-primary btn-block">
                          User
                        </button>
                      </Link>
                    </div>
                    <div>
                      <Link to={`/create/${data.user._id}`}>
                        <button
                          type="button"
                          class="btn btn-primary btn-block "
                        >
                          Create Logo
                        </button>
                      </Link>
                    </div>
                    <div>
                      <button type="button" class="btn btn-primary btn-block ">
                        LogOut
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default HomeScreen;
