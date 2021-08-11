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
        Task<ClientDrink[]> GetDrinks();
        Task<int> PostDrink(ClientDrink drink);
        Task PostDrinksWithImage(int id, [FromForm] DrinkWithImage el);
        Task PutDrinksWithImage(int id, [FromForm] DrinkWithImage el);
        Task ChangeDrink(ClientDrink newdrink);
        Task DeleteDrink(int id);
        Task<byte[]> GetImageForDrink(int id);
    }
}
