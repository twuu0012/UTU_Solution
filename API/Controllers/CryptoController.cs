using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CryptoController : ControllerBase
    {
        private readonly StoreContext _context;
        public CryptoController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Crypto>>> GetAllCryptosAsync()
        {
            var data = await _context.Cryptos.ToListAsync();

            // var result = from d in data
            //              group d by d.Currency into newGroup
            //              select newGroup;

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Crypto>> GetCryptoById(int id)
        {
            var data = await _context.Cryptos.FirstOrDefaultAsync(c => c.Id == id);

            return Ok(data);
        }
    }
}