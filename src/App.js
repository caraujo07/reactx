import React, { Component } from 'react';
import './App.css';
// import UserInput from './UserInput/UserInput';
// import UserOutput from './UserOutput/UserOutput';
import Person from './Person/Person';

class App extends Component {

  // state = {
  //   username: 'caraujo'
  // }

  // userNameChangeHandler = (event) => {
  //   this.setState({username: event.target.value});
  // }

  // render() {
  //   return (
  //     <div className="App">
  //       <UserInput changed={this.userNameChangeHandler} currentName={this.state.username} />

  //       <UserOutput userName={this.state.username} />
  //       <UserOutput userName={this.state.username} />
  //       <UserOutput userName="max" />
  //     </div>
  //   );
  // }



state = {
  persons: [
    {id: 'asfasf', name: 'Max', age: '28'},
    {id: 'gasg', name: 'Manu', age: '29'},
    {id: 'asdcx', name: 'Stéphane', age: '22'}
  ],
  otherState: 'some other value',
  showPersons: false
}

switchNameHandler = (newName) => {
  //console.log('was clicked!');
  // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';

  this.setState({
    persons: [
      {name: newName, age: '28'},
      {name: 'Manu', age: '29'},
      {name: 'Stéphane', age: '22'}
    ]
  })
}

nameChangeHandler = (event, id) => {

  // procura pelo state e retorna o index de cada elemento, caso o id seja o mesmo.
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });

  // utiliza o spread operator para fazer uma cópia do elemento
  const person = {
    ...this.state.persons[personIndex]
  };

  // usar a forma mais moderna, acima.
  // const person = Object.assign({}, this.state.persons[personIndex]);

  // pega o valor do input (target)
  person.name = event.target.value;

  // SEMPRE trabalhar com uma cópia do estado para que a imutabilidade seja mantida.
  const persons = [...this.state.persons];
  persons[personIndex] = person;

  this.setState({persons: persons})
}

// Handler para excluir pessoas ao clique. Uma Key é necessária para que tudo ocorra de maneira eficiente pois o React não identifica como os elementos são diferentes

deletePersonHandler = (personIndex) => {
  // const persons = this.state.persons.slice();
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons});
}

togglePersonsHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState({showPersons: !doesShow});
}

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid green',
      padding: '8px',
      cursor: 'pointer'
    };


    // A melhor forma de mostrar um conteúdo via condicional é aproveitando o fato do react renderizar as coisas antes do return, logo pode-se utilizar javascript comum para utilizar o if como opção à verificação ternária.
    let persons = null;
   
    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)} />
          })}
       </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'  
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); //classes = ['red']
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold'); //classes = ['red', 'bold']
    } 

    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>

          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons
          </button>
        
        {persons}

        {/*Expressão ternária para condicionar a renderização de conteúdo (NÃO RECOMENDADO POR QUESTÕES DE DESEMPENHO E MANUTENIBILIDADE) { 
          this.state.showPersons ? */}
        {/* : null} */}
        </div>
    );
  }

}

export default App;
