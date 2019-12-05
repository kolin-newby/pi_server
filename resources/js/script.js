// script.js

var display_data = [];
for (var index = 0; index < entry_count; index++) {
    var entry = {
        volume: '#{display_data[index].volume}',
        time: '#{display_data[index].time}'
    };
    display_data.push(entry);
}