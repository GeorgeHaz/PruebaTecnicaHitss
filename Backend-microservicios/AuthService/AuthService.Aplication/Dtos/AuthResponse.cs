using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthService.Aplication.Dtos
{
    public class AuthResponse
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
