// potential javascript functions that would be needed for leaderboard functionality

function updateBoard()
{
  // loop through and sort all scores in current leaderboard
  // update rows - swapping
  // update rank for each entry
}

function addScore()
{
  // add new row to table
}

function updateRow()
{
  // update score of already present row
}

function displayInfo()
{
  // potential to display modal showing player stats of row selected
}

// calculates the total score for each row in specified table
function calcTotal(table_id)
{
  let table = document.getElementById(table_id);

  for (let i = 2; i < table.rows.length; i++)
  {
    table.rows[i].cells[4].innerHTML = parseInt(table.rows[i].cells[2].innerHTML) + parseInt(table.rows[i].cells[3].innerHTML);
  }
}

function rowColor(row)
{
  row.style.backgroundColor = '#ff7575'; 
}

function rowRestore(row)
{
  row.style.backgroundColor = document.getElementById('leader_table').style.backgroundColor; 
}