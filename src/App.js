import React, { Component } from 'react';
import './App.css';

var uuid = require('uuid');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyB3QcyDlO9lTlvjk1tGOmRm1R6gSB0Jz00",
    authDomain: "inventory-app-a5f4c.firebaseapp.com",
    databaseURL: "https://inventory-app-a5f4c.firebaseio.com",
    storageBucket: "inventory-app-a5f4c.appspot.com",
    massagingSenderId: "672304090763"
};
  firebase.initializeApp(config);


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        id: uuid.v1(),
        name: '',
        answers: {
        title: '',
        author: '',
        category: '',
        condition: ''
    },
        submitted: false
    }
  this.handleQuestionChange = this.handleQuestionChange.bind(this);
  this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
  }

  handleQuestionSubmit (event){
    firebase.database().ref('Inventory/'+this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
  });
    this.setState({submitted:true}, function(){
      console.log('Questions Submitted...');
  });
    event.preventDefault();
  }

  handleQuestionChange(event){
    var answers = this.state.answers;
    if(event.target.name === 'title'){
      answers.title = event.target.value;
    } else if (event.target.name === 'author'){
      answers.author = event.target.value;
    } else if (event.target.name === 'category'){
      answers.category = event.target.value;
    } else if (event.target.name === 'condition'){
      answers.condition = event.target.value;
  }
 
  this.setState({answers:answers}, function(){
    console.log(this.state);
  });
  }

  handleNameSubmit(event){
    var name = this.refs.name.value.toUpperCase();
    this.setState({name:name}, function(){
      console.log(this.state);
  });
    event.preventDefault();
  }

  render() {
    var user;
    var questions;
    var answers;
    if(this.state.name && this.state.submitted === false){
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
        <h3>Book Inventory Questions</h3>
          <form onSubmit={this.handleQuestionSubmit.bind(this)}>
        <div>
          <label>What is the book title?</label><br />
            <input type="text" name="title" ref='title' placeholder='Title' onChange={this.handleQuestionChange} /><br />
        </div>
        <div>
            <label>What is the name of the author?</label><br />
            <input type="text" name="author" ref="author" placeholder='Author' onChange={this.handleQuestionChange} /><br />
        </div>
        <div>
          <label>What is the book category?</label><br />
            <input type="text" name="category" ref="category" placeholder='Category' onChange={this.handleQuestionChange} /><br />
        </div>
        <div>
          <label>Is the book new or used?</label><br />
            <input type="text" name="condition" ref="condition" placeholder='New or Used?' onChange={this.handleQuestionChange} /><br />
        </div>
            <input type="submit" value="Submit" />
        </form>
        </span>
    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
          <h2> Please enter your name before proceeding with entry</h2>
            <form onSubmit={this.handleNameSubmit.bind(this)}>
              <input type='text' placeholder="Enter Name...." ref="name" />
            </form>
          </span>
        questions = '';
    } else if(this.state.submitted === true){
        user = <div>
          <h2>THANK YOU {this.state.name}.</h2>
            <h3>Book Information Added To Inventory</h3>
                <h4>Title: <span className="book">{this.state.answers.title.toUpperCase()}</span></h4> 
                <h4>Author: <span className="book">{this.state.answers.author.toUpperCase()}</span></h4>  
                <h4>Category: <span className="book">{this.state.answers.category.toUpperCase()}</span></h4> 
                <h4>Condition: <span className="book">{this.state.answers.condition.toUpperCase()}</span></h4> 
        </div>
    }

  return (
        <div className="App">
          <div className="App-header text-center">
            <h2>"Book Lombriz"" Inventory App</h2>
          </div>
          <div className="text-center">
            {user}
          </div>
          <div className="container">
            {questions}
          </div>          
          <div className="answers">
            {answers}
          </div>
        </div>
    );
  }
}

export default App;
