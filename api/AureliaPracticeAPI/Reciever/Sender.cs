using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;

namespace Reciever
{
    public class Sender
    {
        private static readonly HttpClient client = new HttpClient();
        public static async void Send(int id, string url)
        {
            Console.WriteLine("URL: "+ url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            client.DefaultRequestHeaders.Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");
            
            var values = new Dictionary<string, string>
            {
                { "id", id.ToString() },
            };

            var content = new FormUrlEncodedContent(values);
            var stringTask = client.PostAsync(url, content);

            var msg = await stringTask;
            Console.WriteLine(msg);
        }
    }
}
