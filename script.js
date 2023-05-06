const card = document.querySelector('.card');
const button = document.querySelector('.search-button');
const input = document.querySelector('.input')
const name = document.querySelector('.current-city');
const time = document.querySelector('.time');
const deg = document.querySelector('.deg');
const desc = document.querySelector('.desc');
const addButton = document.querySelector('.add-button');
const list = document.querySelector('.list');

let myList = [];



desc.textContent = "Search for a city" ;


/* adding functionalities to the search button */

button.addEventListener('click', () => {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=4e4edf736ed67c868cfd39a9c336d3f3')
  .then(response => response.json())
  
  .then(data => {
    console.log(data);
    name.textContent = data['name'];
    let tempKelvin =  data['main']['temp'] ;
    let tempCelsius = Math.floor((tempKelvin - 273.15))  ;
    deg.textContent = tempCelsius;
    deg.textContent += '°';
    desc.textContent = data['weather'][0]['description'];
    addButton.style.display = 'block';
  
    /* checking if the saved list already includes the new searched city */


    if(myList.some(city => city.name == name.textContent)){
      addButton.style.backgroundColor = 'rgb(74, 91, 245)';
      addButton.textContent = 'remove from list';
    }
    else{
      addButton.style.backgroundColor = 'white';
      addButton.textContent = 'add to list';
    }
   
  
  })
  

  .catch(err => alert('invalid city'));
});
input.addEventListener('keypress' ,(e)=> {
  if (e.key === "Enter") {
    
    e.preventDefault();
    
   button.click();
  }
})

function City(name , temp , description){
  this.name = name ;
  this.temp = temp ;
  this.description = description ;
}

myList.forEach(city => {
  const new_city = document.createElement('div');
  new_city.classList.add("city");
  const newText = document.createElement("p"); 
  newText.classList.add("city-name");
  newText.textContent = city.name ;
  new_city.appendChild(newText);
  list.appendChild(new_city);
 
  new_city.addEventListener('click', (e) => {

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city['name']+'&appid=4e4edf736ed67c868cfd39a9c336d3f3')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      name.textContent = data['name'];
      let tempKelvin =  data['main']['temp'] ;
      let tempCelsius = Math.floor((tempKelvin - 273.15))  ;
      deg.textContent = tempCelsius;
      deg.textContent += '°';
      desc.textContent = data['weather'][0]['description'];
      
     addButton.style.display = 'block';
     addButton.style.backgroundColor = 'rgb(74, 91, 245)';
     addButton.textContent = 'remove from list';
     addButton.style.color = 'white'


    })
  

})
})
/* adding functionalities to the add to list button */

addButton.addEventListener('click' , (e) => {
  let cities = list.querySelectorAll('div');

  let currentCity = Array.from(cities).find(city => city.textContent == name.textContent ) ;
  
  if(myList.some(city => city.name == name.textContent)){
    myList.splice(myList.indexOf(currentCity),1);
    console.log(myList)
    list.removeChild(currentCity);
    addButton.style.backgroundColor = 'white';
    addButton.textContent = 'add to list';
  }

  else{
   
   let item = new City(name.textContent , deg.textContent , desc.textContent);
   myList.push({...item});
    let new_city = document.createElement('div');
    new_city.classList.add("city");
    let newText = document.createElement("p"); 
    newText.classList.add("city-name");
    newText.textContent = name.textContent ;
    new_city.appendChild(newText);
    list.appendChild(new_city);
     
  new_city.addEventListener('click', (e) => {

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+newText.textContent+'&appid=4e4edf736ed67c868cfd39a9c336d3f3')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      name.textContent = data['name'];
      let tempKelvin =  data['main']['temp'] ;
      let tempCelsius = Math.floor((tempKelvin - 273.15))  ;
      deg.textContent = tempCelsius;
      deg.textContent += '°';
      desc.textContent = data['weather'][0]['description'];
      
     addButton.style.display = 'block';
     addButton.style.backgroundColor = 'rgb(74, 91, 245)';
     addButton.textContent = 'remove from list';


    })
  

})
 
  addButton.style.backgroundColor = 'rgb(74, 91, 245)';
  addButton.textContent = 'remove from list';
  }


})

  
  
   

    
 
  
   
   
 
 
 



