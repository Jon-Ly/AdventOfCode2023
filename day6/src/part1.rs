use std::fs;
use regex::Regex;

pub fn part1() {
  let file_data = fs::read_to_string("input.txt").unwrap();

  let re = Regex::new(r"[0-9]").unwrap();

  let mut times = Vec::<&str>::new();
  let mut distances = Vec::<&str>::new();

  let mut total: i32 = 1;

  for i in 0..=1 {
    let line  = (file_data.lines().collect::<Vec<&str>>())[i];
    let mut split_data: Vec<&str> = line.split(" ").collect();
    split_data.retain(|x| { re.is_match(x) });

    if i == 0 {
      times = split_data;
    } else if i == 1 {
      distances = split_data;
    }
  }

  for i in 0..times.len() {
    let time = times[i].parse::<i32>().expect("Error parsing time");
    let distance = distances[i].parse::<i32>().expect("Error parsing distance");

    let mut hold_count = 0;

    for hold_time in 1..=time {
      // Index * (Time - index) >= Distance ? YES : NO;
      if hold_time * (time - hold_time) > distance {
        hold_count += 1;
      }
    }

    if hold_count > 0 {
      total *= hold_count;
    }
  }

  println!("{}", total);
}