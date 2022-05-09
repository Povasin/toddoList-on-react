class Menu extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            // Здесь должна быть и полоска поиска карточек, а не в List. В List передавай массив, чтобы он уже в свою очередь сгенерировал карточки
            <div className="list">
                <List/>
            </div>
        )
    }
}

class List extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div >
            {/* Перенести input в Menu */}
            <input type={"text"} placeholder={"что ищите?"} className="search"/>
            {/* Генерация карточек должна быть через .map() */}
            <div className="card">
                <p className="name">Название</p>
                <p className="description">Описание</p>
                <div className="function">
                    <p className="delete">X</p>
                    <p className="redaction">ред</p>
                </div>
            </div>
            <p className="add" onClick={()=>this.props.add()}>+</p>
        </div>
        )
    }
}

class Content extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            // Для отображения инфы надо использовать пропсы, которые ты передашь из родительского компонента
            <div className="content">
                <p className="nameContent">Название</p>
                <p className="descriptionContent">Описание</p>
            </div>
        )   
    }
}
// 
// 
// Убрать огромную дырку между классами
// 
class App extends React.Component{
    constructor(props){
        super(props)
        // состояние не прокатит такое, так как тебе надо где-то хранить все карточки, а тут только одна. Как вариант сделай два поля: массив из всех карточек внутри которого будут объекты (name, description), а также поле activeCard, который является объектом для передачи его в Content
        this.state = {
            nameCard: [""],
            descriptionCard: [""],
        }
    }
    // неправильно объявил метод
    add(){
        return(
            <div className="notify">
                {/* Фигурные скобки не нужны для фиксированных строк (type и placeholder) */}
                <input type={text} placeholder={"название"} className="addName"/>
                <input type={text} placeholder={"описание"} className="addDes"/>
                <button className="addBtn">сохранить</button>
            </div>
        )
    }

    render(){
        return(
            <div className="app">
                {/* В меню передавать весь массив из карточек */}
                <Menu card={this.add}/>
                {/* в контент передавай активную карточку для её отображения */}
                <Content/>
            </div>
        )
    }
}

const container = document.getElementById("root")
ReactDOM.render(<App/>, container);
