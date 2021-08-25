using API.Dtos;
using API.Errors;
using core.Entities.Identity;
using core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IPasswordHasher<AppUser> _passwordHash;

        public UsersController(IUserRepository repo, UserManager<AppUser> userManager, IPasswordHasher<AppUser> passwordHash)
        {
            _repo = repo;
            _userManager = userManager;
            _passwordHash = passwordHash;
        }

        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetUsers()
        {
            var users = await _repo.GetUsersAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return Unauthorized(new ApiResponse(401));

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody] UserCrudDto userCrudDto)
        {
                var user = new AppUser
                {
                    DisplayName = userCrudDto.DisplayName,
                    Email = userCrudDto.Email,
                    UserName = userCrudDto.Email,
                    IsActive = true,
                    Genero = userCrudDto.Genero == 1 ? SexType.Male : SexType.Female,
                };
                IdentityResult result = await _userManager.CreateAsync(user, userCrudDto.Password);
                if (result.Succeeded)
                    return Ok();

                List<string> errors = new List<string>();
                foreach (IdentityError error in result.Errors)
                    errors.Add(error.Description);
                var errorResponse = new ApiValidationErrorResponse { Errors = errors.ToArray() };

                return BadRequest(errorResponse);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(string id, [FromBody] UserCrudDto userCrudDto)
        {

            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return Unauthorized(new ApiResponse(401));
            user.Email = userCrudDto.Email;
            user.UserName = userCrudDto.Email;
            user.DisplayName = userCrudDto.DisplayName;
            user.Genero = userCrudDto.Genero == 1 ? SexType.Male : SexType.Female;
            user.PasswordHash = _passwordHash.HashPassword(user, userCrudDto.Password);


            IdentityResult result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return Ok();
            List<string> errors = new List<string>();
            foreach (IdentityError error in result.Errors)
                errors.Add(error.Description);
            var errorResponse = new ApiValidationErrorResponse { Errors = errors.ToArray() };

            return BadRequest(errorResponse);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return Unauthorized(new ApiResponse(401));

            // Desactiva el usuario
            user.IsActive = false;


            IdentityResult result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return Ok();
            List<string> errors = new List<string>();
            foreach (IdentityError error in result.Errors)
                errors.Add(error.Description);
            var errorResponse = new ApiValidationErrorResponse { Errors = errors.ToArray() };

            return BadRequest(errorResponse);
        }
    }
}
