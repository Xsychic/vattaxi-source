using System.Diagnostics;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using Microsoft.FlightSimulator.SimConnect;

namespace SimConnectServer;

public partial class SimConnectServer : Form {

    public bool connected = false;
    public bool remainActive = true;

    private SimConnect? connection = null;
    private bool allowShowDisplay = false;
    private DataStruct? latestData = null;
    private const int WM_USER_SIMCONNECT = 0x0402;

    private enum DATA_DEFINE_ID {
        DEFINITION_1
    };

    private enum DATA_REQUEST_ID {
        REQUEST_1
    };

    public struct DataStruct {
        public double altitude;
        public double latitude;
        public double longitude;
    };

    public SimConnectServer() {
        try {
            createConnection();
            // js app could have been closed while trying to create connection with simulator
            if(connection != null && remainActive)
                getData();
            else if(remainActive)
                createConnection();
            else
                Application.Exit();
        } catch(Exception e) {
            Debug.WriteLine(e);
        }
	}

    public void createConnection() {
        try {
            connection = new SimConnect("MSFS Data Connection", Handle, WM_USER_SIMCONNECT, null, 0);
            Debug.WriteLine("SimConnect connection established");
            connected = true;
        } catch(Exception err) {
            if(err?.Message == "Error HRESULT E_FAIL has been returned from a call to a COM component.") {
                // connection failed, likely because the simulator hasn't started
                if(remainActive) {
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
        // closes connnection to SimConnect if still active and terminates C# process
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

            // define data structure to be provided by SimConnect server
            connection?.AddToDataDefinition(DATA_DEFINE_ID.DEFINITION_1, "Plane Altitude", "Feet", SIMCONNECT_DATATYPE.FLOAT64, 0.0f, SimConnect.SIMCONNECT_UNUSED);
            connection?.AddToDataDefinition(DATA_DEFINE_ID.DEFINITION_1, "Plane Latitude", "Degrees", SIMCONNECT_DATATYPE.FLOAT64, 0.0f, SimConnect.SIMCONNECT_UNUSED);
            connection?.AddToDataDefinition(DATA_DEFINE_ID.DEFINITION_1, "Plane Longitude", "Degrees", SIMCONNECT_DATATYPE.FLOAT64, 0.0f, SimConnect.SIMCONNECT_UNUSED);

            // register data structure with managed data connection marshaller
            connection?.RegisterDataDefineStruct<DataStruct>(DATA_DEFINE_ID.DEFINITION_1);
            Debug.WriteLine("Created data definition");
            connection?.RequestDataOnSimObject(DATA_REQUEST_ID.REQUEST_1, DATA_DEFINE_ID.DEFINITION_1, 0, SIMCONNECT_PERIOD.SECOND, SIMCONNECT_DATA_REQUEST_FLAG.DEFAULT, 0, 0, 0);

        } catch(COMException err) {
            Debug.WriteLine(err); 
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
            Thread.Sleep(2000);
            createConnection();
            if(connection != null && remainActive)
                getData();
            else
                // terminates C# process
                closeConnection();
        }
        closeConnection();
    }

    void simconnect_OnRecvSimObjectData(SimConnect sender, SIMCONNECT_RECV_SIMOBJECT_DATA data) {
        // data received, handle here

        try {
            switch((DATA_REQUEST_ID)data.dwRequestID) {
                case DATA_REQUEST_ID.REQUEST_1:
                    DataStruct receivedData = (DataStruct)data.dwData[0];
                    latestData = receivedData;
                    break;
                default:
                    Debug.WriteLine("weird - unexpected data returned in simconnect_OnRecvSimObjectData");
                    break;
            }
        } catch(Exception error) {
            Debug.WriteLine(error);
        }
    }

    void simconnect_OnRecvException(SimConnect sender, SIMCONNECT_RECV_EXCEPTION error) {
        Debug.WriteLine($"Error received from simulator: { error }");
        // terminates SimConnect connection and then terminates C# process
        closeConnection();
    }

    public DataStruct? getLatestData() {
        if(latestData != null) {
            return latestData;
        }
        return null;
    }

    protected override void DefWndProc(ref Message m) {
        // something to do with the message receival from the simulator I think - it's needed, don't ask questions
        // from docs and both examples
        if(m.Msg == WM_USER_SIMCONNECT) {
            if(connection != null) {
                try {
                    connection.ReceiveMessage();
                } catch(Exception e) {
                    Debug.WriteLine(1);
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
