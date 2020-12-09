const urlInput = document.getElementById('urlInput')
const themeSwitcher = document.getElementById('theme-switcher');
const loader = document.getElementById('loader');
const ulResults = document.getElementById('results');

let baseApiUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='
let apiKey = 'AIzaSyBRPIT29qvlQ3p7pxuw9XFZVqnzRc-xmII';
let url = '';
let strategy = ['mobile','desktop'];
let results = [];


themeSwitcher.addEventListener('click', ()=>{
  themeSwitcher.checked ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme')
})


submitURL = (e, strategy) =>{
  e.preventDefault()
  results = []
  ulResults.innerHTML = ''
  let url = urlInput.value;
  
  loader.classList.remove('d-none');
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
  }, 1000);
  
  strategy.forEach( strategy => {
    callApi(url,strategy);
  });

  resetFields()
}


resetFields = () =>{
  urlInput.value = '';
}

callApi = async (url,strategy) =>{
  let apiUrl = `${baseApiUrl}${url}&strategy=${strategy}&key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  loader.classList.add("d-none")

  results.push(data)

  results.map(result =>{
    ulResults.insertAdjacentHTML("afterbegin",
    `<section class="${result.lighthouseResult.configSettings.emulatedFormFactor}-strategy">
    Your website overall ${result.lighthouseResult.configSettings.emulatedFormFactor} performance is ${result.loadingExperience.overall_category}.
    </section>
    ` 
  )

})
}