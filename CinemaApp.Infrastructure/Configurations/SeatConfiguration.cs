using CinemaApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CinemaApp.Infrastructure.Configurations
{
    public class SeatConfiguration : IEntityTypeConfiguration<Seat>
    {
        public void Configure(EntityTypeBuilder<Seat> builder)
        {
            builder.HasQueryFilter(s => s.DeletedAt == null);

            builder.HasIndex(s => new { s.HallId, s.Row, s.Number }).IsUnique();

            builder.HasOne(s => s.Hall)
                   .WithMany(h => h.Seats)
                   .HasForeignKey(s => s.HallId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}