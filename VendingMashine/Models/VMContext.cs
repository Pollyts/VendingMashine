using Microsoft.EntityFrameworkCore;

namespace VendingMashine.Models
{
    public class VMContext : DbContext
    {
        public DbSet<Drink> Drinks { get; set; }
        public DbSet<Coin> Coins { get; set; }
        public DbSet<DrinkImage> DrinkImages { get; set; }


        public VMContext(DbContextOptions<VMContext> options)
            : base(options)
        {

        }
    }
}
