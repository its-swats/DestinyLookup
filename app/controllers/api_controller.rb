class ApiController < ApplicationController

  def gather
    response = HTTParty.get("http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/All/#{params[:name]}/",
      :headers => {"X-API-Key" => BUNGIE_KEY})
    membership_type = response.parsed_response['Response'][0]['membershipType']
    membership_id = response.parsed_response['Response'][0]['membershipId']
    response = HTTParty.get("http://www.bungie.net/Platform/Destiny/#{membership_type}/Account/#{membership_id}/Summary/",
      :headers => {"X-API-Key" => BUNGIE_KEY})
    character_one = response.parsed_response['Response']['data']['characters'][0]['characterBase']['characterId']
    character_two = response.parsed_response['Response']['data']['characters'][1]['characterBase']['characterId']
    character_three = response.parsed_response['Response']['data']['characters'][2]['characterBase']['characterId']
    render json: {:membershipType => membership_type,
                  :membershipId => membership_id,
                  :characterOne => character_one,
                  :characterTwo => character_two,
                  :characterThree => character_three}
  end

  def history
    response = HTTParty.get("http://www.bungie.net/Platform/Destiny/Stats/ActivityHistory/#{params[:membershipType]}/#{params[:membershipId]}/#{params[:charSelect]}/?mode=NightFall&page=0&count=100&definitions=True",
                            :headers => {"X-API-Key" => BUNGIE_KEY})
    returnData(response, params[:action])
  end

  def progression
    response = HTTParty.get("http://www.bungie.net/Platform/Destiny/#{params[:membershipType]}/Account/#{params[:membershipId]}/Character/#{params[:charSelect]}/Progression/?definitions=True",
                            :headers => {"X-API-Key" => BUNGIE_KEY})
    returnData(response, params[:action])
  end

  def unique
    response = HTTParty.get("http://www.bungie.net/Platform/Destiny/Stats/UniqueWeapons/#{params[:membershipType]}/#{params[:membershipId]}/#{params[:charSelect]}/?definitions=True",
                            :headers => {"X-API-Key" => BUNGIE_KEY})
    returnData(response, params[:action])
  end

  def summary
    response = HTTParty.get("http://www.bungie.net/Platform/Destiny/#{params[:membershipType]}/Account/#{params[:membershipId]}/Character/#{params[:charSelect]}/?definitions=True",
                            :headers => {"X-API-Key" => BUNGIE_KEY})
    returnData(response, params[:action])
  end

private

  def returnData(response, action)
    render json: {response: response.parsed_response,
                  action: action
                  }
  end

  # def stats
  #   response = HTTParty.get("http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/All/#{params[:name]}/",
  #     :headers => {"X-API-Key" => BUNGIE_KEY})
  #   membership_type = response.parsed_response['Response'][0]['membershipType']
  #   membership_id = response.parsed_response['Response'][0]['membershipId']
  #   response = HTTParty.get("http://www.bungie.net/Platform/Destiny/Stats/Account/#{membership_type}/#{membership_id}/",
  #     :headers => {"X-API-Key" => BUNGIE_KEY})

  #   render json: {
  #     :PvE => response.parsed_response['Response']['mergedAllCharacters']['results']['allPvE']['allTime'],
  #     :PvP => response.parsed_response['Response']['mergedAllCharacters']['results']['allPvP']['allTime'] 
  #   }
  # end

end