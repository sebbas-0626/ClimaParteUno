
/*Funcion inicial arranque - arrow function (promises)*/
window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperaturaDes = document.querySelector('.descripcion-temperatura');
    let temperaturaGrad = document.querySelector('.grados-temperatura');
    let zonaHoraria = document.querySelector('.locacion-zonahoraria');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`;

            fetch(api)
                .then(response=>{
                    return response.json();
                })
                .then(data=>{
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    //darle valores a la clase en html
                    temperaturaDes.textContent = summary;
                    temperaturaGrad.textContent = temperature;
                    zonaHoraria.textContent = data.timezone;

                    //pintar el icono
                    setIconos(icon, document.querySelector(".icono"));
                })
        });
    }
    //función para llamar los iconos
    function setIconos(icon, iconId){
        const skycons = new Skycons({color:"white"});
        const iconoActual = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[iconoActual]);
    }

});