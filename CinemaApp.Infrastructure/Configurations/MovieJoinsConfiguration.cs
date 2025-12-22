using CinemaApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CinemaApp.Infrastructure.Configurations
{
    public class MovieGenreConfiguration : IEntityTypeConfiguration<MovieGenre>
    {
        public void Configure(EntityTypeBuilder<MovieGenre> builder)
        {
            builder.HasKey(mg => new { mg.MovieId, mg.GenreId }); 

            builder.HasOne(mg => mg.Movie)
                   .WithMany(m => m.MovieGenres)
                   .HasForeignKey(mg => mg.MovieId);

            builder.HasOne(mg => mg.Genre)
                   .WithMany(g => g.MovieGenres)
                   .HasForeignKey(mg => mg.GenreId);
        }
    }

    public class MovieActorConfiguration : IEntityTypeConfiguration<MovieActor>
    {
        public void Configure(EntityTypeBuilder<MovieActor> builder)
        {
            builder.HasKey(ma => new { ma.MovieId, ma.ActorId });

            builder.HasOne(ma => ma.Movie)
                   .WithMany(m => m.MovieActors)
                   .HasForeignKey(ma => ma.MovieId);

            builder.HasOne(ma => ma.Actor)
                   .WithMany(a => a.MovieActors)
                   .HasForeignKey(ma => ma.ActorId);
        }
    }
}