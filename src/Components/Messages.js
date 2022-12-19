import React, { Component } from "react";

class Messages extends Component {
    render(){
        const {poruke}= this.props;
        return(
            <ul className="Messages-list">
                {poruke.map((p, index) => this.prikaziPoruku(p, index))}
            </ul>
        );
    }
    prikaziPoruku(poruka, index){
        const {member, text} = poruka;
        const {trenutniKorisnik} = this.props;
        const mojaPoruka = member.id === trenutniKorisnik.id && member.id !== undefined;
        const nazivKlase = mojaPoruka ?
        "Messages-message currentMember" : "Messages-message"; 
        return(
            <li key={index} className={nazivKlase}>
                <span
                    className="avatar"
                    style={{backgroundColor: member.clientData.color}}>

                </span>
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className="text">
                        {text}
                    </div>
                </div>
            </li>
        )
    }
}

export default Messages;