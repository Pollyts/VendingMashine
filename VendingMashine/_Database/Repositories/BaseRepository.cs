using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMashine._Database.Interfaces;

namespace VendingMashine._Database.Repositories
{
    public abstract class BaseRepository
    {
        protected string ConnectionString { get; }
        protected IRepositoryVMContext ContextFactory { get; }
        public BaseRepository(string connectionString, IRepositoryVMContext contextFactory)
        {
            ConnectionString = connectionString;
            ContextFactory = contextFactory;
        }
    }
}
