using System;
using System.Collections.Generic;

namespace DietitianApp.Models
{
    public partial class Document
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public int RefId { get; set; }
        public string RefTable { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? Size { get; set; }
        public string FileType { get; set; }
    }
}
