use std::fs;

pub fn part1() {
  let file_name = "day4_1.txt";

  let file_content = fs::read_to_string(file_name).unwrap();

  let mut total = 0;

  for line in file_content.lines() {
      let split_data: Vec<&str> = line.split("|").collect();
      let winning_numbers: Vec<&str> = split_data[0].split(" ").collect();
      let card_numbers: Vec<&str> = split_data[1].split(" ").collect();

      let mut points = 0;

      for winning_number in winning_numbers {
          if winning_number.trim() != "" && card_numbers.contains(&winning_number) {
              points = if points > 0 { points * 2 } else { 1 };
          }
      }

      total += points;
  }

  println!("{}", total);
}