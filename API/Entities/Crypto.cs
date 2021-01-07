using System;

namespace API.Entities
{
    public class Crypto
    {
        public int Id { get; set; }
        public string Currency { get; set; }
        public DateTimeOffset Date { get; set; }
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Close { get; set; }
        public long Volume { get; set; }
        public long MarketCap { get; set; }

    }
}