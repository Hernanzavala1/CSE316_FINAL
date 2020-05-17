import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { parse } from 'graphql';
import { TextComponentCreate } from '../components/TextComponentCreate'
import { TextComponent } from '../components/TextComponent'
import { NewText } from './NewText';
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
            currentText: 0,
            numTexts: 1,
            update: false,
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
    checkInput = () => {
        // this is where i can check the input of the text !!!!!!!!!!!!!!!!!!
        var values = ["text", "Font Size", "Border Width", "Border Radius", "padding", "margin"];
        let logo_name = document.forms["panel_form"].elements["text"].value

        if (logo_name.trim().length === 0) {
            alert("Cannot have blank logo names");
            return false;
        }
        for (let i = 0; i < values.length; i++) {
            var content = document.forms["panel_form"].elements[values[i]].value;
            if (content === "") {
                alert(values[i] + " is empty");
                return false;
            }
        }
        return true;
    }
    LogoClicked = () => {
        document.getElementById("ColorInp").disabled = true;
        document.getElementById("textFontSize").disabled = true;
        document.getElementById("TextInp").disabled = true;
        // enable logo properties 
        document.getElementById("BackgroundColor").disabled = false;
        document.getElementById("BorderColor").disabled = false;
        document.getElementById("BorderRadius").disabled = false;
        document.getElementById("BorderWidth").disabled = false;
        document.getElementById("LogoHeight").disabled = false;
        document.getElementById("LogoWidth").disabled = false;
        document.getElementById("paddingInp").disabled = false;
        document.getElementById("marginInp").disabled = false;

    }
    textClicked = (index) => {
        // 

        this.setState({ currentText: index }, () => {
            console.log(this.state.currentText + " is the text we looking at ");
            document.getElementById("TextInp").disabled = false;
            document.getElementById("ColorInp").disabled = false;
            document.getElementById("textFontSize").disabled = false;
            // re populate the values in the inputs with the correct ones
            document.getElementById("TextInp").value = this.state.textArray[this.state.currentText].text;
            document.getElementById("textFontSize").value = this.state.textArray[this.state.currentText].fontSize;
            document.getElementById("ColorInp").value = this.state.textArray[this.state.currentText].color;
            // disable properties for the logo itself
            document.getElementById("BackgroundColor").disabled = true;
            document.getElementById("BorderColor").disabled = true;
            document.getElementById("BorderRadius").disabled = true;
            document.getElementById("BorderWidth").disabled = true;
            document.getElementById("LogoHeight").disabled = true;
            document.getElementById("LogoWidth").disabled = true;
            document.getElementById("paddingInp").disabled = true;
            document.getElementById("marginInp").disabled = true;
            this.render();
        })
        //   console.log(this.state.currentText +" is the text we looking at ");
        // this.setState(); // idk about this?
    }
    deleteText = () => {
        let copyArray = [];
        Object.assign(copyArray, this.state.textArray);
        copyArray.splice(this.state.currentText, 1);
        this.setState({ textArray: copyArray, numTexts: this.state.numTexts - 1 }, () => {
            this.render();
        });
    }
    addNewText = () => {
        let copyArray = this.state.textArray;
        copyArray.push(new NewText());
        this.setState({ textArray: copyArray, numTexts: this.state.numTexts + 1 });
    }
    switchTabs =(evt) => {
        console.log("we clicking")
        console.log(evt.target.name);
        // var i, tabcontent, tablinks;
        // tabcontent = document.getElementsByClassName("tabcontent");
        // for (i = 0; i < tabcontent.length; i++) {
        //   tabcontent[i].style.display = "none";
        // }
        // tablinks = document.getElementsByClassName("tablinks");
        // for (i = 0; i < tablinks.length; i++) {
        //   tablinks[i].className = tablinks[i].className.replace(" active", "");
        // }
        // document.getElementById(cityName).style.display = "block";
        // evt.currentTarget.className += " active";
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
            <Mutation mutation={UserAddLogo} onCompleted={() => this.props.history.push('/')}>
                {(UserAddLogo, { loading, error }) => (
                    <div className="container">
                        <nav className="nav-bar">
                            <div className="nav-wrapper">
                                <div className="panel-heading">
                                    <h4><Link style={{ color: "black" }} to="/">Home</Link></h4>
                                    <div >
                                            <button onClick={() => this.addNewText()} className="btn btn-primary"> ADD NEW TEXT </button>
                                            <button onClick={() => this.deleteText()} className="btn btn-primary"> Delete Text </button>
                                        </div>
                                </div>
                            </div>
                        </nav>

                        <div className="parent" style={{ display: "flex" }}>

                            <div className="panel-body">
                                <div class="tab">
                                    <button name="Logo" class="tablinks" onclick={(e) => this.switchTabs}>Logo</button>
                                    <button name ="Image" class="tablinks" onclick={(e) => this.switchTabs}>Image</button>
                        
                                </div>
                                <form style={{ display: "none" }} id="panel_form_image ">
                                    <div className="card red darken" style={{ backgroundColor: "red" }}>

                                        <div >
                                            <h3 className="panel-title" style={{ textAlign: "center" }}>
                                                Create Logo
                                            </h3>
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
                                            }} placeholder={this.state.backgroundColor} onChange={this.BackgroundColorChange} />
                                        </div>
                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </div>
                                </form>
                                <form name="panel_form" id="panel_form" onSubmit={e => {
                                    e.preventDefault();
                                    let copyArr = [];
                                    this.state.textArray.map((text) => {
                                        copyArr.push({ color: text.color, fontSize: parseInt(text.fontSize), text: text.text })
                                    });
                                    UserAddLogo({
                                        variables: {
                                            userId: this.props.match.params.id,
                                            TextsArray: copyArr,
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
                                            <button onClick={() => this.addNewText()} className="btn btn-primary"> ADD NEW TEXT </button>
                                            <button onClick={() => this.deleteText()} className="btn btn-primary"> Delete Text </button>
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
                                            }} placeholder={this.state.backgroundColor} onChange={this.BackgroundColorChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="colorInputLabel" htmlFor="color">Border Color:</label>
                                            <input id="BorderColor" type="color" className="color_input" name="borderColor" ref={node => {
                                                borderColor = node;
                                            }} placeholder={this.state.borderColor} onChange={this.BorderColorChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="fontSize">Width:</label>
                                            <input id="LogoWidth" min="4" max="700" type="number" className="input_sliders" name="width" ref={node => {
                                                fontSize = node;
                                            }} defaultValue={this.state.width} onChange={this.widthChange} />
                                        </div>
                                        <div className="form-group">
                                            <label className="sliders_lables" htmlFor="fontSize">Height:</label>
                                            <input id="LogoHeight" min="4" max="150" type="number" className="input_sliders" name="height" ref={node => {
                                                fontSize = node;
                                            }} value={this.state.height} onChange={this.heightChange} />
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