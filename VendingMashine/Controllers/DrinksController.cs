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
        public async Task<ClientDrink[]> GetDrinks()
        {
            return await _drinkService.GetDrinks();
        }
        [HttpGet]
        [Route("/api/drinks/images/{id}")]
        public async Task<IActionResult> GetImagesForDrinks(int id)
        {
            var image = await _drinkService.GetImageForDrink(id);
            return File(image, "image/jpeg");
            //return await _drinkService.GetImageForDrink(id);
            //return File(image, "image/jpeg");
        }

        [HttpPost]
        public async Task<int> PostDrink(ClientDrink drink)
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
        [Route("/api/drinks/image/{id}")]
        public async Task PutDrinksWithImage(int id, [FromForm] DrinkWithImage el)
        {
            await _drinkService.PutDrinksWithImage(id, el);
        }

        [HttpPut]
        public async Task ChangeDrink(ClientDrink newdrink)
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
