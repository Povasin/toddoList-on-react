class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="menu">
                <input type="text" placeholder="что ищите?" className="menu__search" />
                <List changeActiveCard={this.props.changeActiveCard} cards={this.props.cards} removeCard={this.props.removeCard} />
                <p id="add" onClick={() => this.props.showModal()}>+</p>
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
                    <p className="card__functionDelete" onClick={()=>this.props.removeCard(item)}>X</p>
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
                <p className="notify__close" onClick={()=>this.props.showModal()}>X</p>
                <input type="text" placeholder="название" className="notify__name" valuename={this.props.valuename} onChange={this.props.handleChange} />
                <input type="text" placeholder="описание" className="notify__description" valuedescription={this.props.valuedescription} onChange={this.props.handleChange} />
                <button className="addBtn" onClick={()=>this.props.saveNewCard}>сохранить</button>
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
            modal: false,
            valuename: '',
            valuedescription: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveNewCard = this.saveNewCard.bind(this);
    }
    handleChange(event) {
        this.setState({
            valuename: event.target.valuename,
            valuedescription: event.target.valuedescription
        });
      }
      // удаление
      //удаляет всегда первую карточку как решить
    removeCard=(item)=>{
        let removeCards = this.state.cards
        removeCards.splice(item, 1)
        this.setState({
            cards: removeCards
        }) 
        console.log(removeCards);
    }

    changeActiveCard = (card)=>{
        this.setState({
            activeCard: card
        })
    }
    
    showModal=()=> {
        if (!this.state.modal) {
            this.setState({
                modal: true,
            })
        } else if (this.state.modal) {
            this.setState({
                modal: false
            })
        }
    }
    // добавление 
    // почему не работает? не готовое решение а обьеснить
    saveNewCard(event){
        let newCards = this.state.cards;
        newCards.push({
            name: this.state.valuename ,
            description: this.state.valuedescription
        })
        this.setState({cards: newCards})
        event.preventDefault();
    }
    
    render() {
        return (
            <div className="app">
                <Menu changeActiveCard={this.changeActiveCard} showModal={this.showModal} cards={this.state.cards} removeCard={this.removeCard} />
                <Content activeCard={this.state.activeCard}/>
                {this.state.modal ? <Modal showModal={this.showModal} saveNewCard={this.saveNewCard} valuename={this.state.valuename} valuedescription={this.state.valuedescription} handleChange={this.handleChange}/> : null}
            </div>
        )
    }
}

const container = document.getElementById("root")
ReactDOM.render(<App />, container);
