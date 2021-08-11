using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine._Database.Interfaces;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace VendingMashine._Database.Repositories
{
    public class DrinkRepository : BaseRepository, IDrinkRepository
    {
        public DrinkRepository(string connectionString, IRepositoryVMContext contextFactory) : base(connectionString, contextFactory)
        {
        }

        public async Task ChangeDrink(Drink newdrink)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                Drink olddrink = await db.Drinks.Where(x => x.Id == newdrink.Id).FirstAsync();
                olddrink.Name = newdrink.Name;
                olddrink.Price = newdrink.Price;
                olddrink.Count = newdrink.Count;
                db.Entry(olddrink).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }

        public async Task DeleteDrink(int id)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                Drink drink = await db.Drinks.Where(x => x.Id == id).FirstAsync();
                db.Drinks.Remove(drink);
                await db.SaveChangesAsync();
            }
        }

        public async Task<Drink[]> GetDrinks()
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                Drink[] drinks;
                drinks = await db.Drinks.ToArrayAsync();
                return drinks;
            }
        }
        public async Task<byte[]> GetImage(int id)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                var b_image = await db.DrinkImages.Where(x => x.DrinkId == id).FirstOrDefaultAsync();
                if (b_image != null)
                    return b_image.Image;
                else return null;
            }
        }



        public async Task<int> PostDrink(Drink drink)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                db.Drinks.Add(drink);
                await db.SaveChangesAsync();
                return drink.Id;
            }
        }

        public async Task PostDrinksWithImage(int id, [FromForm] DrinkWithImage el)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {                
                byte[] imageData = null;
                using (var binaryReader = new BinaryReader(el.Image.OpenReadStream()))
                {
                    imageData = binaryReader.ReadBytes((int)el.Image.Length);
                }
                DrinkImage image = new DrinkImage() { DrinkId = id, Image=imageData };
                db.DrinkImages.Add(image);
                await db.SaveChangesAsync();
            }
        }
        public async Task PutDrinksWithImage(int id, [FromForm] DrinkWithImage el)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                byte[] imageData = null;
                using (var binaryReader = new BinaryReader(el.Image.OpenReadStream()))
                {
                    imageData = binaryReader.ReadBytes((int)el.Image.Length);
                }
                DrinkImage image = await db.DrinkImages.Where(x => x.DrinkId == id).FirstOrDefaultAsync();
                image.Image = imageData;
                db.Entry(image).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }
    }
}
