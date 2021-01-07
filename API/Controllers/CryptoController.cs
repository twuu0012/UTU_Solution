using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CryptoController : ControllerBase
    {
        [HttpGet]
        public string GetById()
        {
            return "Hello World";
        }
    }
}