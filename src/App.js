import { Component } from "react";
import Messages from "./Components/Messages";
import './App.css';
import Input from "./Components/Input";

const scaledroneID = "zWQAEnL3MhmScQtu";

function generirajKorisnika() {
  const ime = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega"];
  const index = Math.floor(Math.random() * ime.length % ime.length);
  return ime[index];
}

function generirajBoju() {
  const r = Math.floor(Math.random() * 1000 % 256),
  g = Math.floor(Math.random() * 1000 % 256),
  b = Math.floor(Math.random() * 1000 % 256);
  return "rgb(" + r + "," + g + "," + b +")";

}
class App extends Component{
  state = {
    messages: [],
    member: {
      username: generirajKorisnika(),
      color: generirajBoju()
    }
  };
  
  componentDidMount (){
    console.log("poziva se");
    this.initScaledrone();
  }
  initScaledrone(){
    this.drone = new window.Scaledrone(scaledroneID, {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }
  posaljiPoruku = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  };
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <h1>Algebra chat app</h1>
        </div>
        <Messages 
          poruke={this.state.messages}
          trenutniKorisnik={this.state.member}
        />
        <Input
          posaljiPoruku={this.posaljiPoruku}>
        </Input>
      </div>
    );
  }
}

export default App;