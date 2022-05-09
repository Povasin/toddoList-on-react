class Menu extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
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
            <input type={"text"} placeholder={"что ищите?"} className="search"/>
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
            <div className="content">
                <p className="nameContent">Название</p>
                <p className="descriptionContent">Описание</p>
            </div>
        )   
    }
}




class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nameCard: [""],
            descriptionCard: [""],
        }
    }
    add(){
        return(
            <div className="notify">
                <input type={text} placeholder={"название"} className="addName"/>
                <input type={text} placeholder={"описание"} className="addDes"/>
                <button className="addBtn">сохранить</button>
            </div>
        )
    }

    render(){
        return(
            <div className="app">
                <Menu card={this.add}/>
                <Content/>
            </div>
        )
    }
}

const container = document.getElementById("root")
ReactDOM.render(<App/>, container);
