import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            borderColor
            backgroundColor
            fontSize
            borderRadius
            borderWidth
            padding
            margin
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
            textColor: null,
            fontSize: null,
            backgroundColor: null,
            borderColor: null,
            borderRadius: null,
            borderWidth: null,
            padding: null,
            margin: null,
            textInput: null
        }


    }

    ColorChange = (event) => {
        this.setState({ textColor: event.target.value })
    }
    updateText = (event) => {
        this.setState({ textInput: event.target.value })
        console.log(" the value of the text is : " + event.target.value)
    }
    BackgroundColorChange = (event) => {
        this.setState({ backgroundColor: event.target.value })
    }
    BorderColorChange = (event) => {
        this.setState({ borderColor: event.target.value })
    }
    fontSizeChange = (event) => {
        console.log(event.target.value)
        this.setState({ fontSize: event.target.value })
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

    checkInputs = ()=>{
        var values = ["text", "Font Size", "Border Radius", "Border Width", "padding", "margin"];
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
    render() {
        const styles = {
            container:

            {
                color: this.state.textColor,
                fontSize: this.state.fontSize + "pt",
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius + "px",
                borderWidth: this.state.borderWidth + "px",
                padding: this.state.padding + "px",
                margin: this.state.margin + "px",
                borderStyle: "solid"

            }

        }




        let text, color, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, fontSize;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (this.state.textInput === null) {
                       // console.log(data.logo.text + " is the name")
                        this.setState({
                            textInput: data.logo.text, textColor: data.logo.color,
                            fontSize: data.logo.fontSize,
                            backgroundColor: data.logo.backgroundColor,
                            borderColor: data.logo.borderColor,
                            borderRadius: data.logo.borderRadius,
                            borderWidth: data.logo.borderWidth,
                            padding: data.logo.padding,
                            margin: data.logo.margin
                        })
                    };
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
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
                                            <form name = "panel_form" onSubmit={e => {
                                                e.preventDefault();
                                                if(this.checkInputs()){
                                                updateLogo({
                                                    variables: {
                                                        id: data.logo._id, text: this.state.textInput, color: this.state.textColor, backgroundColor: this.state.backgroundColor,
                                                        borderColor: this.state.borderColor, fontSize: parseInt(this.state.fontSize), borderRadius: parseInt(this.state.borderRadius),
                                                        borderWidth: parseInt(this.state.borderWidth), padding: parseInt(this.state.padding), margin: parseInt(this.state.margin)
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
                                            }}}>
                                                <div className="card red darken" style={{ backgroundColor: "red" }}>
                                                    <div >
                                                        <h3 className="panel-title" style={{textAlign:"center"}}>
                                                            Edit Logo
                                                          </h3>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="text">Text:</label>
                                                        <input style={{width:"max-content"}}  type="text" className="form-control" name="text" ref={node => {
                                                            text = node;
                                                        }} defaultValue={this.state.textInput} onChange={this.updateText} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="colorInputLabel" htmlFor="color">Color:</label>
                                                        <input type="color" className="color_input" name="color" ref={node => {
                                                            color = node;
                                                        }} placeholder="Color" defaultValue={data.logo.color} onChange={this.ColorChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="colorInputLabel" htmlFor="color">backgroundColor:</label>
                                                        <input type="color" className="color_input" name="backgroundColor" ref={node => {
                                                            backgroundColor = node;
                                                        }} placeholder="background Color" defaultValue={data.logo.backgroundColor} onChange={this.BackgroundColorChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="colorInputLabel" htmlFor="color">Border Color:</label>
                                                        <input type="color" className="color_input" name="borderColor" ref={node => {
                                                            borderColor = node;
                                                        }}  defaultValue={data.logo.borderColor} onChange={this.BorderColorChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label   className="sliders_lables" htmlFor="fontSize">Font Size:</label>
                                                        <input  min="4" max="150" type="number" className="input_sliders" name="Font Size" ref={node => {
                                                            fontSize = node;
                                                        }}  defaultValue={data.logo.fontSize} onChange={this.fontSizeChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label  className="sliders_lables" htmlFor="borderWidth">Border Width:</label>
                                                        <input  min="0" max="250" type="number" className="input_sliders" name="Border Width" ref={node => {
                                                            borderWidth = node;
                                                        }} defaultValue={data.logo.borderWidth} onChange={this.borderWidthChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label  className="sliders_lables" htmlFor="borderRadius">Border Radius:</label>
                                                        <input  min="0" max="250" type="number" className="input_sliders" name="Border Radius" ref={node => {
                                                            borderRadius = node;
                                                        }} defaultValue={data.logo.borderRadius} onChange={this.borderRadiusChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label  className="sliders_lables" htmlFor="padding">Padding:</label>
                                                        <input min="0" max="250" type="number" className="input_sliders" name="padding" ref={node => {
                                                            padding = node;
                                                        }} defaultValue={data.logo.padding} onChange={this.paddingChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label   className="sliders_lables" htmlFor="margin">Margin:</label>
                                                        <input min="0" max="250" type="number" className="input_sliders" name="margin" ref={node => {
                                                            margin = node;
                                                        }} defaultValue={data.logo.margin} onChange={this.MarginChange} />
                                                    </div>
                                                    <button type="submit" className="btn btn-success">Submit</button>
                                                </div>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                        <div className="workspace">

                                            <pre
                                                className="logo" style={styles.container}
                                            >

                                                {this.state.textInput}
                                            </pre>

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