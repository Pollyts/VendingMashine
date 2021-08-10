using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;
using VendingMashine.Services;
using VendingMashine._Database.Interfaces;

namespace VendingMashine.Services
{
    public class DrinkService : IDrinkService
    {
        IDrinkRepository _repository;
        public DrinkService(IDrinkRepository repository)
        {
            _repository = repository;
        }
        public async Task ChangeDrink(Drink newdrink)
        {
            await _repository.ChangeDrink(newdrink);
        }

        public async Task DeleteDrink(int id)
        {
            await _repository.DeleteDrink(id);
        }        

        public async Task<Drink[]> GetDrinks()
        {
            return await _repository.GetDrinks();
        }
        public async Task<int> PostDrink(Drink drink)
        {
            return await _repository.PostDrink(drink);
        }

        public async Task PostDrinksWithImage(int id, [FromForm] DrinkWithImage el)
        {
            await _repository.PostDrinksWithImage(id, el);
        }
    }
}
