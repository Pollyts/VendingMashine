using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using VendingMashine.Models;
using Microsoft.EntityFrameworkCore;

namespace VendingMashine.Models
{
    public class DrinkWithImage
    {
        public IFormFile Image { get; set; }
    }
}
