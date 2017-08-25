import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import { simulateResponse } from './helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

/*
 * Unit test for getting a response from the server
 * (This should always fail)
 */
it('gets a valid response from the server', () => {
	let requestUrl = "http://testserver.com/download/request?host=2";

    // Use axios (https://www.npmjs.com/package/axios) to create an http request
    // If the server existed we would 
    axios.get(requestUrl)
    .then(resp => {
    	//Expect the response from the server to equal the simulated response for 2 hosts
    	expect(resp).toEqual(simulateResponse(2));
    })
    .catch(error => {
    	//Fail purposely since there was an error getting a response from the server
    	expect(true).toBe(false);
    });
});
