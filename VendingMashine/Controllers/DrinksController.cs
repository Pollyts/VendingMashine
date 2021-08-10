using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using VendingMashine.Services;

namespace VendingMashine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinksController : ControllerBase
    {
        IDrinkService _drinkService;

        public DrinksController(IDrinkService drinkService)
        {
            _drinkService = drinkService;
        }
        [HttpGet]
        public async Task<Drink[]> GetDrinks()
        {
            return await _drinkService.GetDrinks();
        }

        [HttpPost]
        public async Task<int> PostDrink(Drink drink)
        {
            return await _drinkService.PostDrink(drink);
        }

        [HttpPost]
        [Route("/api/drinks/image/{id}")]
        public async Task PostDrinksWithImage(int id, [FromForm] DrinkWithImage el)
        {
            await _drinkService.PostDrinksWithImage(id, el);
        }

        [HttpPut]
        public async Task ChangeDrink(Drink newdrink)
        {
            await _drinkService.ChangeDrink(newdrink);
        }        

        [HttpDelete("{id}")]
        public async Task DeleteDrink(int id)
        {
            await _drinkService.DeleteDrink(id);
        }
    }
    
}
