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
      var userData = data['response']['Response']['data']
      var definitions = data['response']['Response']['definitions']
      switch(data.action) {
        case 'history':
          handleHistory(userData, definitions);
          break;
        case 'progression':
          break;
        case 'unique':
          break;
        case 'summary':
          break;
      }
    })
  })
}

var handleHistory = function(userData, definitions) {
  var activities = []
  _.each(userData.activities, function(activity){
    _.find(definitions['activities'], function(activityDefinition) {
      if (activityDefinition.activityHash === activity.activityDetails.referenceId) {
        activities.push([activity, activityDefinition]);
      }
    })
  })
  fillOutActivityHistory(activities);
}

var fillOutProfileData = function(data){
  var template = $('#gatherInfo').html();
  var template = Handlebars.compile(template);
  var context = {'info': data};
  var compiledHTML = template(context);
  $('#gatheredData').html(compiledHTML);
}

var fillOutActivityHistory = function(data) {
  var template = $('#activityHistory').html();
  var template = Handlebars.compile(template);
  var context = {'game': data};
  var compiledHTML = template(context);
  $('#dataHere').html(compiledHTML);
}



// _.each(userData, function(someThing){
//         _.each(someThing, function(secondThing){
//           if (typeof secondThing === 'object') {
//             _.find(definitions['activities'], function(newItem) {
//               if (secondThing.activityHash === newItem.activityHash) {
//                 activities.push(newItem)
//               }
//             })
//           }
//         })
//         activityHistory(activities);
//       })