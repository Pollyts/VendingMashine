using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;

namespace VendingMashine.Services
{
    public interface ICoinService
    {
		Task AddCoin(string name);
		Task ChangeCoinCount(CoinForCount newcoin);
		Task<AdminCoin[]> GetAdminCoins();
		Task<UserCoin[]> GetUserCoins();		
		Task BlockCoin(string name);
		Task<int> GetOddMoney(int change);
	}
}

