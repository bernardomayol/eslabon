using System;
using Microsoft.AspNetCore.Identity;

namespace core.Entities.Identity
{
        public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public bool IsActive { get; set; } = true;
        public SexType Genero { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
    }
}