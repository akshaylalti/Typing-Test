using System;
using System.Collections.Generic;

namespace API.Models
{
    public class User
    {
        public int UserId { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
        public String Pwd { get; set; }
        public String MemberSince { get; set; }
        public List<Test> Tests { get; set; }
    }
}
