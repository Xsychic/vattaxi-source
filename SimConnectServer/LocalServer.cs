using System.Net;
using System.Threading;
using System.Diagnostics;
using System.Windows.Forms;

namespace SimConnectServer;

internal class LocalServer {

    private const int PORT = 57016;
    private HttpListener listener = new HttpListener();
    private SimConnectServer dataClient;

    public LocalServer(SimConnectServer simConnectClient) {
        dataClient = simConnectClient;

    }

    public void startServer() {
        listener.Prefixes.Add($"http://localhost:{PORT}/");
        listener.Start();
        Debug.WriteLine("Local server listening");

        while(true) {
            HttpListenerContext context = listener.GetContext();

            // setup response
            HttpListenerResponse response = context.Response;
            response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:8080");
            response.Headers.Add("Access-Control-Allow-Methods", "GET");
            response.ContentType = "application/json";

            // get position data from simconnect client
            SimConnectServer.DataStruct? data = dataClient.getLatestData();
            string message;

            // check connection status and data presence
            if(data != null && dataClient.connected != false) {
                message = dataToJSON((SimConnectServer.DataStruct)data);
            } else {
                // something wrong with sim connection, notify js
                response.StatusCode = 404;

                if(data == null) {
                    message = @"{ ""message"": ""Location data not yet been retrieved from the simulator"" }";
                } else {
                    message = @"{ ""message"": ""Connection to simulator has been lost"" }";
                }                
            }

            // encode response data and send
            System.Text.Encoding encoding = System.Text.Encoding.UTF8;
            byte[] buffer = encoding.GetBytes(message);
            response.ContentLength64 = buffer.Length;
            System.IO.Stream stream = response.OutputStream;
            stream.Write(buffer, 0, buffer.Length);
            response.Close();

        }
    }

    private string dataToJSON(SimConnectServer.DataStruct data) {
        return $"{{ \"altitude\": \"{ data.altitude }\", \"latitude\": \"{ data.latitude }\", \"longitude\": \"{ data.longitude }\" }}";
    }

}
