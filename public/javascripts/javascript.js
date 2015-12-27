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
          handleProgression(userData, definitions);
          break;
        case 'unique':
          break;
        case 'summary':
          break;
      }
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

var fillOutActivityHistory = function(data) {
  var template = $('#activityHistory').html();
  var template = Handlebars.compile(template);
  var context = {'game': data};
  var compiledHTML = template(context);
  $('#dataHere').html(compiledHTML);
}

var handleProgression = function(userData, definitions) {
  var factions = []
  _.each(userData.progressions, function(progression) {
    _.find(definitions['progressions'], function(progressionDefinition) {
      if (progressionDefinition.progressionHash === progression.progressionHash) {
        factions.push([progression, progressionDefinition]);
      }
    })
  })
  fillOutProgressionDetails(factions);
}

var fillOutProgressionDetails = function(data) {
  var filtered = _.filter(data, function(pair) {
    return _.has(pair[1], 'identifier');
  })
  var template = $('#progressionDetails').html();
  var template = Handlebars.compile(template);
  var context = {'game': filtered};
  var compiledHTML = template(context);
  $('#dataHere').html(compiledHTML);
}


