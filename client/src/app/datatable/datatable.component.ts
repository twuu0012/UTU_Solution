import { Component, OnInit } from '@angular/core';
import { ICoin } from '../shared/models/coindata';
import { ICrypto } from '../shared/models/crypto';
import { DatatableService } from './datatable.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  data: ICrypto[] = [];
  arryDate: string[] = [];

  constructor(private dtService: DatatableService) { }

  ngOnInit() {
    this.getCryptos();
    
  }

  getCryptos(){
    this.dtService.getCryptos().subscribe(
      (response) => {
        // console.log(response);
        this.data = response;
        this.getCalculatedData();
      }, error => {
        console.log(error);
      }
    )
  }

  getDate(){
    // get all unique dates
    let dates: string[] = [];
    this.data.forEach(d => {
      dates.push(d.date);
    });
    
    let uniDates = dates.filter((v, i, a) => a.indexOf(v) == i);
    // sort date descending
    this.arryDate = uniDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    console.log(this.arryDate);
  }

  getCalculatedData(){
    // TODO:
    // 1. get all dates
    this.getDate();
    const latestDate = this.arryDate[0];
    const yesterdayDate = this.arryDate.find(v => new Date(v).getDate() == new Date(latestDate).getDate() - 1);
    // days * hours * mins * secs * milliseconds
    const lastWeekDate = this.arryDate.find(v => new Date(v).getTime() == new Date(latestDate).getTime() - 7 * 24 * 60 * 60 * 1000);
    // get same day of last month
    const lastMonthDate = this.arryDate.find(v => new Date(v).getTime() == new Date(latestDate).setMonth(new Date(latestDate).getMonth() - 1));
    
    // 2. get all cryptos based on different date
    // get latest cryptos
    const latestCryptos = this.data.filter(v => v.date == latestDate);

    // get yesterday 
    const yesterdayCryptos = this.data.filter(v => v.date == yesterdayDate);

    // get 7 days ago
    const lastWeekCryptos = this.data.filter(v => v.date == lastWeekDate);

    // get last month the same day
    const lastMonthCryptos = this.data.filter(v => v.date == lastMonthDate);

    // 3. calculate change difference
    const coins: ICoin[] = [];
    latestCryptos.forEach(c => {
      const yesterdayCoin = yesterdayCryptos.find(x => x.currency == c.currency);
      const lastWeekCoin = lastWeekCryptos.find(x => x.currency == c.currency);
      const lastMonthCoin = lastMonthCryptos.find(x => x.currency == c.currency);

      // change difference: (today - yesterday) / yesterday * 100
      const coin: ICoin = {
        coinName: c.currency,
        price: c.close,
        dailyDiff: (c.close - yesterdayCoin.close) / yesterdayCoin.close,
        monthDiff: (c.close - lastMonthCoin.close) / lastMonthCoin.close,
        weekDiff: (c.close - lastWeekCoin.close) / lastWeekCoin.close,
        dailyVolume: c.volume,
        marketCap: c.marketCap
      }

      coins.push(coin);
    });

    // 4. sort by market cap
    coins.sort((a, b) => b.marketCap - a.marketCap);
    

  }

}
