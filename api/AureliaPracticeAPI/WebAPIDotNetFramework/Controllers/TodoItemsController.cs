using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using System.Web.Http;
using ItemsDataAccess;

namespace WebAPIDotNetFramework.Controllers
{
    [EnableCors(origins: "http://localhost:8080/", headers: "*", methods: "*")]
    public class TodoItemsController : ApiController
    {
        private const string idParam = "{id}";

        public IEnumerable<item> Get()
        {
            using (itemsEntities entities = new itemsEntities())
            {
                return entities.items.ToList();
            }
        }

        public item Get(int id)
        {
            using(itemsEntities entities = new itemsEntities())
            {
                return entities.items.FirstOrDefault(e => e.id == id);
            }
        }
    }
}
