using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;

namespace VendingMashine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinsController : ControllerBase
    {
        VMContext db;
        public CoinsController(VMContext context)
        {
            db = context;
        }
        [HttpGet("{name}")]
        public async Task AddCoin(string name)
        {
            Coin coin = await db.Coins.Where(x => x.Name == name).FirstAsync();
            coin.Count ++;            
            db.Entry(coin).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }
    }
}
