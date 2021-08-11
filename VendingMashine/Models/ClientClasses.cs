using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;

namespace VendingMashine.Models
{
    public class DrinkWithImage
    {
        public IFormFile Image { get; set; }
    }

    public class UserCoin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsBlocked { get; set; }
    }
    public class CoinForCount
    {
        public int Id { get; set; }
        public int Count { get; set; }
    }
    public class ClientDrink
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
    }
    public class AdminCoin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public bool IsBlocked { get; set; }
    }



}
