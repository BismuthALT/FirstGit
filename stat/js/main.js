const backgrondCatalog = ["/stat/img/header_bg_1.png", "/stat/img/header_bg_2.png"];
        const randomImage = backgrondCatalog[Math.floor(Math.random() * backgrondCatalog.length)];
        document.getElementById("header").style.backgroundImage =
            `linear-gradient(to top, rgba(255, 255, 255, 0.9) 0%, 
                            rgba(255, 255, 255, 0.7) 20%, 
                            rgba(255, 255, 255, 0.4) 30%, 
                            rgba(255, 255, 255, 0.1) 50%, 
                            rgba(255, 255, 255, 0) 60%), 
     url(${randomImage})`;

        const slider = document.getElementById('slider')
        const videoSlide = document.querySelectorAll('.videoBlock')
        const leftButtonSlider = document.getElementById('leftButtonSlider')
        const rightButtonSlider = document.getElementById('rightButtonSlider')
        let indexSlider = 0
        const videoPerSlider = 2
        const videoWidth = 550

        function updateSlider(){
            const transformSlider = -indexSlider * videoPerSlider * videoWidth;
            slider.style.transform = `translateX(${transformSlider}px)`;
        }

        
        leftButtonSlider.addEventListener('click', () => {
            indexSlider = Math.max(0, indexSlider - 1);
            updateSlider();
        })

        rightButtonSlider.addEventListener('click', () => {
            if (indexSlider < videoSlide.length / videoPerSlider - 1) {
                indexSlider++;
                updateSlider();
            }
        })

    async function loadRates() {
        const ratesBlock = document.getElementById('rates');
        try {
            const response = await  fetch('https://api.exchangerate-api.com/v4/latest/USD')
            const date = await response.json();

            const {rates} = date

            const selected = ['EUR', 'RUB', 'GBP', 'JPY'];

            const html = selected.map(code =>{
                return `<p><strong>${code}:</strong> ${rates[code]}</p>`;
            }).join('');
        ratesBlock.innerHTML = html;
        } catch(error){
            ratesBlock.innerHTML = 'Ошибка загрузки'
             console.log('Ошибка', error);
             
        }
    }
    loadRates();

    async function loadWeather(){
  const weatherBlock = document.getElementById('weather');
  try {
    const weatherResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=44.9&longitude=34.1&current_weather=true');
    const weatherData = await weatherResponse.json();
    
    const { current_weather } = weatherData;

    const weatherHtml = `
      <p>Температура: ${current_weather.temperature} °C</p>
      <p>Время: ${current_weather.time}</p>
    `;

    weatherBlock.innerHTML = weatherHtml;
  } catch(error){
    weatherBlock.innerHTML = 'Ошибка загрузки';
    console.error(error);
  }
}
loadWeather()


document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const body = {
        name: name,
        message: message
    };
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();
        console.log('Ответ от сервера', result)
    }catch(error){
        console.error('Ошибка при отправе', error)
    }

})

document.getElementById('repitBlock_form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const text = document.getElementById('repitText').value;
    const replaceText = document.getElementById('repitBlock_replaceText')

    const body = {
        text: text
    };
    try{
        const response = await fetch('https://httpbin.org/post',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();
        console.log('Ответ  ',result)        
        replaceText.innerHTML = result.json.text
    }catch(error){
        console.error('Ошибка: ', error)
    }
    
})
const mouseover = document.getElementById('mouseover')

mouseover.addEventListener('mouseover', () => {
    const mouseoverSectionID = document.getElementById('mouseoverSectionID');
    mouseoverSectionID.style.backgroundColor = '#00c8ff';
    console.log('ты навелся');
});
