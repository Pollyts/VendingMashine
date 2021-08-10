using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine._Database.Interfaces;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;


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
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                Coin coin = await db.Coins.Where(x => x.Name == name).FirstAsync();
                coin.Count++;
                db.Entry(coin).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }

        public async Task BlockCoin(string name)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                Coin coin = await db.Coins.Where(x => x.Name == name).FirstAsync();
                coin.IsBlocked = !coin.IsBlocked;
                db.Entry(coin).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }

        public async Task ChangeCoinCount(Coin newcoin)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                Coin oldcoin = await db.Coins.Where(x => x.Id == newcoin.Id).FirstAsync();
                oldcoin.Count = newcoin.Count;
                db.Entry(oldcoin).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
        }

        public async Task GetCoinChange(string coin, int change)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                int coinvalue_int = Convert.ToInt32(coin);
                Coin currentcoin = await db.Coins.Where(x => x.Name == coin).FirstOrDefaultAsync();
                if (change / coinvalue_int <= currentcoin.Count)
                {
                    OddMoney += change - change % coinvalue_int;
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
                if ((change > 0) && (coinvalue_int != 1))
                {
                    await GetCoinChange(Convert.ToString(Convert.ToInt32(coinvalue_int / 2)), change);
                }
            }
        }

        public async Task<Coin[]> GetCoins()
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                Coin[] coins;
                coins = await db.Coins.ToArrayAsync();
                return coins;
            }
        }

        public static int OddMoney;

        public async Task<int> GetOddMoney(int change)
        {
            using (var db = ContextFactory.CreateDbContext(ConnectionString))
            {
                OddMoney = 0;
                await GetCoinChange("10", change);
                return OddMoney;
            }
        }
    }
}
