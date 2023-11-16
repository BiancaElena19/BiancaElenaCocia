var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    
  }).addTo(map);

  
function easyButtons() {
  if (loadOnce.length == 0) {
      L.easyButton( '<i class="bi bi-info-lg" data-bs-toggle="modal" data-bs-target="#infoModal"></i>', function(){}).addTo(map);
     loadOnce.push(1);
  }
}

 
  
    

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
                
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                console.log(jqXHR);
            }
          });
      });
     

     

   
    


     



        


         




       
        
       
    



        