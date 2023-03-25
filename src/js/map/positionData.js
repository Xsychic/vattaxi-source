import axios from 'axios';
import { ref } from 'vue';

class DataProvider {

    currentDataField = ref({});
    reqTimeoutCounter = 0;
    timeoutCap = 100;
    reqInterval = 500;
    connectedField = ref(false);
    fourOhFourOccurred = false;
    continueFetchingData = true;

    constructor() { 
        this.getData();
        return { connected: this.connectedField, data: this.currentDataField };
    }

    set connected(newValue) {
        if(newValue !== this.connectedField) {
            this.connectedField.value = newValue;
        }
    }

    get connected() {
        return this.connectedField.value;
    }

    set currentData(newValue) {
        this.currentDataField.value = newValue;
    }

    get currentData() {
        return this.currentDataField.value;
    }

    getData = async () => { 
        if(this.outstandingRequest)
            return;
        
        
        while(this.continueFetchingData) {
            await axios({
                method: 'get',
                url: 'http://localhost:57016',
                params: {
                    type: 'data request'
                },
                timeout: 2000,
                responseType: 'json'  
            }).then(async (response) => {
                this.connected = true;
                this.reqTimeoutCounter = 0;
                this.fourOhFourOccurred = false;
        
                if(response?.data?.latitude && response?.data?.longitude) {
                    let lat = response.data.latitude;
                    let long = response.data.longitude;
        
                    lat = Math.round(lat * 10**6) / 10**6;
                    long = Math.round(long * 10**6) / 10**6;
        
                    response.data.latitude = lat;
                    response.data.longitude = long;
        
                    if(response.data.latitude != this.currentData.latitude || response.data.longitude != this.currentData.longitude) {
                        this.currentData = response.data;
                    }
                }
        
            }).catch((error) => {
                this.connected = false;
        
                if(error.code == 'ECONNABORTED' || error.code == 'ERR_NETWORK') {
                    // timed out 
                    this.reqTimeoutCounter++;
                    if(this.reqTimeoutCounter == this.timeoutCap || this.reqTimeoutCounter == 1) {
                        console.log(`Count: ${ this.reqTimeoutCounter }`);
                        console.log(error);
                    }
                    return;
                }          
        
                if(error?.response) {
                    const { status = 500 } = error.response;
        
                    if(status == 404 && this.fourOhFourOccurred == false) {
                        // location data not received from sim
                        this.fourOhFourOccurred = true;
                        console.log(error);
                        console.log(error.response.data.message); // "Location data not yet been retrieved from the simulator" or "Connection to simulator has been lost"
                    } else if(status != 404) {
                        console.log(error);
                    }
                }
            }).finally(() => {
                if(this.reqTimeoutCounter == this.timeoutCap) {
                    // need to post message to user
                    console.log("Timeout cap exceeded, possible unresolvable loss in connection to simconnect client, please restart the application if the simulator is already running.");
                }
            });

            await new Promise(resolve => setTimeout(resolve, this.reqInterval));
        }
    }
}

export default DataProvider;