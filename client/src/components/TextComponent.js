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
       
            index : this.props.index
        }
    }

    TextClicked =(e)=>{
           console.log(this.state.text);
            this.props.textClicked(this.state.index);
    }
  
     
    render() {
        const styles = {
            container: {
                color: this.props.text.color,
                fontSize: this.props.text.fontSize + "pt",
            
    

            }
        }
     
            
        return (
            <pre onClick= {()=> this.TextClicked()}
                className='text' style={styles.container}                
              
            >
               {this.props.text.text} 
            </pre>
        )
    }
}

export default TextComponent