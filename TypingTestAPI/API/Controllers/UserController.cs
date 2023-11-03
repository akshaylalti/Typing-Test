using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly UserContext context;
        public UserController(UserContext _context)
        {
            context = _context;
        }

        // Will Insert the User and return the ID as response
        [HttpPost("CreateUser")]
        public IActionResult Create(User user)
        {
            if (context.Users.Where(u => u.Email == user.Email).FirstOrDefault() != null)
            {
                return Ok("already exists");
            }
            context.Users.Add(user);
            context.SaveChanges();
            var id = context.Users.OrderByDescending(p => p.UserId).FirstOrDefault().UserId;
            return Ok(id);
        }

        [HttpGet("LoginUser")]
        public IActionResult LoginUser(string email, string pass)
        {
            var isValid = context.Users.Where(u => u.Email == email && u.Pwd == pass).FirstOrDefault();
            if (isValid != null)
            {
                return Ok(isValid);
            }
            return Ok(new { error = "does not exist" });
        }
    }
}
