using System.Net.NetworkInformation;

using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace HealthCheck.Server
{
    public class ICMPHealthCheck : IHealthCheck
    {
        private readonly string _host;
        private readonly int _timeout;

        public ICMPHealthCheck(string host, int timeout)
        {
            _host = host;
            _timeout = timeout;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(
            HealthCheckContext context,
            CancellationToken cancellationToken = default)
        {
            try
            {
                using var ping = new Ping();
                var reply = await ping.SendPingAsync(_host, _timeout);

                switch (reply.Status)
                {
                    case IPStatus.Success:
                        var msg = $"ICMP ping to {_host} took {reply.RoundtripTime} ms.";
                        return reply.RoundtripTime > (_timeout / 2)
                            ? HealthCheckResult.Degraded(msg)
                            : HealthCheckResult.Healthy(msg);

                    default:
                        var err = $"ICMP ping to {_host} failed: {reply.Status}";
                        return HealthCheckResult.Unhealthy(err);
                }
            }
            catch (Exception ex)
            {
                var err = $"ICMP ping to {_host} failed with exception: {ex.Message}";
                return HealthCheckResult.Unhealthy(err, ex);
            }
        }
    }
}
