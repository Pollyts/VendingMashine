using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;

namespace VendingMashine.Services
{
    public class CoinService : ICoinService
    {
        public CoinService()
        {
        }

        public Task AddCoin(string name)
        {
            throw new NotImplementedException();
        }

        public Task BlockCoin(string name)
        {
            throw new NotImplementedException();
        }

        public Task ChangeCoinCount(Coin newcoin)
        {
            throw new NotImplementedException();
        }

        public Task GetCoinChange(string coin, int change)
        {
            throw new NotImplementedException();
        }

        public Task<Coin[]> GetCoins()
        {
            throw new NotImplementedException();
        }

        public Task GetOddMoney(int change)
        {
            throw new NotImplementedException();
        }
    }
}
