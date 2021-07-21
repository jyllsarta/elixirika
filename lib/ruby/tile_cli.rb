require "./color_tile_logic.rb"

random = rand(1000000)
puts ColorTileLogic::Board.new(20, 10, 12, 3, random).to_json
