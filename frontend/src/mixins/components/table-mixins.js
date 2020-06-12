export const DataTableMixins = {
  data() {
    return {
      lastColumsSorted: 1,

    }
  },
  methods: {
    test() {
      console.log('specialData', specialData);
    },
    
    sortTable(columnID, tableID) {
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById(tableID);
      console.log('table', table);
      switching = true;
      rows = table.rows;
      rows[0].children[this.lastColumsSorted].classList.remove('sortable-cell-active');
      rows[0].children[columnID].classList.add('sortable-cell-active');
      this.lastColumsSorted = columnID;
      //GetClass of Row to determine if is currentl asc or desc then sort appropriately
      if(rows[0].children[columnID].classList.contains('sortable-asc')) {
        /* Make a loop that will continue until no switching has been done: */
        while (switching) {
          //Add ASCENDING class to appropriate rows
          rows[0].children[columnID].classList.add('sortable-desc');
          rows[0].children[columnID].classList.remove('sortable-asc');
          // var index = rows[0].children[columnID].classList.findIndex(elem => elem === 'sortable-desc');
          // rows[0].children[columnID].classList.slice(index,1);
          // Start by saying: no switching is done:
          switching = false;
          
          /* Loop through all table rows (except the
          first, which contains table headers): */
          for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].children[columnID];
            y = rows[i + 1].children[columnID];
            // Check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      } 
      else {
        //Default Sort Method
        /* Make a loop that will continue until no switching has been done: */
        while (switching) {
          //Add ASCENDING class to appropriate rows
          rows[0].children[columnID].classList.add('sortable-cell-active');
          // var index = rows[0].children[columnID].classList.findIndex(elem => elem === 'sortable-asc');
          // rows[0].children[columnID].classList.slice(index,1);
          rows[0].children[columnID].classList.add('sortable-asc');
          rows[0].children[columnID].classList.remove('sortable-desc');
          // Start by saying: no switching is done:
          switching = false;
          
          /* Loop through all table rows (except the
          first, which contains table headers): */
          for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].children[columnID];
            y = rows[i + 1].children[columnID];
            // Check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }
    },
 

     

   
  },
  mounted() {

  },
  created() {
    console.log("The DataTableMixins loaded!");
  }
}