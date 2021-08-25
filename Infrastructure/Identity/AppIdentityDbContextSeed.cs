using System.Linq;
using System.Threading.Tasks;
using core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager) 
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bernardo Mayol",
                    Email = "bmayolv@hotmail.com",
                    UserName = "bmayolv@hotmail.com",
                    IsActive = true,
                    Genero = SexType.Male,
                };
                await userManager.CreateAsync(user, "Pa$$W0rd");
            }
        }

    }
}