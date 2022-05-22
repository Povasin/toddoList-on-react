class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSearch: "",
        };
    }
    handleChangeSearch = (event) => {
        this.setState({
            valueSearch: event.target.value,
        });
    };
    search = () => {
        return this.props.cards.filter((task) => (task.name.indexOf(this.state.valueSearch) != -1 ? true : false));
    };
    render() {
        return (
            <div className="menu">
                <input
                    type="text"
                    placeholder="что ищите?"
                    className="menu__search"
                    value={this.state.valueSearch}
                    onChange={this.handleChangeSearch}
                />
                <List
                    changeActiveCard={this.props.changeActiveCard}
                    cards={this.search()}
                    removeCard={this.props.removeCard}
                    redactionCards={this.props.redactionCards}
                    edit={this.props.edit}
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
                    className={`card ${item.active ? "card_active" : ""}`}
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
                        {this.props.edit && this.props.activeNumber == index ? (
                            <p className="card__functionRedaction" onClick={() => this.props.redactionCards()}>
                                сохр
                            </p>
                        ) : (
                            <p className="card__functionRedaction" onClick={() => this.props.redactionCards()}>
                                ред
                            </p>
                        )}
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
        if (!this.props.edit) {
            return (
                <div className="content">
                    <h1 className="content__name">{this.props.activeCard.name}</h1>
                    <p className="content__description">{this.props.activeCard.description}</p>
                </div>
            );
        } else {
            return (
                <div className="content">
                    <input value={this.props.activeCard.name} onChange={this.props.handleChangeEditName} />
                    <input
                        value={this.props.activeCard.description}
                        onChange={this.props.handleChangeEditdescription}
                    />
                </div>
            );
        }
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valuename: "",
            valuedescription: "",
        };
    }
    handleChangeName = (event) => {
        this.setState({
            valuename: event.target.value,
        });
    };
    handleChangeDescription = (event) => {
        this.setState({
            valuedescription: event.target.value,
        });
    };
    render() {
        return (
            <div className="notify">
                <p className="notify__close" onClick={() => this.props.showModal()}>
                    X
                </p>
                <input
                    type="text"
                    placeholder="название"
                    className="notify__name"
                    value={this.state.valuename}
                    onChange={this.handleChangeName}
                />
                <input
                    type="text"
                    placeholder="описание"
                    className="notify__description"
                    value={this.state.valuedescription}
                    onChange={this.handleChangeDescription}
                />
                <button
                    className="addBtn"
                    onClick={() => this.props.saveNewCard(this.state.valuename, this.state.valuedescription)}
                >
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
                    active: true,
                },
                {
                    name: "бобер",
                    description: "купить а потом помыть бобра",
                    active: false,
                },
                {
                    name: "мага",
                    description: "продать на рынке магу",
                    active: false,
                },
            ],
            activeCard: {
                name: "ботинок",
                description: "купить ботинок",
            },
            edit: false,
        };
    }
    saveNewCard = (valuename, valuedescription) => {
        let newCards = this.state.cards;
        newCards.push({
            name: valuename,
            description: valuedescription,
        });
        this.setState({
            cards: newCards,
            modal: !this.state.modal,
            valuename: "",
            valuedescription: "",
        });
    };
    handleChangeEditName = (event) => {
        for (let i = 0; i < this.state.cards.length; i++) {
            if (this.state.cards[i].name == this.state.activeCard.name) {
                const newCard = {
                    name: event.target.value,
                    description: this.state.activeCard.description,
                };
                let newMass = this.state.cards;
                newMass.splice(i, 1, newCard);
                this.setState({
                    activeCard: newCard,
                    cards: newMass,
                });
            }
        }
    };
    handleChangeEditdescription = (event) => {
        for (let i = 0; i < this.state.cards.length; i++) {
            if (this.state.cards[i].description == this.state.activeCard.description) {
                const newCard = {
                    name: this.state.activeCard.name,
                    description: event.target.value,
                };
                let newMass = this.state.cards;
                newMass.splice(i, 1, newCard);
                this.setState({
                    activeCard: newCard,
                    cards: newMass,
                });
            }
        }
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
        // получаешь новую активную карточку. Перезаписать весь cards с учётом новой карточки (то есть заменить где-то поле active на true)
        const newCards = this.state.cards.map(item=>{
            const active = item.name == card.name && item.description == card.description
                return {
                    name: item.name,
                    description: item.description,
                    active: active
                }
        })
        this.setState({
            cards: newCards,
            activeCard: card,
        });
    };
    
    showModal = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    redactionCards = () => {
        this.setState({
            edit: !this.state.edit,
        });
    };

    render() {
        return (
            <div className="app">
                <Menu
                    changeActiveCard={this.changeActiveCard}
                    cards={this.state.cards}
                    removeCard={this.removeCard}
                    redactionCards={this.redactionCards}
                    edit={this.state.edit}
                    showModal={this.showModal}
                />
                <Content
                    activeCard={this.state.activeCard}
                    edit={this.state.edit}
                    handleChangeEditName={this.handleChangeEditName}
                    handleChangeEditdescription={this.handleChangeEditdescription}
                    valueEditDescription={this.state.valueEditDescription}
                />
                {this.state.modal ? <Modal showModal={this.showModal} saveNewCard={this.saveNewCard} /> : null}
            </div>
        );
    }
}

const container = document.getElementById("root");
ReactDOM.render(<App />, container);
