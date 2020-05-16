import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { parse } from 'graphql';
import {TextComponentCreate} from '../components/TextComponentCreate'
import {TextComponent} from '../components/TextComponent'
import { NewText } from './NewText';
const ADD_LOGO = gql`
    mutation AddLogo(
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
        addLogo(
            text: $text,
            color: $color,
            borderColor : $borderColor, 
            backgroundColor: $backgroundColor, 
            fontSize: $fontSize,
            borderRadius: $borderRadius, 
            borderWidth : $borderWidth, 
            padding : $padding,
            margin : $margin
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
            textArray : [new NewText()], 
            currentText : 0, 
            numTexts : 1,
            update: false
        }


    }
    componentDidMount = () => {
        let array =[];
        array.push(new NewText());
        this.setState({textArray:array});
      //  this.state.textArray.push(new NewText());
    }
    updateText = (event) => {
        this.setState({ textInput: event.target.value })
        console.log(" the value of the text is : " + event.target.value)
    }
    ColorChange = (event) => {
        this.setState({ textColor: event.target.value })
    }
    BackgroundColorChange = (event) => {
        this.setState({ backgroundColor: event.target.value })
    }
    BorderColorChange = (event) => {
        this.setState({ borderColor: event.target.value })
    }
    fontSizeChange = (event) => {
        console.log("old object is :")
        console.log( this.state.textArray[this.state.currentText]);
       // console.log(event.target.value)
        this.setState({update:true});
        this.state.textArray[this.state.currentText].fontSize = event.target.value;
        console.log("new object is :")
        console.log( this.state.textArray[this.state.currentText]);
        this.setState({update:false});
        
    }
    borderRadiusChange = (event) => {
        this.setState({ borderRadius: event.target.value })
    }
    borderWidthChange = (event) => {
        this.setState({ borderWidth: event.target.value })
    }
  
    checkInput = () => {
        // this is where i can check the input of the text !!!!!!!!!!!!!!!!!!
        var values = ["text", "Font Size", "Border Width", "Border Radius", "padding", "margin"];
        let logo_name = document.forms["panel_form"].elements["text"].value
        
        if(logo_name.trim().length === 0){
            alert("Cannot have blank logo names");
            return false;
        }
        for(let i =0; i < values.length; i++){
           var  content = document.forms["panel_form"].elements[values[i]].value;
           if(content === ""){
               alert(values[i] + " is empty");
               return false;
           }
        }
        return true;
    }
    textClicked= (index)=>{
        // 
        this.setState({currentText:index}, ()=> {
            console.log(this.state.currentText +" is the text we looking at ");
            this.render();
        })
     //   console.log(this.state.currentText +" is the text we looking at ");
       // this.setState(); // idk about this?
    }
    addNewText =()=>{
        let copyArray = this.state.textArray;
        copyArray.push(new NewText());
        this.setState({textArray:copyArray, numTexts:this.state.numTexts + 1});
    }
    render() {


        let text, color, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, fontSize;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <nav className="nav-bar">
                            <div className="nav-wrapper">
                                <div className="panel-heading">
                                    <h4><Link style ={{color:"black"}}to="/">Home</Link></h4>

                                    <button onClick={()=> this.addNewText()} className="btn btn-primary"> ADD NEW TEXT </button>

                                </div>
                            </div>
                        </nav>

                        <div className="parent" style={{ display: "flex" }}>
                            <div className="panel-body">
                                <form name="panel_form" onSubmit={e => {
                                //     e.preventDefault();
                                //     if(this.checkInput()){
                                //         // addLogo({
                                //         //     variables: {
                                //         //         text: this.state.textInput, color: this.state.textColor, backgroundColor: this.state.backgroundColor,
                                //         //         borderColor: this.state.borderColor, fontSize: parseInt(this.state.fontSize), borderRadius: parseInt(this.state.borderRadius),
                                //         //         borderWidth: parseInt(this.state.borderWidth)
                                //         //     }
                                //         // });
                                    
                                   
                                //     text.value = "";
                                //     color.value = "";
                                //     backgroundColor.value = "";
                                //     borderColor.value = "";
                                //     fontSize.value = "";
                                //     borderWidth.value = "";
                                //     borderRadius.value = "";
                                //     padding.value = "";
                                //     margin.value = "";
                                // }
                            }}>
                                    <div className="card red darken" style={{ backgroundColor: "red" }}>
                                        <div >
                                            <h3 className="panel-title" style={{textAlign:"center"}}>
                                                Create Logo
                                            </h3>
                                        </div>
                                        <div className="form-group" >
                                            <label htmlFor="text">Text:</label>
                                            <input  style={{width:"max-content"}}type="text" className="form-control" name="text" ref={node => {
                                                text = node;
                                            }} defaultValue={this.state.textArray[this.state.currentText].text} onChange={this.updateText} />
                                        </div>
                                        <div className="form-group">
                                            <label className="colorInputLabel" htmlFor="color">Color:</label>
                                            <input type="color" className="color_input" name="color" ref={node => {
                                                color = node;
                                            }} placeholder={this.state.textArray[this.state.currentText].color} onChange={this.ColorChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="colorInputLabel" htmlFor="color">Background Color:</label>
                                            <input type="color" className="color_input" name="backgroundColor" ref={node => {
                                                backgroundColor = node;
                                            }} placeholder={this.state.textArray[this.state.currentText].backgroundColor} onChange={this.BackgroundColorChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="colorInputLabel" htmlFor="color">Border Color:</label>
                                            <input type="color" className="color_input" name="borderColor" ref={node => {
                                                borderColor = node;
                                            }} placeholder={this.state.textArray[this.state.currentText].borderColor} onChange={this.BorderColorChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="fontSize">Font Size:</label>
                                            <input min="4" max="150" type="number" className="input_sliders" name="Font Size" ref={node => {
                                                fontSize = node;
                                            }} defaultValue={this.state.textArray[this.state.currentText].fontSize} onChange={this.fontSizeChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="borderWidth">Border Width:</label>
                                            <input min="0" max="250" type="number" className="input_sliders" name="Border Width" ref={node => {
                                                borderWidth = node;
                                            }} defaultValue={this.state.textArray[this.state.currentText].fontSize} onChange={this.borderWidthChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="borderRadius">Border Radius:</label>
                                            <input min="0" max="400" type="number" className="input_sliders" name="Border Radius" ref={node => {
                                                borderRadius = node;
                                            }} defaultValue={this.state.textArray[this.state.currentText].fontSize} onChange={this.borderRadiusChange} />
                                        </div>
                                       
                                        <button   type="submit" className="btn btn-success">Submit</button>
                                    </div>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again </p>}
                            </div>
                            <div className="workspace">
                               <div className=" Logo" >
                            {this.state.textArray.map((text, index)=>(
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

                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;