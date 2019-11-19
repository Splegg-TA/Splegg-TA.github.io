let rawDataString;
let js_table = [];
let id = 0;
let html_table = document.getElementById("table");

class Player {
  constructor(rank, name, elo, wins, ties, losses, top10Wins) {
    this.rank = rank;
    this.name = name;
    this.elo = elo;
    this.wins = wins;
    this.ties = ties;
    this.losses = losses;
    this.top10Wins = top10Wins;
  }

  populate_html_table() {
    let tableRow = document.createElement("tr");
    let rank = document.createElement("td");
    let name = document.createElement("td");
    let elo = document.createElement("td");
    let wins = document.createElement("td");
    let losses = document.createElement("td");
    let ties = document.createElement("td");
    let top10Wins = document.createElement("td");

    rank.innerHTML = this.rank;
    name.innerHTML = this.name;
    elo.innerHTML = this.elo;
    wins.innerHTML = this.wins;
    ties.innerHTML = this.ties;
    losses.innerHTML = this.losses;
    top10Wins.innerHTML = this.top10Wins;

    tableRow.appendChild(rank);
    tableRow.appendChild(name);
    tableRow.appendChild(elo);
    tableRow.appendChild(wins);
    tableRow.appendChild(ties);
    tableRow.appendChild(losses);
    tableRow.appendChild(top10Wins);

    html_table.appendChild(tableRow);
  }
}

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      rawDataString = this.responseText;
      rawDataToClass();
    }
  };
  xhttp.open("GET", "Text/Players.txt", true);
  xhttp.send();
}

function rawDataToClass() {
  let split = rawDataString.split(":");
  for (let row = 0; row < (split.length - 1) / 7; row++) {
    for (let column = 0; column < 8; column++) {
      if (column === 7) {
        js_table.push(
          new Player(
            split[id],
            split[id + 1],
            split[id + 2],
            split[id + 3],
            split[id + 4],
            split[id + 5],
            split[id + 6]
          )
        );
        id = id + 7;
      }
    }
  }
  js_table_to_html_table();
}

function js_table_to_html_table() {
  for (let i = 0; i < js_table.length; i++) {
    js_table[i].populate_html_table();
  }
}

loadDoc();
