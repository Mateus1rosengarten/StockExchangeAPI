const marqueeDiv = document.getElementById("marquee");

class CreatingMarquee {
  constructor(marqueeResults) {
    this.marqueeResults = marqueeResults;
  }

  renderingDiv() {
    let containerMarqueeResults = document.createElement("div");
    containerMarqueeResults.classList.add("marquee");
    this.marqueeResults.appendChild(containerMarqueeResults);
    this.fetchingMarqueeData(containerMarqueeResults);
  }

  fetchingMarqueeData(resultContainer) {
    fetch("https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com//api/v3/quotes/nyse")
      .then((response) => response.json())
      .then((result) => {
        console.log("marquee results:", result);

        for (let i = 0; i < 500; i++) {
          this.printingOnscreen(resultContainer, result[i]);
        }
      });
  }

  printingOnscreen(resultContainer, data) {
    resultContainer.innerHTML +=
      `<span>${data.symbol}</span>` +
      `<span class ="price-color"> <span class="dollar-signal">$</span>${data.price}</span>` +
      `   `;
  }
}
