const mainform = document.getElementById("form");
const divResultSearch = document.getElementById("results");

class CreatingForm {
  constructor(myform) {
    this.myform = myform;
  }

  renderingSearchElements() {
    const createSearchDiv = document.createElement("div");
    createSearchDiv.classList.add("bg-light", "py-5", "justify-content-center");
    this.myform.appendChild(createSearchDiv);

    const createSearchForm = document.createElement("form");
    createSearchForm.classList.add(
      "form-inline",
      "justify-content-center",
      "mt-2"
    );
    createSearchForm.type = "submit";
    createSearchDiv.appendChild(createSearchForm);

    const createSearchInput = document.createElement("input");
    createSearchInput.classList.add("form-control", "mr-sm-2", "search-input");
    createSearchInput.type = "search";
    createSearchInput.id = "inputSearch";
    createSearchForm.appendChild(createSearchInput);

    const createButtonSearch = document.createElement("button");
    createButtonSearch.classList.add("btn-lg", "btn-outline-success");
    createButtonSearch.type = "submit";
    createButtonSearch.innerHTML = "Search";
    createSearchForm.appendChild(createButtonSearch);

    const fetchingCompaniesData = async (resCompanies) => {

      const inputSearchValue = createSearchInput.value;
      const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputSearchValue}&limit=10&exchange=NASDAQ`;
      const response = await fetch(url);
      const result = await response.json();
      console.log("CompanieDataResult", result);

      result.map(async (eachCompany) => {
      
        const resp = await fetch(
          `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${eachCompany.symbol}`
        );
        const result = await resp.json();
        console.log("symbolDataResult", result);
        resCompanies.push(result);
        
        const SearchEvent = new CustomEvent("search", {
          detail: { data: resCompanies },
        });
  
        document.dispatchEvent(SearchEvent);


      })


   

    };

    createButtonSearch.addEventListener("click", function (event) {
      event.preventDefault();

      let companies = [];
      let resultCompanies = [];
      divResultSearch.innerHTML = "";

      fetchingCompaniesData(resultCompanies);
    });
  }
}
