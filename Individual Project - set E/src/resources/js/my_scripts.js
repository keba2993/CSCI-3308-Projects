function fillReviewTable()
{
  let meals = `SELECT * FROM meal_reviews`;
  let rTable = document.getElementById("review_table").getElementsByTagName('tbody')[0];
  rTable.insertRow(top3.rows.length).innerHTML = `<th>${i + 1}</th>
                                                <td>${score2048}</td>
                                                <td>${scoreTetris}</td>`;
}