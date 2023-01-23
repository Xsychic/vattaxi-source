import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ref, watch } from 'vue';

class DataProvider {

    constructor() { 
        this.getData();
    }

    currentData;
    reqTimeoutCounter = 0;
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
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            this.connected = false;

            if(error.code == 'ECONNABORTED' || error.code == 'ERR_NETWORK') {
                // timed out 
                this.reqTimeoutCounter++;
                console.log(this.reqTimeoutCounter);
                return;
            }          

            if(error.response) {
                const { status = 500 } = error?.response;
                if(status == 404) {
                    // location data not received from sim
                    console.log(error.response.data.message); // "Location data not yet been retrieved from the simulator" or "Connection to simulator has been lost"
                }
            }
        }).finally(() => {
            if(this.reqTimeoutCounter > 100) {
                // need to post message to user
                alert("Unable to connect to the simulator, please ensure it is running and then restart this application.");
                console.log("Timeout cap exceeded, unresolvable loss in connection to simconnect client, please restart the application.");
                this.continueFetchingData = false;
            }

            if(this.continueFetchingData) {
                const period = (this.connected ? 1000 : 3000);
                setTimeout(this.getData, period);
            }

                
        });


    }
}

export default DataProvider;