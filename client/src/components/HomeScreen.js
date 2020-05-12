import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    data.logos.sort((a,b)=> (a.lastUpdate < b.lastUpdate)? 1: -1);
                    for( let i =0 ;i < data.logos.length; i++){
                        if(data.logos[i].text.length > 25){
                            data.logos[i].text = data.logos[i].text.substring(0, 25 )+ "...";
                        }
                    }
                    
                    return (
                        <div className="container_row">
                            <div className="recent_work_list">
                                <h3>Recent Work</h3>
                                {data.logos.map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        
                                            <Link style={{ color: "black" }} to={`/view/${logo._id}`}>{logo.text}</Link>
                                     
                                    </div>
                                ))}
                            </div>
                            <div className="homescreen_logo">
                                <div id="home_banner_container">
                                    <br />
                                    List Maker
                                </div>
                                <div>
                                    <button className="homeScreen_button">
                                        <Link id="add_logo_button" to="/create">
                                            <h4 style={{color:"white"}}> Add Logo </h4>
                                         </Link>
                                    </button>
                                    
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

export default HomeScreen;
