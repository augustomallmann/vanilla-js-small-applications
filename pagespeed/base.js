// var STRATEGIES = ['desktop', 'mobile'];
const urlInput = document.getElementById('urlInput')
const strategySelector = document.getElementById('strategySelector')

let url = '';
let strategy = '';
let baseApiUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='

submitURL = e =>{
  let url = urlInput.value;
  let strategy = strategySelector.value;
  e.preventDefault()
  
  try {
    new URL(url);
  } catch (_) {
    urlInput.classList.add('wrong-url')
    console.log('url inválida')
    return false;  
  }

  urlInput.classList.remove('wrong-url')
  urlInput.classList.add('correct-url')
  
  setTimeout(() =>{
    urlInput.classList.remove('correct-url')
  }, 1000)
  
  callApi(url,strategy);
  resetFields()
}

resetFields = () =>{
  urlInput.value = '';
}

 callApi = async (url,strategy) =>{
  let apiUrl = `${baseApiUrl}${url}&strategy=${strategy}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  displayResultsOnScreen(data)
}

displayResultsOnScreen = (data) => {
  let fid = data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category;
  let lcp = data.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.category;
  let cls = data.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category;

console.log(fid,lcp,cls)
}
