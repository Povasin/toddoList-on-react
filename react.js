class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="menu">
                <input type="text" placeholder="что ищите?" className="menu__search" />
                <List changeActiveCard={this.props.changeActiveCard} cards={this.props.cards} />
                <p id="add" onClick={() => this.props.addModal()}>+</p>
            </div>
        )
    }
}

class List extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let items = this.props.cards.map((item) => {
            return(
            <div className="card" key={item.name} onClick={()=>this.props.changeActiveCard(item)}>
                <p className="card__name">{item.name}</p>
                <p className="card__description">{item.description}</p>
                <div className="card__functions">
                    <p className="card__functionDelete">X</p>
                    <p className="card__functionRedaction">ред</p>
                </div>
            </div>
            )
        })
        return (
            <div>
                {items}
            </div>
        )
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="content">
                <h1 className="content__name">{this.props.activeCard.name}</h1>
                <p className="content__description">{this.props.activeCard.description}</p>
            </div>
        )
    }
}

class Modal extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="notify">
                <p className="notify__close" onClick={()=>this.props.closeModal()}>X</p>
                <input type="text" placeholder="название" className="notify__name" />
                <input type="text" placeholder="описание" className="notify__description" />
                <button className="addBtn">сохранить</button>
            </div>
        )
   }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [
                {
                    name: "ботинок",
                    description: "купить ботинок"
                },
                {
                    name: "бобер",
                    description: "купить а потом помыть бобра"
                },
                {
                    name: "мага",
                    description: "продать на рынке магу"
                },
            ],
            activeCard: {
                name: "ботинок",
                description: "купить ботинок",
            },
            modal: false
        }
    }

    changeActiveCard = (card)=>{
        this.setState({
            activeCard: card
        })
    }
    
    addModal=()=> {
        if (!this.state.modal) {
            this.setState({
                modal: true,
            })
        }
    }
    saveNewCard = ()=>{
        let newCards = this.state.cards;
        newCards.push({})
        this.setState({cards: newCards})
    }
    closeModal=()=>{
        if (this.state.modal) {
            this.setState({
                modal: false
            })
        }
    }
    
    render() {
        return (
            <div className="app">
                <Menu changeActiveCard={this.changeActiveCard} addModal={this.addModal} cards={this.state.cards} />
                <Content activeCard={this.state.activeCard}/>
                {this.state.modal ? <Modal closeModal={this.closeModal}/> : null}
            </div>
        )
    }
}

const container = document.getElementById("root")
ReactDOM.render(<App />, container);
