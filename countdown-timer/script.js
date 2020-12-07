const newYears = '1 Jan 2021'

function countdown(){
  const newYearsDate = new Date(newYears);
  const currentDate = new Date();

  const seconds = new Date(newYearsDate - currentDate) * 1000;
  const days = Math.floor(seconds / 3600 / 24)
}

countdown()

