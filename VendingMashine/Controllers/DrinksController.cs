using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;

namespace VendingMashine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinksController : ControllerBase
    {

        VMContext db;
        public DrinksController(VMContext context)
        {
            db = context;
        }
        [HttpGet]
        public async Task<ActionResult<Drink[]>> GetDrinks()
        {
            Drink[] drinks;
            drinks = await db.Drinks.ToArrayAsync();
            if (drinks == null)
                return NotFound();
            return drinks;
        }
    }
}
