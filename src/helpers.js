/*
 * 	Function to simulate the JSON response that would be returned from the server.
 * 	 @param numHosts - The number of hosts that would be included in the response
 */
export function simulateResponse(numHosts) {
	let response = {"configurations" : [] };
	//Start the loop at 1 because we want the host names to start at 1
	for (let i = 1; i <= numHosts; i++){
		let name = "host" + i;
		let hostname = "";
		let port = undefined;
		let username = "";

		//For simulation purposes, every odd host will have the same properties as host1, 
		//and every even host will have the same properties as host2.
		if (i % 2 === 1){
			hostname = "nessus-ntp.lab.com";
			port = 1241;
			username = "toto";
		} else {
			hostname = "nessus-xml.lab.com";
			port = 3384;
			username = "admin";
		}
		
		response["configurations"].push({
			"name" : name,
			"hostname": hostname,
			"port" : port,
			"username" : username
		});
	}
	return response;
}
