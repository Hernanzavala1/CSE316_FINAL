import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {TextComponent} from '../components/TextComponent'

const GET_LOGO = gql`

query User($userId: String, $logoId: String ){
   singleLogo(userId: $userId,  logoId: $logoId ){
      _id
    username 
      email
      password
        Logos{
            _id
                Texts{
                    fontSize
                    color
                    backgroundColor 
                    borderColor
                    borderWidth
                    borderRadius
                    text
                }
                images{
                    imageURL
                    imageWidth
                    imageHeight
                }

            }
        
    }
  
}
`;


const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        this.state = {
           currentText: 0
        }
    }
  textClicked= (index)=>{
      this.setState({currentText: index});
  }
    componentDidMount = () => {
        console.log("this is the id :" + this.props.match.params.id);
        console.log("this is the logo id :" + this.props.match.params.logoId);
    }

    render() {
        let textArray =[];
        
        
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{userId:this.props.match.params.id, logoId: this.props.match.params.logoId }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    let logo = data.singleLogo.Logos[0];
                    textArray = data.singleLogo.Logos[0].Texts;
                    console.log("the text array is :")
                    console.log(textArray);
                        console.log("The logo is ")
                        console.log(logo);
                        console.log("the logo is above ")
                      
                    return (
                        <div className="container">
                            <nav className="nav-bar">
                                <div className="nav-wrapper">
                                    <div className="panel-heading">
                                        <h4><Link style={{ color: "black" }} to="/">Home</Link></h4>

                                    </div>
                                </div>
                            </nav>
     
                                
                            <div className="parent" style={{ display: "flex" }}>
                                <div className="panel-body" >
                                    <div className="card red darken" style={{ backgroundColor: "red" }}>

                                        <div >
                                            <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                View Logo
                                            </h3>
                                        </div>


                                    <dl>
                                        
                                        <dt>Text:</dt>
                                        <div className="col s8" style={{display:"inline-grid"}}>
                                            <pre  style={{overflow:"auto"}}>
                                        <dd  >{logo.Texts[this.state.currentText].text}</dd>
                                        </pre>
                                          </div>   
                                        <dt>Color:</dt>
                                        <dd>{logo.Texts[this.state.currentText].color}</dd>
                                        <dt>borderColor:</dt>
                                        <dd>{logo.Texts[this.state.currentText].borderColor}</dd>
                                        <dt>backgroundColor:</dt>
                                        <dd>{logo.Texts[this.state.currentText].backgroundColor}</dd>
                                        <dt>Font Size:</dt>
                                        <dd>{logo.Texts[this.state.currentText].fontSize}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{logo.Texts[this.state.currentText].borderRadius}</dd>
                                        <dt>Border Width:</dt>
                                        <dd>{logo.Texts[this.state.currentText].borderWidth}</dd>
                                       
                                    </dl>
                                    {/* <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation> */}
                                    </div>
                                </div>
                                <div className="workspace">
                                      
                                            {textArray.map((text, index)=>(
                                                <TextComponent  
                                                    textClicked = {this.textClicked}
                                                    index ={index}
                                                    text={text}                            
                                                    // goToLogoCallback={this.props.goToLogoCallback}
                                                    />  
                                            ))}
                                           
                                

                                 

                                </div>
                            </div>

                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;