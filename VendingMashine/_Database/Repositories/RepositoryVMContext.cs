using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine._Database.Interfaces;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;

namespace VendingMashine._Database.Repositories
{
    public class RepositoryVMContext : IRepositoryVMContext
    {
        public VMContext CreateDbContext(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<VMContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new VMContext(optionsBuilder.Options);
        }
    }
}
