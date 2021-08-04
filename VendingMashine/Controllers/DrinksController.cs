using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;

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
        public async Task<ActionResult<int>> PostDrink(Drink drink)
        {            
            db.Drinks.Add(drink);
            await db.SaveChangesAsync();            
            return drink.Id;
        }

        [HttpPost]
        [Route("/api/drinks/image/{id}")]
        public async Task<IActionResult> PostDrinksWithImage(int id, [FromForm] DrinkWithImage el)
        {
            Drink drink = await db.Drinks.Where(x => x.Id == id).FirstOrDefaultAsync();
            byte[] imageData = null;
            using (var binaryReader = new BinaryReader(el.Image.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)el.Image.Length);
            }
            drink.Image = imageData;
            db.Entry(drink).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
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
    public class DrinkWithImage
    {
        public IFormFile Image { get; set; }
    }
}
