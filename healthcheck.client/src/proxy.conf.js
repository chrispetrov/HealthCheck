const PROXY_CONFIG = [
  {
    context: [
      "/api/"  //from weatherforecast
    ],
    // Hardcoding the IP ensures we skip DNS/IPv6 confusion
    target: "https://127.0.0.1:7289",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    // This keeps the terminal clean while the backend compiles
    onError: (err, req, res) => {
      console.log('--- Vite Proxy: Waiting for ASP.NET Backend to wake up... ---');
    }
  }
];
// added a new targer
module.exports = PROXY_CONFIG;
