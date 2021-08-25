using core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Interfaces
{
    public interface IUserRepository
    {
        Task<IReadOnlyList<AppUser>> GetUsersAsync();


    }
}
