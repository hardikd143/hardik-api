const url = "http://127.0.0.1:3002/all"
const getData = async()=>{
    fetch(url)
  .then(response => response.json())
  .then(data => console.log(data.length));
}
getData()