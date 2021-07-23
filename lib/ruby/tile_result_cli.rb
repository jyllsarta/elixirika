require "./color_tile_logic.rb"
require "json"

seed = ARGV[0].to_i
clicklogs = JSON.parse!(ARGV[1], symbolize_names: true)
w = ARGV[2].to_i
h = ARGV[3].to_i
colors = ARGV[4].to_i
pairs = ARGV[5].to_i
difficulty = ARGV[6].to_i

sim = ColorTileLogic::ColorTileSimulator.new(seed, clicklogs, w, h, colors, pairs, difficulty)
puts JSON.dump({
  score: sim.score,
  extinct: sim.extinct?
})
