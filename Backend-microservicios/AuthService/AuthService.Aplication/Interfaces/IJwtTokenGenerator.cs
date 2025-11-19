using AuthService.Aplication.Commons;
using AuthService.Aplication.Dtos;
using AuthService.Domain.Entities;

namespace AuthService.Aplication.Interfaces
{
    public interface IJwtTokenGenerator
    {
        BaseResponse<string> GenerateToken(ApplicationUser user);
    }
}
