use std::fs;
use std::collections::HashMap;

pub fn part2() {
  let file_name = "day4_2.txt";

  let file_content = fs::read_to_string(file_name).unwrap();

  let mut total = 0;
  let mut new_cards: HashMap<i32, Vec<i32>> = HashMap::new();
  let mut index = 1;

  for line in file_content.lines() {
    let split_data: Vec<&str> = line.split("|").collect();
    let winning_numbers: Vec<&str> = split_data[0].split(" ").collect();
    let card_numbers: Vec<&str> = split_data[1].split(" ").collect();

    let mut duplicate_cards: Vec<i32> = Vec::new();

    let mut winning_numbers_count = 0;

    for winning_number in winning_numbers {
        if winning_number.trim() != "" && card_numbers.contains(&winning_number) {
          winning_numbers_count += 1;
          duplicate_cards.push(winning_numbers_count + index)
        }
    }

    new_cards.insert(index, duplicate_cards);

    index += 1;
  }

  for card in new_cards.keys() {
    total += get_card_count(*card, &new_cards);
  }

  println!("{}", total);
}

fn get_card_count(index: i32, new_cards: &HashMap<i32, Vec<i32>>) -> i32 {
  let mut total: i32 = 1;

  if new_cards.get(&index).unwrap().len() == 0 {
    return 1;
  }

  for card_number in new_cards.get(&index).unwrap() {
    total += get_card_count(*card_number, new_cards);
  }

  return total;
}