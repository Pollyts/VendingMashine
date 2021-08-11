using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace VendingMashine._Database.Interfaces
{
    public interface IDrinkRepository
    {
        Task<Drink[]> GetDrinks();
        Task<int> PostDrink(Drink drink);
        Task PostDrinksWithImage(int id, [FromForm] DrinkWithImage el);
        Task ChangeDrink(Drink newdrink);
        Task DeleteDrink(int id);
        Task<byte[]> GetImage(int id);
        Task PutDrinksWithImage(int id, [FromForm] DrinkWithImage el);

    }
}
