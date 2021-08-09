using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VendingMashine.Models
{
    public class DrinkImage
    {
        public int Id { get; set; }
        public int Drinkid { get; set; }
        public byte[] Image { get; set; }
    }
}
