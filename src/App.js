import React, { Component } from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import './css/App.css';
import './css/ConfigTable.css';
import axios from 'axios';
import { simulateResponse } from './helpers';
import $ from 'jquery';
import { FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';

/*
 * This component is the list of configurations.
 */
 const ConfigList = (props) => {
  /*
   * Get the amount of vertical space left on the screen. We would prefer to fit the table exactly in that space so that there
   * is only 1 scroll bar. 150px is the min height for the table though.
   */ 
   let verticalSpace = $(window).height() - 300;
   if (verticalSpace < 140) {
      verticalSpace = 140;
   }
   console.log("visible vertical space", verticalSpace);

  /*
   * The content that is rendered for the ConfigList component. It uses the Table component from react-virtualized to render even
   * large datasets efficiently. Only rows that are visible at any given time are rendered. 
   * (See https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md for more info on how this works)
   */
  return (
    <div>
      <AutoSizer>
        {({ width }) =>
        <Table
          width={width}
          height={verticalSpace}
          headerHeight={20}
          rowHeight={30}
          rowCount={props.configs.length}
          rowGetter={({index}) => props.configs[index]}

        >
          <Column
            label='Name'
            dataKey='name'
            width={width * 0.25}
          />

          <Column
            label='Hostname'
            dataKey='hostname'
            width={width * 0.25}
          />

          <Column
            label='Port'
            dataKey='port'
            width={width * 0.25}
          />

          <Column
            label='username'
            dataKey='username'
            width={width * 0.25}
          />

        </Table> }
      </AutoSizer>
    </div>
  );
};

/*
 * A component that will let a user toggle the table headers between upper/lowercase.
 * (I implemented this to satisfy requirement #2 - Use jQuery to add some style and design 
 * to the previous code). When a user toggles the selection, I use jQuery to dynamically change
 * styling of the list.
 * FOR THE RECORD - I don't think it's wise to mix imperative jQuery code with declarative React code.
 * I just did this to show that I know how jQuery works. 
 */
class HeaderCaseToggle extends Component {
  state = {headerCase: "uppercase"};

  handleChange = (event) => {
//    this.props.onChange(event.target.value);
    console.log("text size selection changed", event.target.value);
    //Set the selectedFont to the current selected button
    this.setState({headerCase: event.target.value});

    //Use jQuery to dynamically set the style of the table header
    $(".ReactVirtualized__Table__headerRow").css("text-transform", event.target.value);

  }

  render = () => {
    return (
      <div>
          <input type="radio" id="toggleSmall" name="fontsizes" value="lowercase" onChange={this.handleChange} 
            checked={this.state.headerCase==="lowercase"} />
          <label htmlFor="toggleSmall">Lowercase</label>
          <input type="radio" id="toggleLarge" name="fontsizes" value="uppercase" onChange={this.handleChange}
            checked={this.state.headerCase==="uppercase"} />
          <label htmlFor="toggleLarge">Uppercase</label>
      </div>
    );
  };
};

/*
 * This component is a form that lets the user specify how many hosts they'd like to retrieve.
 */
class NumConfigurationInput extends Component {
  state = { 
    numConfigs: '',
  };

  /*
   * When the form is submitted, create an http request with the correct number of hosts and send it to the server
   * via axios (https://www.npmjs.com/package/axios). Since no server exists, I just call a helper function
   * simulateRequest() in the axios error catching.
   */
  handleSubmit = (event) => {
    event.preventDefault();

    //We'll use this variable to represent the request URL that we send to the server
    let requestUrl = "http://testserver.com/download/request?host=" + this.state.numConfigs;
    console.log('request URL', requestUrl);

    // Use axios (https://www.npmjs.com/package/axios) to create an http request
    // If the server existed we would 
    axios.get(requestUrl)
    .then(resp => {
      //If the server existed, this would call the onSubmit function that was passed to the form component as a property,
      //using the JSON response from the server as an argument
      this.props.onSubmit(resp.data);
      this.setState({numConfigs: ''});
    })
    .catch(error => {
      //Since the server does not exist, this catch statement will always execute. 
      console.log(error);
      let simulatedResponse = simulateResponse(this.state.numConfigs);

      //Execute the onSubmit function that was passed in via the components properties with serverResponse as the argument
      this.props.onSubmit(simulatedResponse);
      this.setState({numConfigs: ''});
    });

  }

  //Whenever the input box is changed, update the component state
  handleChange = (event) => {
    this.setState({numConfigs: event.target.value});
  };


  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formInputNumConfigs"
        >
          <InputGroup>
            <FormControl
              type="number"
              value={this.state.numConfigs}
              onChange={this.handleChange}
              placeholder="Number of hosts" required/>
            <InputGroup.Button>
              <Button type="submit">
                Get configurations
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

/*
 * Top level app component that renders the input box for selecting how many hosts to show
 * and the list of configurations
 */
class App extends Component {
  state = {
    configs: [],
  };

  /*
   * Callback function that the NumConfigurationInput can use to update the list of configurations
   */
  updateConfigs = (response) => {
    this.setState({configs: response.configurations});
    console.log("new state", this.state);
  };

  render() {
    return (
      <div className="App">
        <div className="App-header" id="appHeader">
          <h2>Tenable - Nessus UI Assessment</h2>
          <h3>Dylan Symington</h3>
        </div>
        <div className="App-main">
          <div className="InputArea" id="inputArea">
            <div className="InputFieldLeft">
              <NumConfigurationInput onSubmit={this.updateConfigs} />
            </div>
            <div className="InputFieldRight">
              <HeaderCaseToggle />
            </div>
          </div>
          <div className="ConfigList">
            <ConfigList configs={this.state.configs} />
          </div>
        </div>
      </div>
    );
  };
}



export default App;
