import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { parse } from 'graphql';
import { TextComponentCreate } from '../components/TextComponentCreate'
import { TextComponent } from '../components/TextComponent'
import { NewText } from './NewText';
import {LogoImage} from './LogoImage'
const UserAddLogo = gql`
    mutation UserAddLogo(
        $userId : String!
        $borderColor : String!, 
        $backgroundColor: String!, 
        $borderRadius: Int!,
        $borderWidth : Int!, 
        $padding : Int!, 
        $margin : Int!,
        $width : Int!,
        $height : Int!,
        $TextsArray : [textInput]
        $ImageArr : [imageInput]
        ) {
            UserAddLogo(
            userId: $userId,
            borderColor : $borderColor, 
            backgroundColor: $backgroundColor, 
            borderRadius: $borderRadius, 
            borderWidth : $borderWidth, 
            padding : $padding,
            margin : $margin,
            width : $width,
            height : $height,
            TextsArray: $TextsArray
            ImageArr: $ImageArr
           ) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor(props) {
        super(props);

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE

        this.state = {
            textArray: [new NewText()],
            imageArray : [],
            currentText: 0,
            currentImage:0, 
            numTexts: 1,
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
    componentDidMount = () => {
        // let array =[];
        // array.push(new NewText());
        // this.setState({textArray:array});
        //  this.state.textArray.push(new NewText());
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
        //     console.log("old object is :")
        //     console.log( this.state.textArray[this.state.currentText]);
        //    // console.log(event.target.value)
        //     this.setState({update:true});
        //     this.state.textArray[this.state.currentText].fontSize = event.target.value;
        //     console.log("new object is :")
        //     console.log( this.state.textArray[this.state.currentText]);
        //     this.setState({update:false});
        let copyOfTextArr = [];
        Object.assign(copyOfTextArr, this.state.textArray);
        copyOfTextArr[this.state.currentText].fontSize = event.target.value;
        this.setState({ textArray: copyOfTextArr });
        this.setState({ update: false });
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
    
    LogoClicked = () => {

        this.disableTextProperties(true);
        // enable logo properties
        this.disableLogoProperties(false);
        console.log("can add new image now!") 
        this.setState({newImage:true});
        this.clearImageFields();


    }
    disableLogoProperties =(value)=>{
        document.getElementById("BackgroundColor").disabled = value;
            document.getElementById("BorderColor").disabled = value;
            document.getElementById("BorderRadius").disabled = value;
            document.getElementById("BorderWidth").disabled = value;
            document.getElementById("LogoHeight").disabled = value;
            document.getElementById("LogoWidth").disabled = value;
            document.getElementById("paddingInp").disabled = value;
            document.getElementById("marginInp").disabled = value;
    }
    disableTextProperties = (value)=>{
        document.getElementById("TextInp").disabled = value;
        document.getElementById("ColorInp").disabled = value;
        document.getElementById("textFontSize").disabled = value;
    }
    textClicked = (index) => {
        // 

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
            this.render();
        })

    }
    deleteImage = (e) => {
        e.preventDefault();
        let copyArray = [];
        Object.assign(copyArray, this.state.imageArray);
        copyArray.splice(this.state.currentImage, 1);
        this.setState({ imageArray: copyArray}, () => {
            this.clearImageFields()
        });
    }
    deleteText = (e) => {
        e.preventDefault();
        let copyArray = [];
        Object.assign(copyArray, this.state.textArray);
        copyArray.splice(this.state.currentText, 1);
        this.setState({ textArray: copyArray, numTexts: this.state.numTexts - 1 }, () => {
            this.render();
        });
    }
    addNewText = (e) => {
        e.preventDefault();
        let copyArray = this.state.textArray;
        copyArray.push(new NewText());
        this.setState({ textArray: copyArray, numTexts: this.state.numTexts + 1 });
    }
    AddImage = (e) => {
        e.preventDefault();
        let copyArray = this.state.imageArray;
        // get values from the inputs
        let imageURL = document.getElementById("imageSrc").value;
        let height = document.getElementById("imageHeight").value;
        let width = document.getElementById("imageWidth").value;
        console.log("src is " + imageURL + " height " + height + " width :" + width);
        // console.log(this.imageExists(imageURL));
        if (imageURL == "" || height == "" || width == "") {
            console.log("blank shit")
            return;
        }
        copyArray.push(new LogoImage(imageURL, height, width));
        this.setState({ imageArray: copyArray, newImage: false }, () => {
            document.getElementById("imageSrc").value = "";
            document.getElementById("imageHeight").value = "";
            document.getElementById("imageWidth").value = "";
        });

    }
    clearImageFields =() =>{
        document.getElementById("imageSrc").value="";
        document.getElementById("imageHeight").value= "";
         document.getElementById("imageWidth").value ="";
    }
    imageExists= (image_url)=>{

        var http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
    
        return http.status != 404;
    
    }
    imageClicked =( event , id)=>{
        event.stopPropagation() //keyyyy.
        console.log(id); // set variable in state for current image clicked.\
        console.log("no new images plz")
        this.setState({currentImage : id , newImage: false} , ()=>{
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
        const styles = {
            container: {

                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius + "px",
                borderWidth: this.state.borderWidth + "px",
                width: this.state.width + "px",
                height: this.state.height + "px",
                padding: this.state.padding + "px",
                margin: this.state.margin + "px",
                overflowX: "hidden",
                overflowY: "hidden",
                flexWrap: "wrap",
                display: "flex",
                borderStyle: "solid"
            }
        }

        let text, color, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, fontSize;
        return (
            <Mutation mutation={UserAddLogo} onCompleted={() => this.props.history.push('/homescreen')}>
                {(UserAddLogo, { loading, error }) => (
                    <div className="container">
                        <nav className="nav-bar">
                            <div className="nav-wrapper">
                                <div className="panel-heading">
                                    <h4><Link style={{ color: "black" }} to="/homescreen">Home</Link></h4>
                                    {/* <div >
                                            <button onClick={this.addNewText} className="btn btn-primary"> ADD NEW TEXT </button>
                                            <button onClick={this.deleteText} className="btn btn-primary"> Delete Text </button>
                                            <button onClick={ this.AddImage} className="btn btn-primary">Add Image</button>
                                            <button onClick={this.deleteImage} className="btn btn-primary"> Delete Image </button>
                                     </div> */}
                                </div>
                            </div>
                        </nav>

                        <div className="parent" style={{ display: "flex" }}>

                            <div className="panel-body">
                                <div class="tab">
                                    <button name="Logo" class="tablinks" onClick={ this.switchTabs}>Logo</button>
                                    <button name ="Image" class="tablinks" onClick={ this.switchTabs}>Image</button>
                        
                                </div>
                                <div style={{ display: "none" }} id="panel_form_image">
                                    <div className="card red darken" style={{ backgroundColor: "red" }}>

                                        <div >
                                            <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                Create Image
                                            </h3>
                                        </div>
                                    
                                        <div className="form-group" >
                                            <label htmlFor="text">Image URL:</label>
                                            <input id ="imageSrc" style={{ width: "max-content" }} type="text" className="form-control" name="imageURL"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="imageWidth" htmlFor="color">Image Width:</label>
                                            <input id="imageWidth" type="number" className="imageWidth" name="imageWidth" onChange={(e)=>this.imageWidthChange(e)} />
                                        </div>
                                        <div className="form-group">
                                        <label className="imageHeight" htmlFor="color">Image Height:</label>

                                            <input  id="imageHeight" type="number" className="imageHeight" name="imageHeight" onChange={(e)=>this.imageHeightChange(e)} />
                                        </div>
                                         <div>
                                        <button onClick={this.AddImage} className="btn btn-primary">Add Image</button>
                                         <button onClick={this.deleteImage} className="btn btn-primary"> Delete Image </button>
                                        </div> 
                                       
                                    </div>
                                </div>
                                <form name="panel_form" id="panel_form_Logo" onSubmit={e => {
                                    e.preventDefault();
                                    let copyArr = [];
                                    this.state.textArray.map((text) => {
                                        copyArr.push({ color: text.color, fontSize: parseInt(text.fontSize), text: text.text })
                                    });
                                    let copyImageArr= [];
                                    this.state.imageArray.map((image)=>{
                                        copyImageArr.push({imageWidth: parseInt(image.imageWidth),imageHeight:parseInt(image.imageHeight), imageURL: image.imageURL })
                                    })
                                    UserAddLogo({
                                        variables: {
                                            userId: this.props.match.params.id,
                                            TextsArray: copyArr,
                                            ImageArr: copyImageArr,
                                            backgroundColor: this.state.backgroundColor,
                                            borderColor: this.state.borderColor, borderRadius: parseInt(this.state.borderRadius),
                                            borderWidth: parseInt(this.state.borderWidth), padding: parseInt(this.state.padding), margin: parseInt(this.state.margin),
                                            width: parseInt(this.state.width), height: parseInt(this.state.height)

                                        }
                                    });


                                    text.value = "";
                                    color.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    fontSize.value = "";
                                    borderWidth.value = "";
                                    borderRadius.value = "";
                                    padding.value = "";
                                    margin.value = "";

                                }}>
                                    <div className="card red darken" style={{ backgroundColor: "red" }}>

                                        <div >
                                            <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                Create Logo
                                            </h3>
                                        </div>
                                        <div >
                                            <button onClick={this.addNewText} className="btn btn-primary"> Add New Text </button>
                                            <button onClick={this.deleteText} className="btn btn-primary"> Delete Text </button>
                                           
                                     </div>
                                       
                                        <div className="form-group" >
                                            <label htmlFor="text">Text:</label>
                                            <input id="TextInp" style={{ width: "max-content" }} type="text" className="form-control" name="text" ref={node => {
                                                text = node;
                                            }} onChange={this.updateText} />
                                        </div>
                                        <div className="form-group">
                                            <label className="colorInputLabel" htmlFor="color">Color:</label>
                                            <input id="ColorInp" type="color" className="color_input" name="color" ref={node => {
                                                color = node;
                                            }} onChange={this.ColorChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="colorInputLabel" htmlFor="color">Background Color:</label>
                                            <input id="BackgroundColor" type="color" className="color_input" name="backgroundColor" ref={node => {
                                                backgroundColor = node;
                                            }} value={this.state.backgroundColor} onChange={this.BackgroundColorChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="colorInputLabel" htmlFor="color">Border Color:</label>
                                            <input id="BorderColor" type="color" className="color_input" name="borderColor" ref={node => {
                                                borderColor = node;
                                            }} value={this.state.borderColor} onChange={this.BorderColorChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" >Width:</label>
                                            <input id="LogoWidth" min="4" max="1500" type="number" className="input_sliders" name="width"  defaultValue={this.state.width} onChange={this.widthChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" >Height:</label>
                                            <input id="LogoHeight" min="4" max="1500" type="number" className="input_sliders" name="height"  value={this.state.height} onChange={this.heightChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="fontSize">Font Size:</label>
                                            <input id="textFontSize" min="4" max="150" type="number" className="input_sliders" name="Font Size" ref={node => {
                                                fontSize = node;
                                            }} onChange={this.fontSizeChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="borderWidth">Border Width:</label>
                                            <input id="BorderWidth" min="0" max="250" type="number" className="input_sliders" name="Border Width" ref={node => {
                                                borderWidth = node;
                                            }} defaultValue={this.state.borderWidth} onChange={this.borderWidthChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="borderRadius">Border Radius:</label>
                                            <input id="BorderRadius" min="0" max="400" type="number" className="input_sliders" name="Border Radius" ref={node => {
                                                borderRadius = node;
                                            }} value={this.state.borderRadius} onChange={this.borderRadiusChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="padding">Padding:</label>
                                            <input id="paddingInp" min="0" max="250" type="number" className="input_sliders" name="padding" ref={node => {
                                                padding = node;
                                            }} value={this.state.padding} onChange={this.paddingChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="margin">Margin:</label>
                                            <input id="marginInp" min="0" max="250" type="number" className="input_sliders" name="margin" ref={node => {
                                                margin = node;
                                            }} value={this.state.margin} onChange={this.MarginChange} />
                                        </div>
                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </div>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again </p>}
                            </div>
                            <div className="workspace">
                                <div id="Logo" onClick={this.LogoClicked} className=" Logo" style={styles.container}>
                                    {this.state.textArray.map((text, index) => (
                                        <TextComponent
                                            textClicked={this.textClicked}
                                            index={index}
                                            key={index}
                                            text={text}
                                        // goToLogoCallback={this.props.goToLogoCallback}
                                        />
                                    ))}
                                    {
                                        this.state.imageArray.map((image, index) =>(
                                            <img key={index}  height={image.imageHeight +"px"} width={image.imageWidth +"px"}   id ={index} onClick = {(event) =>this.imageClicked(event, event.target.id)} src = {image.imageURL}  alt="Error"></img>
                                    
                                           ) )
                                    }

                                </div>
                            </div>
                           
                        </div>

                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;