using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;

namespace VendingMashine._Database.Interfaces
{
    interface ICoinRepository
    {
		Task AddCoin(string name);
		Task ChangeCoinCount(Coin newcoin);
		Task<Coin[]> GetCoins();
		Task BlockCoin(string name);
		Task GetOddMoney(int change);
		Task GetCoinChange(string coin, int change);
	}
}
