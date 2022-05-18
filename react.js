class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="menu">
                <input
                    type="text"
                    placeholder="что ищите?"
                    className="menu__search"
                    value={this.props.valueSearch}
                    onChange={this.props.handleChangeSearch}
                />
                <List
                    changeActiveCard={this.props.changeActiveCard}
                    cards={this.props.cards}
                    removeCard={this.props.removeCard}
                    activeNumber={this.props.activeNumber}
                />
                <p id="add" onClick={() => this.props.showModal()}>
                    +
                </p>
            </div>
        );
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteCard = (index, item) => {
        this.props.removeCard(index, item);
    };

    render() {
        const items = this.props.cards.map((item, index) => {
            return (
                <div
                    className={`card ${
                        this.props.activeNumber == index ? "card_active" : ""
                    }`}
                    key={item.name}
                    onClick={() => this.props.changeActiveCard(item)}
                >
                    <p className="card__name">{item.name}</p>
                    <p className="card__description">{item.description}</p>
                    <div className="card__functions">
                        <p
                            className="card__functionDelete"
                            onClick={(e) => {
                                e.stopPropagation();
                                this.deleteCard(index, item);
                            }}
                        >
                            X
                        </p>
                        <p className="card__functionRedaction">ред</p>
                    </div>
                </div>
            );
        });
        return <div>{items}</div>;
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="content">
                <h1 className="content__name">{this.props.activeCard.name}</h1>
                <p className="content__description">
                    {this.props.activeCard.description}
                </p>
            </div>
        );
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="notify">
                <p
                    className="notify__close"
                    onClick={() => this.props.showModal()}
                >
                    X
                </p>
                <input
                    type="text"
                    placeholder="название"
                    className="notify__name"
                    value={this.props.valuename}
                    onChange={this.props.handleChangeName}
                />
                <input
                    type="text"
                    placeholder="описание"
                    className="notify__description"
                    value={this.props.valuedescription}
                    onChange={this.props.handleChangeDescription}
                />
                <button className="addBtn" onClick={this.props.saveNewCard}>
                    {" "}
                    сохранить{" "}
                </button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                {
                    name: "ботинок",
                    description: "купить ботинок",
                },
                {
                    name: "бобер",
                    description: "купить а потом помыть бобра",
                },
                {
                    name: "мага",
                    description: "продать на рынке магу",
                },
            ],
            activeCard: {
                name: "ботинок",
                description: "купить ботинок",
            },
            modal: false,
            valuename: "",
            valuedescription: "",
            valueSearch: "",
        };
    }
    handleChangeName = (event) => {
        this.setState({
            valuename: event.target.value,
        });
    };
    handleChangeSearch = (event) => {
        this.setState({
            valueSearch: event.target.value,
        });
    };

    handleChangeDescription = (event) => {
        this.setState({
            valuedescription: event.target.value,
        });
    };
    removeCard = (index, item) => {
        let removeCards = this.state.cards;
        removeCards.splice(index, 1);
        this.setState({
            cards: removeCards,
        });
        if (this.state.activeCard == item) {
            this.setState({
                activeCard: this.state.cards[0],
            });
        }
    };

    changeActiveCard = (card) => {
        this.setState({
            activeCard: card,
        });
    };
    search = () => {
        return this.state.cards.filter((task) =>
            task.name.indexOf(this.state.valueSearch) != -1 ? true : false
        );
    };
    showModal = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };
    saveNewCard = () => {
        let newCards = this.state.cards;
        newCards.push({
            name: this.state.valuename,
            description: this.state.valuedescription,
        });
        this.setState({
            cards: newCards,
            modal: !this.state.modal,
            valuename: "",
            valuedescription: "",
        });
    };

    getActiveNumber = () => {
        for (let i = 0; i < this.state.cards.length; i++) {
            if (
                this.state.cards[i].name == this.state.activeCard.name &&
                this.state.cards[i].description ==
                    this.state.activeCard.description
            ) {
                return i;
            }
        }
    };

    render() {
        return (
            <div className="app">
                <Menu
                    changeActiveCard={this.changeActiveCard}
                    showModal={this.showModal}
                    cards={this.search()}
                    removeCard={this.removeCard}
                    activeNumber={this.getActiveNumber()}
                    handleChangeSearch={this.handleChangeSearch}
                    valueSearch={this.state.valueSearch}
                />
                <Content activeCard={this.state.activeCard} />
                {this.state.modal ? (
                    <Modal
                        showModal={this.showModal}
                        saveNewCard={this.saveNewCard}
                        valuename={this.state.valuename}
                        valuedescription={this.state.valuedescription}
                        handleChangeName={this.handleChangeName}
                        handleChangeDescription={this.handleChangeDescription}
                    />
                ) : null}
            </div>
        );
    }
}

const container = document.getElementById("root");
ReactDOM.render(<App />, container);
