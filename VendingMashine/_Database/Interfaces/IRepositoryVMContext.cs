using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine.Models;

namespace VendingMashine._Database.Interfaces
{
    public interface IRepositoryVMContext
    {
        VMContext CreateDbContext(string connectionString);
    }
}
