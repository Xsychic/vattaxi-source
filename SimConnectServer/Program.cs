using System.Diagnostics;

namespace SimConnectServer {
    internal static class Program {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main() {
            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            try {
                SimConnectServer simConnectClient = new SimConnectServer();
                LocalServer server = new LocalServer(simConnectClient);

                Thread thread = new Thread(new ThreadStart(server.startServer));
                thread.Start();

                Application.Run(simConnectClient);                
            } catch (Exception e) {
                Debug.WriteLine(8);
                Debug.WriteLine(e);
            }
        }
    }
}