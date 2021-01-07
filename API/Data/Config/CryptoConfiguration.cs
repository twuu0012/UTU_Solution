using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Config
{
    public class CryptoConfiguration : IEntityTypeConfiguration<Crypto>
    {
        public void Configure(EntityTypeBuilder<Crypto> builder)
        {
            // customize models
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Currency).HasMaxLength(50).IsRequired();
            builder.Property(p => p.Open).HasColumnType("decimal(18,2)");
            builder.Property(p => p.High).HasColumnType("decimal(18,2)");
            builder.Property(p => p.Low).HasColumnType("decimal(18,2)");
            builder.Property(p => p.Close).HasColumnType("decimal(18,2)");

        }
    }
}