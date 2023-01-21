using System.Diagnostics;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using Microsoft.FlightSimulator.SimConnect;


namespace SimConnectServer;

public partial class SimConnectServer : Form {

    SimConnect? connection = null;
    private bool allowShowDisplay = false;
    const int WM_USER_SIMCONNECT = 0x0402;

    enum DATA_DEFINE_ID {
        DEFINITION_1,
        DEFINITION_2
    };

    enum DATA_REQUEST_ID {
        REQUEST_1
    };

    struct DataStruct {
        public double latitude;
        public double longitude;
    };

    public SimConnectServer() {
        this.Hide();
        createConnection();
        getData();
	}

    public void createConnection() {
        try {
            connection = new SimConnect("MSFS Data Connection", Handle, WM_USER_SIMCONNECT, null, 0);
            Debug.WriteLine("Simconnect connection established");
        } catch(Exception err) {
            Debug.WriteLine("fuck");
            Debug.WriteLine(err.Message);
        }
    }


    public void getData() {
        try {

            if(connection != null) {
                Debug.WriteLine(1.5);
                connection.OnRecvOpen += new SimConnect.RecvOpenEventHandler(simconnect_OnRecvOpen);
                connection.OnRecvSimobjectData += new SimConnect.RecvSimobjectDataEventHandler(simconnect_OnRecvSimobjectData);
            }

            

            connection?.AddToDataDefinition(DATA_DEFINE_ID.DEFINITION_1, "Plane Latitude", "Degrees", SIMCONNECT_DATATYPE.FLOAT64, 0.0f, SimConnect.SIMCONNECT_UNUSED);
            connection?.AddToDataDefinition(DATA_DEFINE_ID.DEFINITION_1, "Plane Longitude", "Degrees", SIMCONNECT_DATATYPE.FLOAT64, 0.0f, SimConnect.SIMCONNECT_UNUSED);

            connection?.RegisterDataDefineStruct<DataStruct>(DATA_DEFINE_ID.DEFINITION_1);
            Debug.WriteLine("Created data definition");
            connection?.RequestDataOnSimObject(DATA_REQUEST_ID.REQUEST_1, DATA_DEFINE_ID.DEFINITION_1, 0, SIMCONNECT_PERIOD.SECOND, SIMCONNECT_DATA_REQUEST_FLAG.DEFAULT, 0, 0, 0);
            Debug.WriteLine(1);
            


        } catch(COMException err) { Debug.WriteLine($"Error: { err }"); }
	}


    void simconnect_OnRecvOpen(SimConnect simconnect, SIMCONNECT_RECV_OPEN data) {
        Debug.WriteLine("Connected to Simulator");
    }

    void simconnect_OnRecvSimobjectData(SimConnect sender, SIMCONNECT_RECV_SIMOBJECT_DATA data) {
        switch ((DATA_REQUEST_ID)data.dwRequestID) {
            case DATA_REQUEST_ID.REQUEST_1:
                DataStruct st = (DataStruct)data.dwData[0];
                Debug.Write($"Lat: { st.latitude } Long: { st.longitude }\n");
                break;
            default:
                Debug.WriteLine("weird");
                break;
        }
    }


    protected override void DefWndProc(ref Message m) {
        if(m.Msg == WM_USER_SIMCONNECT) {
            if(connection != null) {
                try {
                    connection.ReceiveMessage();
                } catch(Exception e) {
                    Debug.WriteLine(e.Message);
                    //if(debugMode.Checked) {
                        //debugOutput.AppendText("\r\n" + e.Message);
                    //}
                }
            }
        } else {
            base.DefWndProc(ref m);
        }
    }


    protected override void SetVisibleCore(bool value) {
        base.SetVisibleCore(allowShowDisplay ? value : allowShowDisplay);
    }
}
