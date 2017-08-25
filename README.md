Live demo at https://somecoolguy.github.io/tenable-ui-assessment/ (Tested in Chrome on Windows 10). Enter a number in the "Number of hosts" textbox and submit it to see the list of configurations.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Other libraries I used included:
- [React Virtualized](https://github.com/bvaughn/react-virtualized) - For efficicient rendering of large datasets
- [Axios](https://www.npmjs.com/package/axios) - For Promise-based xmlHttpRequests
- [React Bootstrap](https://react-bootstrap.github.io) - For Bootstrap components in React (I ended up barely using this)
- [jQuery](https://www.npmjs.com/package/jquery) - For dynamic DOM manipulation (Normally I wouldn't use jQuery with React, but the assessment wanted me to demonstrate some jQuery).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Installing locally
If you'd like to run the project locally you can check it out of Github, navigate to the root folder, and execute the following commands.
```cmd
npm install --save react react-dom jQuery react-virtualized axios react-bootstrap
npm start
```
Then you will be able to access the project at localhost:3000.

## Notes about assessment questions
1) A server sends the following data when requesting 'http://[yourserver]/download/request?host=2'  :

{
"configurations" : [
     {
        "name" : "host1",
        "hostname" : "nessus-ntp.lab.com",
        "port" : 1241,
        "username" : "toto"
     },
     {
        "name" : "host2",
        "hostname" : "nessus-xml.lab.com",
        "port" : 3384,
        "username" : "admin"
     }
 ]
}

Write an HTML/JS code to send this request and display the result.

```
- I wrote the request code within the handleSubmit function in the NumConfigurationInput component. Since the server doesn't actually exist it always fails, so within the catch clause I just simulate what a request would look like and pretend I got it from the server.
- I also have a unit test in App.test.js that tests whether the response from the server is what is expected. (It always fails).
```
