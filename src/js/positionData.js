import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ref, watch } from 'vue';

class DataProvider {

    constructor() { 
        this.getData();
    }

    currentData;
    reqTimeoutCounter = 0;
    timeoutCap = 100;
    connected = false;
    continueFetchingData = true;


    getData = () => { 
        axios({
            method: 'get',
            url: 'http://localhost:57016',
            params: {
                type: 'data request'
            },
            timeout: 3000,
            responseType: 'json'    
        }).then(async (response) => {
            this.connected = true;
            this.currentData = response?.data;
            this.reqTimeoutCounter = 0;
            console.log(response.data);
        }).catch((error) => {
            this.connected = false;

            if(error.code == 'ECONNABORTED' || error.code == 'ERR_NETWORK') {
                // timed out 
                this.reqTimeoutCounter++;
                if(this.reqTimeoutCounter == this.timeoutCap || this.reqTimeoutCounter == 1) console.log(error);
                return;
            }          

            console.log(error);

            if(error.response) {
                const { status = 500 } = error?.response;
                if(status == 404) {
                    // location data not received from sim
                    console.log(error.response.data.message); // "Location data not yet been retrieved from the simulator" or "Connection to simulator has been lost"
                }
            }
        }).finally(() => {
            if(this.reqTimeoutCounter == this.timeoutCap) {
                // need to post message to user
                alert("Unable to connect to the simulator, please ensure it is running and if still not connected then please try restarting this application.");
                console.log("Timeout cap exceeded, likely unresolvable loss in connection to simconnect client, please restart the application.");
            }

            if(this.continueFetchingData) {
                const period = (this.connected ? 1000 : 3000);
                setTimeout(this.getData, period);
            }

                
        });


    }
}

export default DataProvider;