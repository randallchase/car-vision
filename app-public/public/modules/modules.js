var ui = {};

ui.navigation= `
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#" onclick="defaultModule()">Smart Ads</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#" onclick="defaultModule()">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onclick="loadPicture()">Load Picture</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="https://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
`;

ui.default = `
      <h2 align="center">Welcome to Smart Ads!</h2>
`;

ui.containers=`
    <div id ="left" style="float:left; width: 25%;">
        <img class="img-fluid" src="./project_images/motor-trend-group.jpg" width="460" height="345">
    </div>
    <div id ="middle" style="float:none"; width: 50%;">
        <table id="table" class="table table-sm">
            <thead>
                <tr>
                    <th data-field="id">#</th>
                    <th data-field="Make">Make</th>
                    <th data-field="Model">Model</th>
                    <th data-field="Color">Color</th>
                    <th data-field="Recognition Confidence">Confidence</th>
                </tr>
            </thead>
    </div>
    <div id ="right" style = "float:right; width: 25%;">
        <h2>Placeholder<br>Insert Ad Here</h2>

    </div>
`;

var image_url = './project_images/Motor-Trend-group-photo.jpg';


function reduceResult(res) {
    var data = [];
    res.objects.forEach(function(entry) {
        if (entry.vehicleAnnotation.attributes.system.vehicleType === 'car') {
            var singleObj = {};
            singleObj['Make'] = entry.vehicleAnnotation.attributes.system.make.name;
            singleObj['Model'] = entry.vehicleAnnotation.attributes.system.model.name;
            singleObj['Color'] = entry.vehicleAnnotation.attributes.system.color.name;
            singleObj['Recognition Confidence'] = entry.vehicleAnnotation.recognitionConfidence;
        }
    });
    return data
}

function ouputCarTable(res) {
    var $table = $('#table');

    $(function () {
        $('#table').bootstrapTable({
            data: reduceResult(res)
        });
    });
}


ui.carTable=`
    
`

var target     = document.getElementById('target');
var navigation = document.getElementById('navigation');
navigation.innerHTML += ui.navigation;

var defaultModule = function(){
    target.innerHTML = ui.default;
};

var loadPicture = function(){
    target.innerHTML = ui.containers;
};



defaultModule();