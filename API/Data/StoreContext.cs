using Microsoft.EntityFrameworkCore;
using API.Entities;
using System.Reflection;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Crypto> Cryptos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // override the configuration when creating model from entity
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }

}