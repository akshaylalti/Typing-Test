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
    public class TestController : ControllerBase
    {
        public UserContext context { get; set; }
        public TestController(UserContext _context)
        {
            context = _context;
        }

        [HttpPost("InsertTest")]
        public IActionResult InsertTest(Test test)
        {
            context.Tests.Add(test);
            context.SaveChanges();
            var id = context.Tests.OrderByDescending(p => p.TestId).FirstOrDefault().TestId;
            return Ok(id);
        }

        [HttpGet("GetAllTestsOfUser/{id}")]
        public IActionResult GetAllTestOfUser(int id)
        {
            List<Test> tests = new List<Test>();

            tests = context.Tests.Where(u => u.UserId == id).ToList();

            return Ok(tests);
        }

        [HttpGet("GetSimpleWords")]
        public IActionResult GetSimpleWords()
        {
            var stringFileContent = System.IO.File.ReadAllText("./simpleWords.json");
            return Ok(stringFileContent);
        }

        [HttpGet("GetAdvancedWords")]
        public IActionResult GetAdvancedWords()
        {
            var stringFileContent = System.IO.File.ReadAllText("./advancedWords.json");
            return Ok(stringFileContent);
        }
    }
}
