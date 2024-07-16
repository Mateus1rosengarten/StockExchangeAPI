
const containerDOM = document.getElementById('container')
const companyName = document.getElementById('company-name');
const companyImage = document.getElementById('company-image');
const companyPrice = document.getElementById('company-price');
const companychanges = document.getElementById('company-changes');
const companyDescription = document.getElementById('company-description');
const containerResults = document.getElementById('results');
const myLoader = document.getElementById('my-loader');
const duckImage = document.getElementById('imageDuck')
const nasdaqStocksText = document.getElementById('h2AppName')
let resultSearch


class CreatingResult {
  constructor(resultDiv) {
    this.resultDiv = resultDiv;
   
    console.log('resultSearch in Constructor',this.resultSearch)
    
    document.addEventListener("search", (event) => {
      resultSearch = event.detail.data;
      console.log('resultSearchArray:',resultSearch);
      this.renderingResults(resultSearch);
      this.CompanyDetails(resultSearch)
    })
    this.resultDiv = resultDiv;
  };

  renderingResults(company) {

    
    let eachCompanyResult;
    let makeHorizontalDivider;
    this.styleResultsPage();
    

    for (let i in company) {
      eachCompanyResult = document.createElement('p');
      eachCompanyResult.classList.add('div-eachCompany');
      makeHorizontalDivider = document.createElement('hr');
      makeHorizontalDivider.classList.add('hr-deviderCompanys');

      const term = document.getElementById('inputSearch').value;
      const imgCompany = company[i].profile.image;
      const symbCompany = company[i].symbol;
      const nameCompany = company[i].profile.companyName;
      const changesCompany = company[i].profile.changesPercentage;

      
       if(company[i].profile.changesPercentage >= 0) {

        eachCompanyResult.innerHTML = `<img src=${imgCompany} id="imageCompany" class="image-company" onerror= "src='https://via.placeholder.com/300?text=NO+IMAGE+AVAIBLE&txtsize=40'">`
         + `<a href="./company.html?symbol=` + symbCompany + 'a">' + `${this.makingSearchTermHighLigthed(nameCompany,term)} </a>`
         +  `(${this.makingSearchTermHighLigthed(symbCompany,term)})` + ' '
         + `<span class=green-price>` + `(${changesCompany}%)` + `</span>` }
      t
      

      } 

      
    
      
    

    this.resultDiv.appendChild(eachCompanyResult);
    this.resultDiv.appendChild(makeHorizontalDivider);
  }

  styleResultsPage() {
    nasdaqStocksText.style.marginTop = '10vh'
    containerResults.style.marginBottom = '15vh';
    containerResults.style.marginTop = '15vh';
    duckImage.style.display = 'none';

  }

  

  CompanyDetails(res) {

 

    const parameters = new URLSearchParams(location.search);
    const symbol = parameters.get('symbol')
    let companySelected = res.find(company => company.symbol === symbol);

    console.log('restulSearchinMetod',companySelected)
    
    
    // console.log('companySelected',companySelected);
     // myobject = result.profile
        // if (myobject.changes > 0) {
        //   companychanges.style.color = "green";
        // }
        // else {
        //   companychanges.style.color = "red";
        // }

        // this.printingInfo(myobject)
        // this.getHistorieData()
      


  }

  makingSearchTermHighLigthed(originalText,term) {
    let regex = new RegExp(term,"gi"); 
    let newText = originalText.replace(regex, `<mark>$&</mark>`);
    return newText
  }
  
  

  creatingChart(key, value) {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [key[0].date, key[30].date, key[60].date, key[90].date, key[120].date, key[150].date, key[180].date, key[210].date, key[240].date, key[270].date, key[300].date, key[330].date, key[360].date, key[390].date,],
        datasets: [{
          label: 'Stock price history',
          data: [value[0].close, value[30].close, value[60].close, value[90].close, value[120].close, value[150].close, value[180].close, value[210].close, value[240].close, value[270].close, value[300].close, value[330].close, value[360].close, value[390].close,],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  printingInfo(myobjectData) {
    myLoader.style.display = 'none';
    companyImage.innerHTML = `<img src=${myobjectData.image}>`

    companyName.innerHTML = myobjectData.companyName
    companyPrice.innerHTML = `Stock price: $${myobjectData.price}`
    companyChanges.innerHTML = `(${myobjectData.changes}%)`
    companyDescription.innerHTML = myobjectData.description
    if(myobjectData.description.length > 700 ) {
      companyDescription.classList.add('big-description')
    }

  }

  getHistorieData() {

    const parameters = new URLSearchParams(location.search);
    const symbol = parameters.get('symbol')
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)

        this.creatingChart(result.historical, result.historical)

      })

  }

  

}


