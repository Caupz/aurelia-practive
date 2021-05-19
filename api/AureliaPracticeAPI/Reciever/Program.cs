using System;
using System.Net.Http;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Reciever
{
    class Program
    {
        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "hello",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine(" [x] Received {0}", message);

                    if(message.Contains("New entry:"))
                    {
                        string idStr = message.Replace("New entry:", "");
                        int id = 0;

                        if(int.TryParse(idStr, out id))
                        {
                            Sender.Send(id, string.Format("https://localhost:44315/api/items/{0}", id));
                        }
                    }
                };
                channel.BasicConsume(queue: "hello",
                                     autoAck: true,
                                     consumer: consumer);

                Console.WriteLine(" Press [enter] to exit.");
                Console.ReadLine();
            }
        }
    }
}
