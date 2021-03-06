
const getYearOfAward = async () => {
  const response = fetch(
    "https://data-imdb1.p.rapidapi.com/actor/id/nm0000199/awards/?page_size=50",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": "x-rapidapi-key",
      },
    }
  );
  const data = await (await response).json()

  //     for(let i = 0; i< awards.length; i++){
  // console.log(awards[i].year)
  //     }
  let years = data.results.map(({ year }) => year);

  return years
};

getYearOfAward();

const getCount = async () => {
    const years = await getYearOfAward()

    // Creating Hashtable for Year and it frequency
    const yearOccurrence = {}

    years.forEach(year => {
        if (!yearOccurrence[year]) yearOccurrence[year] = 0
        yearOccurrence[year]++
    });
 
    return yearOccurrence
}

const yearOccurrence =  getCount();


// Representing data in Bar Chart
yearOccurrence.then((result) => {
    const yearsOfAward = Object.keys(result);
    const counts = Object.values(result);


    // Creating chart
    const labels = yearsOfAward
    
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Award Stats",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: counts,
        },
      ],
    };
    
    const config = {
      type: "bar",
      data: data,
      options: {},
    };
    
    new Chart(document.getElementById("myChart"), config);
})


   