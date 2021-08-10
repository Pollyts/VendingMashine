using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;
using Microsoft.AspNetCore.Mvc;

namespace VendingMashine.Services
{
    public interface IDrinkService
    {
        Task<Drink[]> GetDrinks();
        Task<int> PostDrink(Drink drink);
        Task PostDrinksWithImage(int id, [FromForm] DrinkWithImage el);
        Task ChangeDrink(Drink newdrink);
        Task DeleteDrink(int id);
        Task<byte[]> GetImageForDrink(int id);
    }
}
