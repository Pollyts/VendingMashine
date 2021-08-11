using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;

namespace VendingMashine._Database.Interfaces
{
    public interface ICoinRepository
    {
		Task AddCoin(string name);
		Task ChangeCoinCount(CoinForCount newcoin);
		Task<UserCoin[]> GetUserCoins();
		Task<AdminCoin[]> GetAdminCoins();
		Task BlockCoin(string name);
		Task<int> GetOddMoney(int change);
		Task GetCoinChange(string coin, int change);
	}
}
