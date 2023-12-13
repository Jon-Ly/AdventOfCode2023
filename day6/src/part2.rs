use std::fs;
use regex::Regex;

pub fn part2() {
  let file_data = fs::read_to_string("input.txt").unwrap();

  let re = Regex::new(r"[0-9]").unwrap();

  let mut time: i64 = 1;
  let mut distance: i64 = 1;

  let mut total: i64 = 1;

  for i in 0..=1 {
    let line  = (file_data.lines().collect::<Vec<&str>>())[i];
    let mut split_data: Vec<&str> = line.split("").collect();
    split_data.retain(|x| { re.is_match(x) });

    if i == 0 {
      time = split_data.join("").parse::<i64>().expect("Error parsing time");
    } else if i == 1 {
      distance = split_data.join("").parse::<i64>().expect("Error parsing time");
    }
  }

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

  println!("{}", total);
}