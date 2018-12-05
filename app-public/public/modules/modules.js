// card-header
// card-body

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
            <a class="nav-link" href="#" onclick="loadDashboard()">Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Analytics</a>
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
    <div class="card-deck">
      <div class="card">
        <div class="card-block" id="traffic-image">
        <!--Load image dynamically from the ui.carImage below-->
        </div>
      </div>
      <div class="card">
        <div class="card-block" id="car-table-card">
          <h4 class="card-title" align="center">Cars in Image</h4>
          <div id="car-analyze-toolbar">
            <button id="table-button" class="btn btn-secondary btn-lg btn-block" align="center" onclick="onClickAnalyze()">Analyze</button>
          </div>
        <!--Dynamic Car table goes here from ui.carTable below-->
          <div id="car-table-placeholder"></div>
        </div>       
      </div>
      <div class="card">
        <div class="card-block" id="ad-table-card">
          <h4 class="card-title" align="center">Image Stats</h4>
          <div id="ad-stat-toolbar">
            <button id="stats-button" class="btn btn-secondary btn-lg btn-block" align="center" onclick="onClickStats()">Return Ad Stats</button>
          </div>
          <div id="ad-table-placeholder"></div>
        </div>   
      </div>
      </div>
      <div class="card">
        <div class="card-block">
          <h4 class="card-title" align="center">Ad Placeholder</h4>
        </div>
        <p class="card-text">We will input the ads here as the update occurs.</p>
      </div>
    </div>
`;

var navigation      = document.getElementById('navigation');
var target          = document.getElementById('target');

// Load Dashboard Front Page
var loadDashboard = function() {
    target.innerHTML = ui.containers;
    document.getElementById('traffic-image').innerHTML = ui.carImageCard;
};

// Load Car Image

ui.carImageCard=`
    <h4 class="card-title" align="center">Traffic Image</h4>
    <div id="image-toolbar">
        <button id="image-button" class="btn btn-secondary btn-lg btn-block" onclick="loadPicture()">Load Image</button>
    </div>
    <div id="image-placeholder"></div>
    <p class="card-text"></p>
    
`;

ui.carImage=`
<img id="car-image" class="img" src="https://blockchainrandall.me/motor-trend-group.jpg" >
`;

var loadPicture = function(){
    document.getElementById('image-placeholder').innerHTML = ui.carImage;
    getImageData(1);
    getAdData(1);
    document.getElementById('car-table-placeholder').innerHTML = ui.carTable;
    document.getElementById('ad-table-placeholder').innerHTML = ui.adCatTable;

    //document.getElementById('car-table-card').innerHTML = ui.carTable;
};


var onClickAnalyze = function() {
    console.log("analyze button clicked");

    var image = {image: document.getElementById("car-image").src};
    var xmlhttp = new XMLHttpRequest();
    var result;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            result = xmlhttp.responseText;
        }
    };

    xmlhttp.open("POST", "/image");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(image));
    console.log(xmlhttp);

    loadCarTable(carJSON);
};

// Load Image Cars Table

ui.carTable=`
  <table class="table table-sm" id="car-table" data-toggle="table" data-toolbar="#car-analyze-toolbar">
    <thead>
        <tr>
            <th data-field="make">Make</th>
            <th data-field="car_model">Model</th>
            <th data-field="color">Color</th>
            <th data-field="veh_type">Type</th>
            <th data-field="confidence">Confidence</th>
        </tr>
    </thead>
`;

ui.adCatTable=`
    <table class="table table-sm" id="ad-table" data-toggle="table" data-toolbar="#ad-stat-toolbar">
    <thead>
        <tr>
            <th data-field="cat_count">Count</th>
            <th data-field="ad_category">Category</th>
            <th data-field="description">Description</th>
        </tr>
    </thead>
`;


var $carTable, $adTable, carJSON, adJSON;


var getImageData = function(imageID) {
    $.getJSON("http://localhost:80/api/image/" + imageID, function(json) {
        carJSON = json.data;
        console.log(carJSON);
    });
};


var loadCarTable = function (tableJSON) {
    $carTable = $('#car-table');
    console.log($carTable);
    $(function () {
        console.log('analyzing');
        $carTable.bootstrapTable({'data': tableJSON});
        // console.log($table);
    });
};

// Analyze for Ad

var getAdData = function(imageID) {
    $.getJSON("http://localhost:80/api/ads/" + imageID, function(json) {
        adJSON = json.data;
        console.log(adJSON);
    });
};


var loadAdTable = function (tableJSON) {
    $adTable = $('#ad-table');
    console.log($adTable);
    $(function () {
        console.log('returning add count');
        $adTable.bootstrapTable({'data': tableJSON});
    })
};


var onClickStats = function () {
    loadAdTable(adJSON);
};


var defaultModule = function(){
    target.innerHTML = ui.default;
};


navigation.innerHTML += ui.navigation;

loadDashboard();
//defaultModule();
