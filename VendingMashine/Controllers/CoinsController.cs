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

        [HttpGet]
        public async Task<ActionResult<Coin[]>> GetCoins()
        {
            Coin[] coins;
            coins = await db.Coins.ToArrayAsync();
            if (coins == null)
                return NotFound();
            return coins;
        }

        public static int OddMoney;

        [Route("/api/coins/oddmoney/{change}")]
        [HttpGet]
        public async Task<ActionResult<int>> GetOddMoney(int change)
        {
            OddMoney = 0;
            await GetCoinChange("10", change);
            return Ok(OddMoney);
        }        

        public async Task GetCoinChange(string coin, int change)
        {
            int coinvalue_int = Convert.ToInt32(coin);            
            Coin currentcoin = await db.Coins.Where(x => x.Name == coin).FirstOrDefaultAsync();
            if(change/ coinvalue_int <= currentcoin.Count)
            {
                OddMoney += change - change%coinvalue_int;
                currentcoin.Count = currentcoin.Count - Convert.ToInt32(change / coinvalue_int);
                change = change % coinvalue_int;                
            }
            else
            {
                OddMoney += currentcoin.Count * coinvalue_int;
                change = change - currentcoin.Count * coinvalue_int;
                currentcoin.Count = 0;
            }
            db.Entry(currentcoin).State = EntityState.Modified;
            await db.SaveChangesAsync();
            if ((change>0)&&(coinvalue_int != 1))
            {
                await GetCoinChange(Convert.ToString(Convert.ToInt32(coinvalue_int / 2)), change);
            }
        }
    }
}
