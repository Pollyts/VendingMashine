using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine._Database.Interfaces;
using VendingMashine.Models;

namespace VendingMashine._Database.Repositories
{
    public class CoinRepository : BaseRepository, ICoinRepository
    {
        public CoinRepository(string connectionString, IRepositoryVMContext contextFactory) :
            base(connectionString, contextFactory)
        {
        }

        public async Task AddCoin(string name)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                //return await context.Coins.ToArray();
                await context.SaveChangesAsync();
            }
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
