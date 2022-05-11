class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="menu">
                <input type="text" placeholder="что ищите?" className="menu__search" />
                <List changeActiveCard={this.props.changeActiveCard} menu__card={this.props.App__card} />
                <p id="add" onClick={() => this.props.card()}>+</p>
            </div>
        )
    }
}

class List extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let list__card = this.props.menu__card.map((item) => {
            return(
            <div className="card" key={item.cardName} onClick={()=>this.props.changeActiveCard(item)}>
                <p className="card__name" key={item.cardName}>{item.cardName}</p>
                <p className="card__description" key={item.carddescription}>{item.carddescription}</p>
                <div className="card__function">
                    <p className="card__function__delete">X</p>
                    <p className="card__function__redaction">ред</p>
                </div>
            </div>
            )
        })
        return (
            <div>
                {list__card}
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
            // Для отображения инфы надо использовать пропсы, которые ты передашь из родительского компонента
            <div className="content">
                <h1>{this.props.activeCard.cardName}</h1>
                <p>{this.props.activeCard.carddescription}</p>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        // состояние не прокатит такое, так как тебе надо где-то хранить все карточки, а тут только одна. Как вариант сделай два поля: массив из всех карточек внутри которого будут объекты (name, description), а также поле activeCard, который является объектом для передачи его в Content
        this.state = {
            cards: [
                {
                    cardName: "ботинок",
                    carddescription: "купить ботинок"
                },
                {
                    cardName: "бобер",
                    carddescription: "купить а потом помыть бобра"
                },
                {
                    cardName: "мага",
                    carddescription: "продать на рынке магу"
                },
            ],
            activeCard: {
                cardName: "ботинок",
                carddescription: "купить ботинок",
            },
            modal: false
        }
    }

    changeActiveCard = (card)=>{
        this.setState({
            activeCard: card
        })
    }
    
    // addCard=()=> {
    //     if (!this.state.modal) {
    //         this.setState({
    //             modal: true
    //         })
    //         return (
    //         <div className="notify">
    //             <p className="notify__close" onClick={()=>closeCard()}>X</p>
    //             <input type="text" placeholder="название" className="notify__name" />
    //             <input type="text" placeholder="описание" className="notify__description" />
    //             <button className="addBtn">сохранить</button>
    //         </div>
    //         )
    //     }

    // }
    // closeCard=()=>{
    //     if (this.state.modal) {
    //         this.setState({
    //             modal: true
    //         })
    //         return (
    //             <div className="notify false">
    //                 <p className="notify__close">X</p>
    //                 <input type="text" placeholder="название" className="notify__name" />
    //                 <input type="text" placeholder="описание" className="notify__description" />
    //                 <button className="addBtn">сохранить</button>
    //             </div>
    //             )
    //     }
    // }
    render() {
        return (
            <div className="app">
                <Menu changeActiveCard={this.changeActiveCard} card={this.addCard} App__card={this.state.cards} />
                {/* в контент передавай активную карточку для её отображения */}
                <Content activeCard={this.state.activeCard}/>
            </div>
        )
    }
}

const container = document.getElementById("root")
ReactDOM.render(<App />, container);
