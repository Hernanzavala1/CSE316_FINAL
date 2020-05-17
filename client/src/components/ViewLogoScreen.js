import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { TextComponent } from '../components/TextComponent'

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
                    text
                }
                images{
                    imageURL
                    imageWidth
                    imageHeight
                }
                    width
                    height
                    backgroundColor 
                    borderColor
                    borderWidth
                    borderRadius
                    padding
                    margin

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
            currentText: 0,
            currentImage: 0
        }
    }
    textClicked = (index) => {
        this.setState({ currentText: index });
    }
    componentDidMount = () => {
        console.log("this is the id :" + this.props.match.params.id);
        console.log("this is the logo id :" + this.props.match.params.logoId);
    }
    imageClicked =( id)=>{
        console.log(id); // set variable in state for current image clicked.
        this.setState({currentImage : id}, ()=>{
    //         document.getElementById("imageSrc").value = this.state.imageArray[this.state.currentImage].imageURL;
    //      document.getElementById("imageHeight").value= this.state.imageArray[this.state.currentImage].imageHeight;
    //    document.getElementById("imageWidth").value= this.state.imageArray[this.state.currentImage].imageWidth;
        });

    }


    render() {
        let textArray = [];
        let imageArray = [];


        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ userId: this.props.match.params.id, logoId: this.props.match.params.logoId }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    let logo = data.singleLogo.Logos[0];
                    textArray = data.singleLogo.Logos[0].Texts;
                    imageArray = data.singleLogo.Logos[0].images;
                    console.log("the text array is :")
                    console.log(textArray);
                    console.log("The logo is ")
                    console.log(logo);
                    console.log("the logo is above ")
                    const styles = {
                        container: {

                            backgroundColor: data.singleLogo.Logos[0].backgroundColor,
                            borderColor: data.singleLogo.Logos[0].borderColor,
                            borderRadius: data.singleLogo.Logos[0].borderRadius + "px",
                            borderWidth: data.singleLogo.Logos[0].borderWidth + "px",
                            width: data.singleLogo.Logos[0].width + "pt",
                            height: data.singleLogo.Logos[0].height + "pt",
                            padding: data.singleLogo.Logos[0].padding + "px",
                            margin: data.singleLogo.Logos[0].margin + "px",
                            overflowX: "hidden",
                            overflowY: "hidden",
                            flexWrap: "wrap",
                            display: "flex",
                            borderStyle: "solid"
                        }
                    }

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

                                <div style={{ display: "none" }} className="panel-body_image" >
                                    <div className="card red darken" style={{ backgroundColor: "red" }}>

                                        <div >
                                            <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                View Image
                                            </h3>
                                        </div>
                                        <dl>

                                            <dt>Image URL:</dt>
                                            <div className="col s8" style={{ display: "inline-grid" }}>
                                                <pre style={{ overflow: "auto" }}>
                                                    <dd  >{imageArray[this.state.currentImage].imageURL}</dd>
                                                </pre>
                                            </div>

                                            <dt>Image Width:</dt>
                                            <dd>{imageArray[this.state.currentImage].imageWidth}</dd>
                                            <dt>Image Height:</dt>
                                            <dd>{imageArray[this.state.currentImage].imageHeight}</dd>

                                        </dl>

                                    </div>
                                </div>

                                <div className="panel-body" >
                                    <div className="card red darken" style={{ backgroundColor: "red" }}>

                                        <div >
                                            <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                View Logo
                                            </h3>
                                        </div>


                                        <dl>

                                            <dt>Text:</dt>
                                            <div className="col s8" style={{ display: "inline-grid" }}>
                                                <pre style={{ overflow: "auto" }}>
                                                    <dd  >{textArray[this.state.currentText].text}</dd>
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

                                    </div>
                                </div>
                                <div className="workspace">

                                    <div className="Logo" style={styles.container}>
                                        {textArray.map((text, index) => (
                                            <TextComponent
                                                textClicked={this.textClicked}
                                                index={index}
                                                text={text}
                                            // goToLogoCallback={this.props.goToLogoCallback}
                                            />
                                        ))}
                                        {
                                            imageArray.map((image, index) => (
                                                <img height={image.height} width={image.width} id={index} onClick={(event) => this.imageClicked(event.target.id)} src={image.imageURL}></img>

                                            ))
                                        }
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

export default ViewLogoScreen;