// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

export class TextComponent extends Component {
    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        this.state = {
            // textColor: this.props.text.textColor,
            // fontSize: this.props.logo.fontSize,
            // backgroundColor: this.props.logo.backgroundColor,
            // borderColor: this.props.logo.borderColor,
            // borderRadius: this.props.logo.borderRadius,
            // borderWidth: this.props.logo.borderWidth,
            // tempString: "",
            // textInput: this.props.logo.text
            text : this.props.text.text,
            index : this.props.index
        }
    }

    TextClicked =(e)=>{
           
            this.props.textClicked(this.state.index);
    }
  
     
    render() {
        const styles = {
            container: {
                color: this.props.text.color,
                fontSize: this.props.text.fontSize + "pt",
                // backgroundColor: this.props.text.backgroundColor,
                // borderColor: this.props.text.borderColor,
                // borderRadius: this.props.text.borderRadius + "px",
                // borderWidth: this.props.text.borderWidth + "px",
                // borderStyle: "solid",
    

            }
        }
     
            
        return (
            <pre onClick= {()=> this.TextClicked()}
                className='text' style={styles.container}                
              
            >
               {this.state.text} 
            </pre>
        )
    }
}

export default TextComponent