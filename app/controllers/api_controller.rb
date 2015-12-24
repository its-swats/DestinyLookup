class ApiController < ApplicationController

  def index
    response = HTTParty.get("http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/All/#{params[:name]}/",
                            :headers => {"X-API-Key" => BUNGIE_KEY})
    membership_type = response.parsed_response['Response'][0]['membershipType']
    membership_id = response.parsed_response['Response'][0]['membershipId']
    response = HTTParty.get("http://www.bungie.net/Platform/Destiny/Stats/Account/#{membership_type}/#{membership_id}/",
                        :headers => {"X-API-Key" => BUNGIE_KEY})

    render json: {
      :PvE => response.parsed_response['Response']['mergedAllCharacters']['results']['allPvE']['allTime'],
      :PvP => response.parsed_response['Response']['mergedAllCharacters']['results']['allPvP']['allTime'] 
    }
  end

end