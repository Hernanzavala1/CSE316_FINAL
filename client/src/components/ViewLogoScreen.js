import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { TextComponent } from '../components/TextComponent'
import domtoimage from 'dom-to-image';
    
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
  mutation LogoDelete($id: String! , $LogoId: String!) {
    LogoDelete(id:$id, LogoId: $LogoId) {
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
        this.disableLogoPannel(false);
        this.setState({ currentText: index }, () => {
            this.disableImagePannel(true);
        });
    }
    componentDidMount = () => {
        console.log("this is the id :" + this.props.match.params.id);
        console.log("this is the logo id :" + this.props.match.params.logoId);
    }
    imageClicked = (id) => {
        console.log(id); // set variable in state for current image clicked.
        this.disableImagePannel(false);
        this.setState({ currentImage: id }, () => {
            this.disableLogoPannel(true);
        });

    }
    disableImagePannel = (value) => {
        if (document.getElementById("panel-body_image") === null) {
            return;
        }
        switch (value) {
            case true:
                document.getElementById("panel-body_image").style.display = "none"; break;
            case false:
                document.getElementById("panel-body_image").style.display = "initial"; break;
        }

    }
    disableLogoPannel = (value) => {
        if (document.getElementById("panel-body") === null) {
            return;
        }
        switch (value) {
            case true:
                document.getElementById("panel-body").style.display = "none"; break;
            case false:
                document.getElementById("panel-body").style.display = "initial"; break;
        }

    }
    ExportLogo =(e)=>{
        e.preventDefault();
        console.log("IN EXPORT LOGO")

        console.log(document.getElementsByClassName('workspace')[0])
        domtoimage.toPng(document.getElementById('Logo'))
        .then(function (dataUrl) {
            var link = document.createElement('a');

            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        }).catch((error)=>{
            console.log("couldnt fetch one of the images"+ error)
            alert("One of the images cannot be fetch!");
        });
    }
    render() {
        let textArray = [];
        let imageArray = [];
        let userId = this.props.match.params.id;


        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ userId: this.props.match.params.id, logoId: this.props.match.params.logoId }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    let logo = data.singleLogo.Logos[0];
                    textArray = data.singleLogo.Logos[0].Texts;
                    imageArray = data.singleLogo.Logos[0].images;
                    // console.log("the text array is :")
                    // console.log(textArray);
                    // console.log("The logo is ")
                    // console.log(logo);
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
                    let image_panel;
                    if (imageArray.length == 0) {
                        image_panel = <dl>
                            <dt>Image URL:</dt>
                            <div className="col s8" style={{ display: "inline-grid" }}>
                                <pre style={{ overflow: "auto" }}>

                                    {/* //<dd  >{imageArray[this.state.currentImage].imageURL}</dd> */}
                                </pre>
                            </div>

                            <dt>Image Width:</dt>
                            {/* <dd>{imageArray[this.state.currentImage].imageWidth}</dd> */}
                            <dt>Image Height:</dt>
                            {/* <dd>{imageArray[this.state.currentImage].imageHeight}</dd> */}

                        </dl>;
                    }
                    else {
                        image_panel = <dl>
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
                    }
                        
                        let text = "";
                        let fontSize =0;
                        let color = "";
                        if(textArray.length > 0){
                            text=textArray[this.state.currentText].text;
                            color = textArray[this.state.currentText].color;
                            fontSize = textArray[this.state.currentText].fontSize;
                        }
                        
                    return (
                        <div className="container">
                            <nav className="nav-bar">
                                <div className="nav-wrapper">
                                    <div className="panel-heading">
                                        <h4><Link style={{ color: "black" }} to="/homescreen">Home</Link></h4>

                                        
                                          
                           

                                    </div>
                                </div>
                            </nav>


                            <div className="parent" style={{ display: "flex" }}>
                                <div style={{ display: "none", height: "max-content" }} id="panel-body_image" className="panel-body" >
                                    <div className="card red darken" style={{ backgroundColor: "red" }}>

                                        <div >
                                            <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                View Image
                                            </h3>
                                        </div>
                                        {image_panel}

                                    </div>
                                </div>

                                <div id="panel-body" className="panel-body" style={{ height: "max-content" }} >
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
                                                    <dd  >{text}</dd>
                                                </pre>
                                            </div>
                                            <dt>Color:</dt>
                                            <dd >{color}</dd>
                                            <dt>borderColor:</dt>
                                            <dd>{logo.borderColor}</dd>
                                            <dt>backgroundColor:</dt>
                                            <dd>{logo.backgroundColor}</dd>
                                            <dt>Font Size:</dt>
                                            <dd>{fontSize}</dd>
                                            <dt>Border Radius:</dt>
                                            <dd>{logo.borderRadius}</dd>
                                            <dt>Border Width:</dt>
                                            <dd>{logo.borderWidth}</dd>
                                            <dt> Width:</dt>
                                            <dd>{logo.width}</dd>
                                            <dt>Height:</dt>
                                            <dd>{logo.height}</dd>
                                            <dt>Padding:</dt>
                                            <dd>{logo.padding}</dd>
                                            <dt>margin:</dt>
                                            <dd>{logo.margin}</dd>
                                        </dl>
                                        <Mutation mutation={DELETE_LOGO} key={logo._id} onCompleted={() => this.props.history.push('/homescreen')}>
                                            {(LogoDelete, { loading, error }) => (
                                                <div>
                                                    <form
                                                        onSubmit={e => {
                                                            e.preventDefault();
                                                            LogoDelete({ variables: { id: userId, LogoId: logo._id } });
                                                        }}>
                                                        <Link to={`/edit/${userId}/${logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                <button className=" btn-danger btn" onClick={this.ExportLogo}> Export </button>
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                </div>
                                            )}
                                        </Mutation>
                                    </div>
                                </div>

                                <div className="workspace">

                                    <div id ="Logo" className="Logo" style={styles.container}>
                                        {textArray.map((text, index) => (
                                            <TextComponent
                                                textClicked={this.textClicked}
                                                index={index}
                                                key={index}
                                                text={text}
                                           
                                            />
                                        ))}
                                        {
                                            imageArray.map((image, index) => (
                                                <img alt="Error" height={image.imageHeight +"px"} width={image.imageWidth +"px"}  id={index} onClick={(event) => this.imageClicked(event.target.id)} src={image.imageURL} ></img>

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