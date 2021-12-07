import { Component } from "react";
import axios from 'axios'
import './Game.css'
import Card from "./Card";

class Game extends Component{
    state = {
        deckId:'',
        drawn:[]
    }
    drawCard = async ()=>{
        // make a request for a card
        const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`)
        if(resp.data.remaining===0) alert('No card remaining')
        else {
            const card = resp.data.cards[0]
            this.setState({drawn: [...this.state.drawn, card]})
        }
    }
    showCards(){
        return this.state.drawn.map(c=> <Card key={c.code} image={c.images.png} alt={c.code}/>)
    }
    render() {
        return (
            <div>
                <button onClick={this.drawCard}>GIMEE A CARD</button>
                <div className='Game-cards'>
                    {this.showCards()}
                </div>
            </div>
        )
    }
    async componentDidMount(){
        // make a request for a new deck
        const resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
        const deckId = resp.data.deck_id
        this.setState({deckId: deckId})
    }
}

export default Game