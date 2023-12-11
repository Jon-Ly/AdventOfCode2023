use std::fs;

pub fn part2() {
    let seeds = fs::read_to_string("inputs/mine/seeds.txt").unwrap();
    let soil_to_seed_data = fs::read_to_string("inputs/mine/soil-to-seed.txt").unwrap();
    let fert_to_soil_data = fs::read_to_string("inputs/mine/fertilizer-to-soil.txt").unwrap();
    let water_to_fert_data = fs::read_to_string("inputs/mine/water-to-fertilizer.txt").unwrap();
    let light_to_water_data = fs::read_to_string("inputs/mine/light-to-water.txt").unwrap();
    let temp_to_light_data = fs::read_to_string("inputs/mine/temperature-to-light.txt").unwrap();
    let humidity_to_temp_data = fs
        ::read_to_string("inputs/mine/humidity-to-temperature.txt")
        .unwrap();
    let location_to_humidity_data = fs
        ::read_to_string("inputs/mine/location-to-humidity.txt")
        .unwrap();

    let mut locations = Vec::<i64>::new();
    let mut seed_range = Vec::<i64>::new();

    let seed_values: Vec<&str> = seeds.split(" ").collect();

    for i in 0..seeds.split(" ").count() {
      if i % 2 == 1 {
        continue;
      }

      let first_seed = seed_values[i].parse::<i64>().unwrap();

      seed_range.push(first_seed);

      for j in 1..=seed_values[i+1].parse::<i64>().unwrap() {
        seed_range.push(first_seed + j);
      }
    }

    for seed_number in seed_range {
        let soil = destination(&soil_to_seed_data, &seed_number);
        let fert = destination(&fert_to_soil_data, &soil);
        let water = destination(&water_to_fert_data, &fert);
        let light = destination(&light_to_water_data, &water);
        let temp = destination(&temp_to_light_data, &light);
        let humidity = destination(&humidity_to_temp_data, &temp);
        let location = destination(&location_to_humidity_data, &humidity);

        locations.push(location);
    }

    println!("{}", locations.iter().min().unwrap());
}

fn destination(data: &String, source: &i64) -> i64 {
    for line in data.lines() {
        let ranges: Vec<&str> = line.split(" ").collect();
        let destination_range_start = ranges[0].parse::<i64>().expect("Error parsing destination");
        let source_range_start = ranges[1].parse::<i64>().expect("Error parsing source");
        let range = ranges[2].parse::<i64>().expect("Error parsing range");

        let source_range_max = source_range_start + range;
        let diff = destination_range_start - source_range_start;

        if source.le(&source_range_max) && source.ge(&source_range_start) {
            return source + diff;
        }
    }

    return *source;
}
