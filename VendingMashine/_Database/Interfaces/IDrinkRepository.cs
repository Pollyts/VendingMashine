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
        Task<ClientDrink[]> GetDrinks();
        Task<int> PostDrink(ClientDrink drink);
        Task PostDrinksWithImage(int id, [FromForm] DrinkWithImage el);
        Task ChangeDrink(ClientDrink newdrink);
        Task DeleteDrink(int id);
        Task<byte[]> GetImage(int id);
        Task PutDrinksWithImage(int id, [FromForm] DrinkWithImage el);

    }
}
