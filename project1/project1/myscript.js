var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    
}).addTo(map);

L.easyButton('fa-info-circle',function(){
  $('#countryInfoModal').modal("show");
},'Country Information').addTo(map);

L.easyButton('fa-solid fa-cloud',function(){
  $('#weatherModal').modal("show");
  },'Weather Information').addTo(map);

L.easyButton('fa fa-medkit',function(){
  $('#covidModal').modal("show");
},'Covid Data').addTo(map);

L.easyButton('fa fa-newspaper-o',function(){
  $('#newsModal').modal("show");
},'News Information').addTo(map);






  
var marker = L.marker([51.5, -0.09]).addTo(map);
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);
var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);
    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }
    
    map.on('click', onMapClick);
    var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

var streets = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
    }
  );
  
  var satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
  );
  var basemaps = {
    "Streets": streets,
    "Satellite": satellite
  };


  
  
  
  
  //-----geoJson------
    $.ajax({
        url: "geoJson.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
      console.log('populate options' , result);
          if (result.status.name == "ok") {
              for (var i=0; i<result.data.length; i++) {
                          $('#countrySelect').append(`<option value="${result.data[i].code}">${result.data[i].name}</option>`);
                      }
                  }
              
              
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
              console.log(jqXHR);
          }
        });



        //----getBorder----
      $('#countrySelect').change(function(){
        $.ajax({
          url: "getBorder.php",
          type: 'POST',
          dataType: 'json',
          data:{countryCode: $('#countrySelect').val()},
          success: function(result) {
        console.log('populate options' , result);
            if (result.status.name == "ok") {
                let border = L.geoJSON(result.data[0].geometry).addTo(map);
                map.fitBounds(border.getBounds());
               
                
               
                
                    }
                    covidInfo(code);
                
                    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                console.log(jqXHR);
            }
          });

          // opencage
          $.ajax({
            url: "openCage.php",
            type: 'POST',
            dataType: 'json',
            data:{q: $('#countrySelect option:selected').text()},
            success: function(result) {
          console.log( result);
              if (result.status.name == "ok") {
                  weatherInfo(result.data.lat, result.data.lng);
                  
                  
                 
                  
                      }
                  
                      
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log(textStatus, errorThrown);
                  console.log(jqXHR);
              }
            });

          //---CountryInfo---
    
     $.ajax({
			url: "getCountryInfo.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countrySelect').val(),
				
      },
			 success: function(result) {

				console.log(JSON.stringify(result));
       

				if (result.status.name == "ok") {

					$('#Capital').html(result['data'][0]['capital']);
					$('#Population').html(result['data'][0]['population']);
					$('#Languages').html(result['data'][0]['languages']);
					$('#areaInSqKm').html(result['data'][0]['areaInSqKm']);
          $('#CurrencyCode').html(result['data'][0]['currencyCode']);
        

             
          }
          

          },


        error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
        console.log(jqXHR);
        

        }
		    });



  function weatherInfo(lat, lon)  {
   $.ajax({     
    url:"getWeatherInfo.php",
    type:"GET",
    dataType: "json",
    data: {
      lat: lat,
      lng: lon,
    },
    success: function(result) {

      console.log(JSON.stringify(result));

      if (result.status.name == "ok") {

    
      $('#placeWeather').html(result.data.name);
      $('#tempWeather').html(result.data.main.temp);
      $('#feelslikeWeather').html(result.data.main.feels_like);
      $('#tempmaxWeather').html(result.data.main.temp_max);
      $('#tempminWeather').html(result.data.main.temp_min);
      $('#pressureWeather').html(result.data.main.pressure);
      $('#humidityWeather').html(result.data.main.humidity);

      }
      
				
      
    },
   
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
      console.log(jqXHR);
  
    }  
    
  
  });






  function covidInfo(country){
    
    
    $.ajax({     
      url:"getCovidInfo.php",
      type:"GET",
      dataType: "json",
      data: {
        covidCountry: code,
      },
      success: function(result) {

        console.log(JSON.stringify(result));
  
        if (result.status.name == "ok") {
              
           
            $('#covidContinent').html(result['data'][0]['covidContinent']);
            $('#covidCountry').html(result['data'][0]['covidCountry']);
            $('#covidPopulation').html(result['data'][0]['covidPopulation']);
            $('#covidCases').html(result['data'][0]['covidCases']);
            $('#covidDeaths').html(result['data'][0]['covidDeaths']);
            $('#covidRecovered').html(result['data'][0]['covidRecovered']);
            
          

        }
  
        
          
        }, 
    
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
          console.log(jqXHR);
      
        }   
  })         
}


}

  





  


});
       

    










      


    






   
 








   
	

     
	



      

     

     

   
    


     



        


         




       
        
       
    



        