$(document).ready(function(){
  getProfileData();
  hitApi();
})

var getProfileData = function(){
  $('#searchName').on('click', function(event){
    event.preventDefault();
    var nameSearch = $('#nameSearch').val();
    var response = $.ajax({
      url: 'http://localhost:3000/api_gather',
      type: 'GET',
      data: {name: nameSearch}
    })
    response.done(function(data){
      fillOutProfileData(data);
    })
  })
}

var hitApi = function(){
  $('#gatheredData').on('submit', '#hitApi', function(event){
    event.preventDefault();
    var data = $(this).serialize();
    var target = $(this).children('select')[1].value
    var response = $.ajax({
      url: "http://localhost:3000/api_" + target,
      type: "GET",
      data: data
    })
    response.done(function(data){
      console.log(data)
    })
  })
}


var fillOutProfileData = function(data){
  var template = $('#gatherInfo').html();
  var template = Handlebars.compile(template);
  var context = {'info': data};
  var compiledHTML = template(context);
  $('#gatheredData').html(compiledHTML);
}


var displayPvEData = function(data){
  // debugger;
  var template = $('#displayData').html();
  var template = Handlebars.compile(template);
  var context = {'PvE': data};
  var compiledHTML = template(context);
  $('#dataHere').html(compiledHTML);
}

