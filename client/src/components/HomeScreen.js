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

  logout=(e)=>{
    localStorage.clear();
    window.location.href = '/';
  }
  render() {
    return (
      <Query pollInterval={500} query={GET_LOGOS} variables={{ userId: this.state.userId}}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          //  console.log(data.user.Logos[0].Texts[0].text);
          let Logos = data.user.Logos;
          let links =[];
             Logos.map((logo, index)=>{
               if(logo.Texts.length ===0){
                links.push("Blank Logo");
               }
               else{
                links.push(logo.Texts[0].text);
               }
             })
          console.log(links);
         
          

          return (
            <div className="container ">
              <div className="row1Header center-block  text-center">
                <div className="col-lg-12  ">
                  <h1>Welcome {data.user.username}</h1>
                </div>
              </div>

              <div className="row center-block  text-center h-100 ">
                <div id ="logoList" className="logoList col-lg-8 ">
                  <div className="well">
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
                          style={{ color: 'blue', fontSize:20 }}
                          to={`/view/${data.user._id}/${logo._id}`}
                        >
                          {links[index]}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col col-lg-offset-6 buttonPanel">
                  <div className="well">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>

                  <div className="vcenter">
                    <div>
                      <h3 style={{fontWeight:"bold", color: "white"}}> Menu </h3>
                    </div>

                    <div>
                      {console.log('user id ' + data.user._id)}
                      <Link to={`/user/${data.user._id}`}>
                        <button type="button" className="btn btn-primary btn-block">
                          User
                        </button>
                      </Link>
                    </div>
                    <div>
                      <Link to={`/create/${data.user._id}`}>
                        <button
                          type="button"
                          className="btn btn-primary btn-block "
                        >
                          Create Logo
                        </button>
                      </Link>
                    </div>
                    <div>
                      <button type="button" className="btn btn-primary btn-block " onClick={this.logout}>
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
