import React, { Component } from "react";


class Input extends Component {
    state = {
        text:""
    };
    onChange(e){
        this.setState({text:e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        if (this.state.text===""){
            alert("Upišite neku poruku!");
            return;
        }
        this.setState({text: ""});
        this.props.posaljiPoruku(this.state.text);
    }
    render(){
        return (
            <div className="Input">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input 
                        onChange={e => this.onChange(e)}
                        value= {this.state.text}
                        type="text"
                        placeholder="Upiši poruku i pritisni ENTER"
                        autoFocus= {true}
                    />
                    <button>Pošalji</button>
                </form>
            </div>
        )
    }
}

export default Input;