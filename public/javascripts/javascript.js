$(document).ready(function(){
  hitApi();
})

var hitApi = function(){
  $('#hitApi').on('click', function(event){
    event.preventDefault();
    var nameSearch = $('#nameSearch').val();
    var response = $.ajax({
      url: 'http://destiny-lookup.herokuapp.com/api',
      type: 'GET',
      data: {name: nameSearch}
    })
    response.done(function(data){
      console.log(data)
      displayPvEData(data['PvE'])
    })
  })
}


var displayPvEData = function(data){
  // debugger;
  var template = $('#displayData').html();
  var template = Handlebars.compile(template);
  var context = {'PvE': data};
  var compiledHTML = template(context);
  $('#dataHere').html(compiledHTML);
}