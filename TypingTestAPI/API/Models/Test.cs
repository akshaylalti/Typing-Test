using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Test
    {
        public int TestId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public string Time { get; set; }
        public int Duration { get; set; }
        public string Type { get; set; }
        public int NetWPM { get; set; }
        public int GrossWPM { get; set; }
        public float Accuracy { get; set; }
        public int Characters { get; set; }
        public int CorrectCharacters { get; set; }
        public int WrongCharacters { get; set; }
        public int Words { get; set; }
        public int CorrectWords { get; set; }
        public int WrongWords { get; set; }
    }
}
