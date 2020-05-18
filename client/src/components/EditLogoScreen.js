import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { TextComponent } from './TextComponent'
import {LogoImage} from './LogoImage'
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


const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,   
        $text: String!,
        $color: String!,
        $borderColor : String!, 
        $backgroundColor: String!, 
        $fontSize: Int!
        $borderRadius: Int!, 
        $borderWidth : Int!,
        $padding : Int!, 
        $margin : Int!
        ) {
            updateLogo(
                id: $id,
                text: $text,
            color: $color,
            borderColor : $borderColor,
            backgroundColor: $backgroundColor, 
            fontSize: $fontSize ,
            borderRadius: $borderRadius, 
            borderWidth : $borderWidth, 
            padding : $padding,
            margin : $margin
            ) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {


    constructor(props) {
        super(props);

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE

        this.state = {
            textArray: [],
            imageArray: [],
            currentText: 0,
            currentImage: 0,
            numTexts: 0,
            update: false,
            newImage: false,
            // lOGO CANVAS STYLING PROPERTIES
            backgroundColor: "#e8b072",
            borderColor: "#84254a",
            borderRadius: 10,
            borderWidth: 11,
            width: 500,
            height: 500,
            padding: 0,
            margin: 0
        }


    }
    updateText = (event) => {
        // this.changeText();
        if (this.state.numTexts == 0) {
            document.getElementById("TextInp").value = "";
            document.getElementById("TextInp").disabled = true;
            return;
        }
        else {
            document.getElementById("TextInp").disabled = false;
        }
        let copyOfTextArr = [];
        Object.assign(copyOfTextArr, this.state.textArray);
        copyOfTextArr[this.state.currentText].text = event.target.value;
        this.setState({ textArray: copyOfTextArr });
        this.setState({ update: false });

        // this.setState({update: false , textArray:copy  })
        //this.setState({ textInput: event.target.value })
        console.log(" the value of the text is : " + this.state.textArray[this.state.currentText].text)
    }
    widthChange = (event) => {
        this.setState({ width: event.target.value })
    }
    heightChange = (event) => {
        this.setState({ height: event.target.value })
    }
    ColorChange = (event) => {
        //this.setState({ textColor: event.target.value })
        let copyOfTextArr = [];
        Object.assign(copyOfTextArr, this.state.textArray);
        copyOfTextArr[this.state.currentText].color = event.target.value;
        this.setState({ textArray: copyOfTextArr });
        this.setState({ update: false });

        // this.setState({update:true});
        // this.state.textArray[this.state.currentText].color = event.target.value;
        // this.setState({update:false});
    }
    BackgroundColorChange = (event) => {
        this.setState({ backgroundColor: event.target.value })
    }
    BorderColorChange = (event) => {
        this.setState({ borderColor: event.target.value })
    }
    fontSizeChange = (event) => {
       
        let copyOfTextArr = [];
        Object.assign(copyOfTextArr, this.state.textArray);
        copyOfTextArr[this.state.currentText].fontSize = event.target.value;
        this.setState({ textArray: copyOfTextArr });

    }
    borderRadiusChange = (event) => {
        this.setState({ borderRadius: event.target.value })
    }
    borderWidthChange = (event) => {
        this.setState({ borderWidth: event.target.value })
    }
    paddingChange = (event) => {
        this.setState({ padding: event.target.value })
    }
    MarginChange = (event) => {
        this.setState({ margin: event.target.value })
    }
    disableLogoProperties = (value) => {
        document.getElementById("BackgroundColor").disabled = value;
        document.getElementById("BorderColor").disabled = value;
        document.getElementById("BorderRadius").disabled = value;
        document.getElementById("BorderWidth").disabled = value;
        document.getElementById("LogoHeight").disabled = value;
        document.getElementById("LogoWidth").disabled = value;
        document.getElementById("paddingInp").disabled = value;
        document.getElementById("marginInp").disabled = value;
    }
    disableTextProperties = (value) => {
        document.getElementById("TextInp").disabled = value;
        document.getElementById("ColorInp").disabled = value;
        document.getElementById("textFontSize").disabled = value;
    }
    textClicked = (index) => {
        // 
        console.log("The text index is " + index)

        this.setState({ currentText: index }, () => {
            console.log(this.state.currentText + " is the text we looking at ");
            //enable text properties
            this.disableTextProperties(false);
            // re populate the values in the inputs with the correct ones
            document.getElementById("TextInp").value = this.state.textArray[this.state.currentText].text;
            document.getElementById("textFontSize").value = this.state.textArray[this.state.currentText].fontSize;
            document.getElementById("ColorInp").value = this.state.textArray[this.state.currentText].color;
            // disable properties for the logo itself
            this.disableLogoProperties(true);
          
        })

    }
    LogoClicked = () => {

        this.disableTextProperties(true);
        // enable logo properties
        this.disableLogoProperties(false); 
        this.setState({newImage:true});
        this.clearImageFields();

    }
    clearImageFields =() =>{
        document.getElementById("imageSrc").value="";
        document.getElementById("imageHeight").value= "";
         document.getElementById("imageWidth").value ="";
    }
    AddImage =()=>{
        let copyArray = this.state.imageArray;
        // get values from the inputs
        let imageURL = document.getElementById("imageSrc").value;
        let height = document.getElementById("imageHeight").value;
        let width = document.getElementById("imageWidth").value;
        console.log("src is "+ imageURL+ " height "+ height+ " width :"+ width);
       // console.log(this.imageExists(imageURL));
       if(imageURL==""|| height ==""|| width==""){
           console.log("blank shit")
           return;
       }
        copyArray.push(new LogoImage(imageURL, height , width));
        this.setState({ imageArray: copyArray, newImage:false },()=>{
            document.getElementById("imageSrc").value="";
            document.getElementById("imageHeight").value= "";
             document.getElementById("imageWidth").value ="";
        });

    }
    imageClicked = (event, id) => {
        event.stopPropagation() //keyyyy.
        console.log(id); // set variable in state for current image clicked.
        this.setState({ currentImage: id , newImage: false}, () => {
                    document.getElementById("imageSrc").value = this.state.imageArray[this.state.currentImage].imageURL;
                 document.getElementById("imageHeight").value= this.state.imageArray[this.state.currentImage].imageHeight;
               document.getElementById("imageWidth").value= this.state.imageArray[this.state.currentImage].imageWidth;
        });

    }
    imageWidthChange= (e)=>{
        if(this.state.imageArray.length == 0 || this.state.newImage == true){
            return;
        }
        let copyImageArr= [] ;
        Object.assign(copyImageArr, this.state.imageArray);
        copyImageArr[this.state.currentImage].imageWidth= e.target.value;
        this.setState({imageArray: copyImageArr}, ()=>{
            // this.render();
        });
    }
    imageHeightChange =(e)=>{
        if(this.state.imageArray.length == 0 || this.state.newImage == true){
            return;
        }
        let copyImageArr= [] ;
        Object.assign(copyImageArr, this.state.imageArray);
        copyImageArr[this.state.currentImage].imageHeight= e.target.value;
        this.setState({imageArray: copyImageArr}, ()=>{
            // this.render();
        });
    }
    switchTabs =(evt) => {
        console.log("we clicking")
        console.log(evt.target.name);
        switch(evt.target.name){
           case "Logo": 
           document.getElementById("panel_form_Logo").style.display ="initial"
           document.getElementById("panel_form_image").style.display ="none";break;
           case "Image": 
           document.getElementById("panel_form_Logo").style.display ="none"
           document.getElementById("panel_form_image").style.display ="initial"
            ; break;     }
      }
    render() {


        let textArray = [];
        let imageArray = [];
        let userId = this.props.match.params.id;

        return (
            <Query query={GET_LOGO} variables={{ userId: this.props.match.params.id, logoId: this.props.match.params.logoId }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    let logo = data.singleLogo.Logos[0];
                    textArray = data.singleLogo.Logos[0].Texts;
                    imageArray = data.singleLogo.Logos[0].images;

                    if (this.state.update == false) {
                        this.setState({
                            update: true, textArray: textArray, imageArray: imageArray, numTexts: textArray.length,
                            backgroundColor: logo.backgroundColor,
                            borderColor: logo.borderColor,
                            borderRadius: logo.borderRadius,
                            borderWidth: logo.borderWidth,
                            width: logo.width,
                            height: logo.height,
                            padding: logo.padding,
                            margin: logo.margin
                        })
                    }

                    const styles = {
                        container:

                        {
                            
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius + "px",
                borderWidth: this.state.borderWidth + "px",
                width: this.state.width + "pt",
                height: this.state.height + "pt",
                padding: this.state.padding + "px",
                margin: this.state.margin + "px",
                overflowX: "hidden",
                overflowY: "hidden",
                flexWrap: "wrap",
                display: "flex",
                borderStyle: "solid"

                        }

                    }
                    let text;
                    if (textArray.length > 0) {
                        text =
                            <input id="TextInp" value={textArray[this.state.currentText].text} style={{ width: "max-content" }} className="form-control" onChange={this.updateText} />

                    }
                    else {
                        text =
                            <input id="TextInp" style={{ width: "max-content" }} className="form-control" onChange={this.updateText} />

                    }

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (

                                <div className="container">
                                    <nav className="nav-bar">
                                        <div className="nav-wrapper">
                                            <div className="panel-heading">
                                                <h4><Link style={{ color: "black" }} to="/">Home</Link></h4>

                                            </div>
                                        </div>
                                    </nav>


                                    <div className="parent" style={{ display: "flex" }}>
                                        <div className="panel-body">
                                            <div class="tab">
                                                <button name="Logo" class="tablinks" onClick={this.switchTabs}>Logo</button>
                                                <button name="Image" class="tablinks" onClick={this.switchTabs}>Image</button>

                                            </div>
                                            <form style={{ display: "none" }} id="panel_form_image">
                                                <div className="card red darken" style={{ backgroundColor: "red" }}>

                                                    <div >
                                                        <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                            Edit Image
                                                           </h3>
                                                    </div>

                                                    <div className="form-group" >
                                                        <label htmlFor="text">Image URL:</label>
                                                        <input id="imageSrc" style={{ width: "max-content" }} type="text" className="form-control" name="imageURL" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="imageWidth" htmlFor="color">Image Width:</label>
                                                        <input id="imageWidth" type="number" className="imageWidth" name="imageWidth" onChange={(e)=>this.imageWidthChange(e)}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="imageHeight" htmlFor="color">Image Height:</label>

                                                        <input id="imageHeight" type="number" className="imageHeight" name="imageHeight" onChange={(e)=>this.imageHeightChange(e)}/>
                                                    </div>

                                                </div>
                                            </form>

                                            <form name="panel_form" id="panel_form_Logo">
                                                <div className="card red darken" style={{ backgroundColor: "red" }}>
                                                    <div >
                                                        <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                            Edit Logo
                                                          </h3>
                                                    </div>

                                                    <div >
                                                        <label>Text:</label>
                                                        {text}
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="colorInputLabel" htmlFor="color">Color:</label>
                                                        <input id="ColorInp" type="color" className="color_input" name="color" value={textArray[this.state.currentText].color} onChange={this.ColorChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="colorInputLabel" htmlFor="color">backgroundColor:</label>
                                                        <input id="BackgroundColor" type="color" className="color_input" name="backgroundColor" placeholder="background Color" value={this.state.backgroundColor} onChange={this.BackgroundColorChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="colorInputLabel" htmlFor="color">Border Color:</label>
                                                        <input id="BorderColor" type="color" className="color_input" name="borderColor" value={this.state.borderColor} onChange={this.BorderColorChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="sliders_lables" >Width:</label>
                                                        <input id="LogoWidth" min="4" max="1500" type="number" className="input_sliders" name="width" defaultValue={this.state.width} onChange={this.widthChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="sliders_lables" >Height:</label>
                                                        <input id="LogoHeight" min="4" max="1500" type="number" className="input_sliders" name="height" value={this.state.height} onChange={this.heightChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="sliders_lables" htmlFor="fontSize">Font Size:</label>
                                                        <input id="textFontSize" min="4" max="150" type="number" className="input_sliders" name="Font Size" onChange={this.fontSizeChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="sliders_lables" htmlFor="borderWidth">Border Width:</label>
                                                        <input id="BorderWidth" min="0" max="250" type="number" className="input_sliders" name="Border Width" defaultValue={this.state.borderWidth} onChange={this.borderWidthChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="sliders_lables" htmlFor="borderRadius">Border Radius:</label>
                                                        <input id="BorderRadius" min="0" max="400" type="number" className="input_sliders" name="Border Radius" value={this.state.borderRadius} onChange={this.borderRadiusChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="sliders_lables" htmlFor="padding">Padding:</label>
                                                        <input id="paddingInp" min="0" max="250" type="number" className="input_sliders" name="padding"  value={this.state.padding} onChange={this.paddingChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="sliders_lables" htmlFor="margin">Margin:</label>
                                                        <input id="marginInp" min="0" max="250" type="number" className="input_sliders" name="margin"value={this.state.margin} onChange={this.MarginChange} />
                                                    </div>

                                                    <button type="submit" className="btn btn-success">Submit</button>
                                                </div>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                        <div className="workspace">

                                            <div id="Logo" onClick={this.LogoClicked} className=" Logo" style={styles.container}>
                                                {this.state.textArray.map((text, index) => (
                                                    <TextComponent
                                                        textClicked={this.textClicked}
                                                        index={index}
                                                        text={text}

                                                    />
                                                ))}
                                                {
                                                    this.state.imageArray.map((image, index) => (
                                                        <img height={image.imageHeight +"px"} width={image.imageWidth +"px"} id={index} onClick={(event) => this.imageClicked(event ,event.target.id)} src={image.imageURL}></img>

                                                    ))
                                                }

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }

}

export default EditLogoScreen;