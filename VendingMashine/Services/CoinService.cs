using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;
using VendingMashine._Database.Interfaces;
using Microsoft.Extensions.Configuration;

namespace VendingMashine.Services
{
    public class CoinService : ICoinService
    {
        ICoinRepository _repository;
        public CoinService(ICoinRepository repository)
        {
            _repository = repository;
        }

        public async Task AddCoin(string name)
        {
            await _repository.AddCoin(name);
        }

        public async Task BlockCoin(string name)
        {
            await _repository.BlockCoin(name);
        }

        public async Task ChangeCoinCount(CoinForCount newcoin)
        {
            await _repository.ChangeCoinCount(newcoin);
        }

        public async Task GetCoinChange(string coin, int change)
        {
            await _repository.GetCoinChange(coin,change);
        }

        public async Task<AdminCoin[]> GetAdminCoins()
        {
            return  await _repository.GetAdminCoins();
        }

        public async Task<UserCoin[]> GetUserCoins()
        {
            return await _repository.GetUserCoins();
        }

        public async Task<int> GetOddMoney(int change)
        {
            return await _repository.GetOddMoney(change);
        }
    }
}
