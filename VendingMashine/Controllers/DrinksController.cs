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

        [HttpPost]
        public async Task<ActionResult> PostDrink(Drink drink)
        {            
            db.Drinks.Add(drink);
            await db.SaveChangesAsync();            
            return Ok();
        }
        public async Task ChangeDrink(Drink newdrink)
        {
            Drink olddrink = await db.Drinks.Where(x => x.Id == newdrink.Id).FirstAsync();
            olddrink.Name = newdrink.Name;
            olddrink.Price = newdrink.Price;
            olddrink.Count = newdrink.Count;
            db.Entry(olddrink).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }        

        [HttpDelete("{id}")]
        public async Task DeleteDrink(int id)
        {
            Drink drink = await db.Drinks.Where(x => x.Id == id).FirstAsync();
            db.Drinks.Remove(drink);
            await db.SaveChangesAsync();
        }
    }
}
