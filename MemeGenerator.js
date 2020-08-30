import React from "react"

class MemeGenerator extends React.Component {
    //class constructor
    constructor() {
        super()
        this.state = {
            //top text of meme
            topText: "",
            //bottom text of meme
            bottomText: "",
            //random meme img
            randomImg: "http://i.imgflip.com/1bij.jpg",
            //array of meme imgs pulled from api
            allMemeImgs: []
        }
        //bindings for buttons that change state
        this.handleChange = this.handleChange.bind(this)
        this.gen = this.gen.bind(this)
    }
    

    //generates a new meme
    gen(event){

        //assigns the allMemeImgs state to an allMemes variable
        const allMemes = this.state.allMemeImgs
        //takes a random number from 0 to the array's length
        const i = Math.floor(Math.random() * allMemes.length)
        //sanity check
        console.log(this.state.allMemeImgs[i])
        //sets random meme img to the random img pulled
        this.setState(
            {
                randomImg: this.state.allMemeImgs[i].url
            }
        )
        event.preventDefault();
    }
    
    
    componentDidMount() {
        //on compnent mount, uses the fetch method to get the meme objects from api
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
    }
    
    handleChange(event) {
        //event so that text inputs read from state
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.gen}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    /> 
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    /> 
                
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator