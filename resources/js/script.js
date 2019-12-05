// script.js

const min_volume = 100;
const max_volume = 300;
const white_volume = (min_volume + max_volume) / 2;
const interval = (max_volume - min_volume) / 32;
const hex_values = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

var volume = volume_for_cell;

var color_value_index;
var color = '#FFFFFF';

if (volume < white_volume)
{
    color_value_index = parseInt((volume - min_volume) / interval);
    color = '#' + hex_values[color_value_index] + hex_values[color_value_index] + 'FF' + hex_values[color_value_index] + hex_values[color_value_index];
}
else if (volume > white_volume)
{
    color_value_index = parseInt((max_volume - volume) / interval);
    color = '#FF' + hex_values[color_value_index] + hex_values[color_value_index] + hex_values[color_value_index] + hex_values[color_value_index];
}