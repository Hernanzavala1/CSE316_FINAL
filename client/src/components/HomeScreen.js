import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
{
    user(id:"5eba3121cb5a650a586ada97"){
          _id
          username
          email
          Logos{
            _id
            Texts{
                _id
                text
                fontSize
            }
            images{
                _id
                imageURL
            }
          }
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
                    //  console.log(data.user.Logos[0].Texts[0].text);
                    let Logos = data.user.Logos;
                    console.log(Logos)

                    console.log(Logos[0].Texts[0].text);
                    // data.logos.sort((a,b)=> (a.lastUpdate < b.lastUpdate)? 1: -1);
                    // for( let i =0 ;i < data.logos.length; i++){
                    //     if(data.logos[i].text.length > 25){
                    //         data.logos[i].text = data.logos[i].text.substring(0, 25 )+ "...";
                    //     }
                    // }

                    return (
                        <div className="container d-flex justify-content-center ">
                            <div class="row  ">

                                <div class="col-lg-7 no-gutters">
                                    <div class="leftside d-flex justify-content-center ">
                                        <div className="recent_work_list">
                                            <h3>Recent Work</h3>
                                            {data.user.Logos.map((logo, index) => (

                                                <div key={index} className='home_logo_link'
                                                    style={{ cursor: "pointer" }}>

                                                    <Link style={{ color: "black" }} to={`/view/${logo._id}`}>{logo.Texts[0].text}</Link>

                                                </div>




                                            ))}
                                        </div>
                                    </div>

                                </div>
                                <div class="col-lg-6 col-lg-offset-6 no-gutters">

                                    <div class="rightside d-flex justify-content-center">

                                        <h3>
                                            RIGHT HAND SIDE
                                </h3>

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

export default HomeScreen;
