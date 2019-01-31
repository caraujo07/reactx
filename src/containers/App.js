import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside constructor', props);
    this.state = {
      persons: [
        {id: 'asfasf', name: 'Max', age: '28'},
        {id: 'gasg', name: 'Manu', age: '29'},
        {id: 'asdcx', name: 'Stéphane', age: '22'}
      ],
      otherState: 'some other value',
      showPersons: false
    }
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  // INITIALIZE THE STATE LIKE THE EXEMPLE BELOW IS EASIER THAN USING THE CONSTRUCTOR
// state = {
//   persons: [
//     {id: 'asfasf', name: 'Max', age: '28'},
//     {id: 'gasg', name: 'Manu', age: '29'},
//     {id: 'asdcx', name: 'Stéphane', age: '22'}
//   ],
//   otherState: 'some other value',
//   showPersons: false
// }

switchNameHandler = (newName) => {
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

    console.log('[App.js] Inside render()');
    // A melhor forma de mostrar um conteúdo via condicional é aproveitando o fato do react renderizar as coisas antes do return, logo pode-se utilizar javascript comum para utilizar o if como opção à verificação ternária.
    let persons = null;
   
    if(this.state.showPersons) {
      persons = <Persons 
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler} />
    }

    return (
        <div className={classes.App}> 
          <Cockpit
            appTitle={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons} 
            clicked={this.togglePersonsHandler}/>

          {persons}
        </div>
    );
  }
}

export default App;
