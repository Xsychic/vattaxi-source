﻿using System.Diagnostics;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using Microsoft.FlightSimulator.SimConnect;


namespace SimConnectServer;

public partial class SimConnectServer : Form {

    SimConnect? connection = null;
    public bool connected = false;
    public bool remainActive = true;
    private DateTime? disconnectTime = null;
    private bool allowShowDisplay = false;
    const int WM_USER_SIMCONNECT = 0x0402;

    enum DATA_DEFINE_ID {
        DEFINITION_1
    };

    enum DATA_REQUEST_ID {
        REQUEST_1
    };

    struct DataStruct {
        public double altitude;
        public double latitude;
        public double longitude;
    };

    public SimConnectServer() {
        createConnection();
        // js app could have been closed while trying to create connection with simulator
        if(connection != null && remainActive)
            getData();
        else
            Application.Exit();
	}

    public void createConnection() {
        try {
            connection = new SimConnect("MSFS Data Connection", Handle, WM_USER_SIMCONNECT, null, 0);
            Debug.WriteLine("SimConnect connection established");
            connected = true;
            disconnectTime = null;
        } catch(Exception err) {
            if(err?.Message == "Error HRESULT E_FAIL has been returned from a call to a COM component.") {
                // connection failed, likely because the simulator hasn't started
                // delay entire thread for 2 seconds before retrying
                // timeout in case js app fails 'ungracefully'
                if(remainActive && (disconnectTime == null || DateTime.UtcNow - disconnectTime < TimeSpan.FromMinutes(5))) {
                    Thread.Sleep(2000);
                    createConnection();
                }
                return;
            }
            Debug.WriteLine("Connection to SimConnect couldn't be established");
            Debug.WriteLine(err?.Message);
        }
    }

    public void closeConnection() {
        if(connection != null) {
            connection.Dispose();
            connection = null;
            connected = false;
            remainActive = false;
            Debug.WriteLine("Closed connection to simulator");
        }
        Application.Exit();
    }

    // function to setup event handlers, data format and make request
    public void getData() {
        try {

            if(connection != null) {
                // listen for events from simulator
                connection.OnRecvOpen += new SimConnect.RecvOpenEventHandler(simconnect_OnRecvOpen);
                connection.OnRecvQuit += new SimConnect.RecvQuitEventHandler(simconnect_OnRecvQuit);
                connection.OnRecvSimobjectData += new SimConnect.RecvSimobjectDataEventHandler(simconnect_OnRecvSimObjectData);
                
                // listen for exceptions
                connection.OnRecvException += new SimConnect.RecvExceptionEventHandler(simconnect_OnRecvException);
            }


            connection?.AddToDataDefinition(DATA_DEFINE_ID.DEFINITION_1, "Plane Altitude", "Feet", SIMCONNECT_DATATYPE.FLOAT64, 0.0f, SimConnect.SIMCONNECT_UNUSED);
            connection?.AddToDataDefinition(DATA_DEFINE_ID.DEFINITION_1, "Plane Latitude", "Degrees", SIMCONNECT_DATATYPE.FLOAT64, 0.0f, SimConnect.SIMCONNECT_UNUSED);
            connection?.AddToDataDefinition(DATA_DEFINE_ID.DEFINITION_1, "Plane Longitude", "Degrees", SIMCONNECT_DATATYPE.FLOAT64, 0.0f, SimConnect.SIMCONNECT_UNUSED);

            // register data structure with managed data connection marshaller
            connection?.RegisterDataDefineStruct<DataStruct>(DATA_DEFINE_ID.DEFINITION_1);
            Debug.WriteLine("Created data definition");
            connection?.RequestDataOnSimObject(DATA_REQUEST_ID.REQUEST_1, DATA_DEFINE_ID.DEFINITION_1, 0, SIMCONNECT_PERIOD.SECOND, SIMCONNECT_DATA_REQUEST_FLAG.DEFAULT, 0, 0, 0);

        } catch(COMException err) {
            Debug.WriteLine(1);
            Debug.WriteLine($"Error: { err.Message }"); 
        }
	}


    void simconnect_OnRecvOpen(SimConnect sender, SIMCONNECT_RECV_OPEN data) {
        Debug.WriteLine("Connected to Simulator");
        connected = true;
    }

    // on detecting the simulator has closed the connection
    void simconnect_OnRecvQuit(SimConnect sender, SIMCONNECT_RECV data) {
        connection = null;
        connected = false;
        Debug.WriteLine("The simulator has closed the connection");
        
        if(remainActive) {
            // if connection closed unexpectedly (very likely in this function), then try to reconnect after a short delay
            disconnectTime = DateTime.UtcNow;
            Thread.Sleep(2000);
            createConnection();
            if(connection != null && remainActive)
                getData();
            else
                closeConnection();
        }
    }

    void simconnect_OnRecvSimObjectData(SimConnect sender, SIMCONNECT_RECV_SIMOBJECT_DATA data) {
        // data received, handle here
        switch ((DATA_REQUEST_ID)data.dwRequestID) {
            case DATA_REQUEST_ID.REQUEST_1:
                DataStruct st = (DataStruct)data.dwData[0];
                Debug.Write($"Altitude: { st.altitude } Lat: { st.latitude } Long: { st.longitude }\n");
                break;
            default:
                Debug.WriteLine("weird - unexpected data returned in simconnect_OnRecvSimObjectData");
                break;
        }
    }

    void simconnect_OnRecvException(SimConnect sender, SIMCONNECT_RECV_EXCEPTION error) {
        Debug.WriteLine($"Error received from simulator: { error }");
        closeConnection();
    }

    public void resetDisconnectTimer() {
        disconnectTime = DateTime.UtcNow;
    }

    protected override void DefWndProc(ref Message m) {
        // something to do with the message receival from the simulator I think - it's needed, don't ask questions
        // from docs and both examples
        if(m.Msg == WM_USER_SIMCONNECT) {
            if(connection != null) {
                try {
                    connection.ReceiveMessage();
                } catch(Exception e) {
                    Debug.WriteLine(e.Message);
                }
            }
        } else {
            base.DefWndProc(ref m);
        }
    }


    protected override void SetVisibleCore(bool value) {
        // hide the gui
        base.SetVisibleCore(allowShowDisplay ? value : allowShowDisplay);
    }
}
