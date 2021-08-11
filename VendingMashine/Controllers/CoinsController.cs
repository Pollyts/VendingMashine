using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;
using VendingMashine.Services;

namespace VendingMashine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinsController : ControllerBase
    {
        ICoinService _coinService;
        public CoinsController(ICoinService coinService)
        {
            _coinService = coinService;
        }
        [HttpGet("{name}")]
        public async Task AddCoin(string name)
        {
            await _coinService.AddCoin(name);
        }

        [HttpPut]
        public async Task ChangeCoinCount(CoinForCount newcoin)
        {
            await _coinService.ChangeCoinCount(newcoin);
        }

        [HttpGet]
        [Route("/api/coins/user")]
        public async Task<UserCoin[]> GetCoinsForUser()
        {
            return await _coinService.GetUserCoins();
        }
        [HttpGet]
        public async Task<AdminCoin[]> GetCoinsForAdmin()
        {
            return await _coinService.GetAdminCoins();
        }

        [Route("/api/coins/block/{name}")]
        [HttpGet]
        public async Task BlockCoin(string name)
        {
            await _coinService.BlockCoin(name);
        }

        

        [Route("/api/coins/oddmoney/{change}")]
        [HttpGet]
        public async Task<int> GetOddMoney(int change)
        {
            return await _coinService.GetOddMoney(change);
        } 
    }
}
