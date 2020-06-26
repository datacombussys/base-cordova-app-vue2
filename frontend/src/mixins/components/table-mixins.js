export const DataTableMixins = {
  inheritAttrs: false,
  data() {
    return {
      lastColumsSorted: 1,
      selectedList: [],
      showActive: 1,
      //Pagination
      pagination: {
        pageSize: 5,
        currentPage: 1,
        totalPages: 0,

      },

    }
  },
  methods: {
    testingMethod() {
      console.log('this.selectedList', this.selectedList);
      
    },

    showAllRows(tableId) {
      this.showActive = false;
      var Arr = Array.prototype;
      var table = document.getElementById(tableId);
      console.log("table", table);
      var rows = table.tBodies[0].rows;
      console.log("rows", rows);
      Arr.forEach.call(rows, (row) => {
        console.log("row",row);
        row.style.display = 'table-row';
      });
      this.showActive = 1;
    },
    tableFilter(target, tableId) {
      console.log("Filter Test");
      console.log("target", target);
      console.log("tableId", tableId);
      if(target['value'] === 'Inactive') {
        console.log('showActive Inactive');
        this.showActive = 2;
      } 
      if(target['value'] === 'Active') {
        console.log('showActive Active');
        this.showActive = 3;
      } 
      
      var Arr = Array.prototype;
      var mainTable = document.getElementById(tableId);
      console.log("mainTable", mainTable);
      var rows = mainTable.tBodies[0].rows;
      console.log("rows", rows);

      var input;
      console.log("onInputEvent", target);
      input = target;

      var filter = (row) => {
        console.log("filter row before", row);
        var text = row.textContent;
        console.log("text", text);
        var val = input.value;
        console.log("val", val);
        row.style.display = text.includes(val) ? 'table-row' : 'none';
        console.log("filter row after", row);
      }

      Arr.forEach.call(rows, (row) => {
        console.log("row",row);
        filter(row);
      });

      return {
        init: () => {
          var inputs = document.getElementsByClassName('table-filter');
          console.log("inputs", inputs);
          Arr.forEach.call(inputs, (input) => {
            input.oninput = onInputEvent;
          });
        }
      };
      
    },
    uncheckAllOthers(e) {
      console.log('uncheckAllOthers e', e);
      // var table = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
      // console.log('table',table);
      // var rows = table.rows;
      // console.log('rows',rows);
      //Find other checkboxed in the DOM and unceheck them
      var tableBody = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.rows;
      //Uncheck first row
      tableBody[0].childNodes[0].childNodes[0].childNodes[0].checked = false;
			console.log('tableBody array', tableBody);
			for(let index = 2; index < tableBody.length; index++) {
				console.log('tableBody', tableBody[index]);
        tableBody[index].childNodes[0].childNodes[0].childNodes[0].checked = false;
        
        //Find Object from input attribute and remove from localList
        let rowID = tableBody[index].childNodes[0].childNodes[0].childNodes[0].id;
        console.log('e.target.parentNode.parentNode', rowID);
        const localObjIndex = this.selectedList.findIndex(elem => elem.id == rowID);
          if(localObjIndex != -1) {
            console.log('localObjIndex', localObjIndex);
            this.selectedList.splice(localObjIndex, 1);
            console.log('this.selectedList', this.selectedList);
          }
      }
		},
    sortTable(columnID, tableId) {
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById(tableId);
      console.log('table', table);
      switching = true;
      rows = table.tBodies[0].rows;
      console.log('rows before', rows);
      rows[0].children[this.lastColumsSorted].classList.remove('sortable-cell-active');
      rows[0].children[columnID].classList.add('sortable-cell-active');
      console.log('rows after', rows);
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
          for (i = 0; i < (rows.length - 1); i++) {
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
          for (i = 0; i < (rows.length - 1); i++) {
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
    toggleAllChecks(e, tableId, list) {
      console.log('toggleAllChecks e', e);
      console.log('uncheckAllOthers tableId', tableId);
      var table = document.getElementById(tableId);
      console.log('uncheckAllOthers table', table);

			if(!e.target.checked) {
        // Uncheck all
				console.log('table', table);
				var rows = table.tBodies[0].rows;
				console.log('rows', rows);
				for(let index = 0; index < rows.length; index++) {
					rows[index].childNodes[0].childNodes[0].children[0].checked = false;
        }
        this.selectedList = [];
			} else {
				console.log('table', table);
				var rows = table.tBodies[0].rows;
				console.log('rows', rows);
				for(let index = 0; index < rows.length; index++) {
          if(rows[index].style.display != 'none') {
            // Check all that are not hidden (row.style.display=none)
            rows[index].childNodes[0].childNodes[0].children[0].checked = true;
            //Add all to List
            let obj = list.find(elem => elem.id == rows[index].childNodes[2].id);
            this.selectedList.push(obj);
          }
          
				}
        this.isAllChecked = true;
        
			}
    },
    checkedItem(e, list) {
      console.log('checkedItem e', e);
      console.log('checkedItem list', list);
			//Find out if checked or unchecked
			if(e.target.checked) {
        //Find Object from store from input property and insert into local List
        console.log('e.target.parentNode.parentNode', e.target.id);
        const storeObj = list.find(elem => elem.id == e.target.id);
        console.log('storeObj', storeObj);
        this.selectedList.push(storeObj);
        console.log('this.selectedList', this.selectedList);

        this.uncheckAllOthers(e);

			} else {
        console.log('ELSE Checked Item to remove');
        
        //Find Object from input attribute and remove from localList
        console.log('e.target.parentNode.parentNode', e.target.id);
        const localObjIndex = this.selectedList.findIndex(elem => elem.id == e.target.id);
        console.log('localObjIndex', localObjIndex);
        this.selectedList.splice(localObjIndex, 1);
        console.log('this.selectedList', this.selectedList);
			}
    },
    //Pagination Methods
    firstPage() {
      console.log('firstPage');
      this.pagination.currentPage = 1;
     },
     lastPage() {
      console.log('lastPage');
      this.pagination.currentPage = this.pagination.totalPages;
     },
     nextPage() {
      console.log('nextPage');
      console.log('this.pagination.currentPage', this.pagination.currentPage);
      console.log('this.pagination.totalPages', this.pagination.totalPages);
      
       if(this.pagination.currentPage <= this.pagination.totalPages) {
        this.pagination.currentPage += 1;
       }
     },
     prevPage() {
      console.log('prevPage');
       if(this.pagination.currentPage >= 2) {
        this.pagination.currentPage -= 1;
       }
     },
    changePages(page) {
      console.log('page', page);
      this.pagination.currentPage = page;
     },
     
  },
  computed: {
   paginatedList: {
     get: function () {
      console.log('paginatedList get');
      let startIndex = ((this.pagination.currentPage * this.pagination.pageSize) - this.pagination.pageSize);
      console.log('startIndex', startIndex);
      let endIndex = startIndex + this.pagination.pageSize;
      console.log('endIndex', endIndex);
      console.log('this.tableData.list.slice(startIndex, endIndex', this.tableData.list.slice(startIndex, endIndex));
      return this.tableData.list.slice(startIndex, endIndex);
     },
     set: function (length) {
      console.log('paginatedList set');
      console.log('length', length);
      this.pagination.totalPages = (Math.ceil(length / this.pagination.pageSize));
     }
   },
   renderPageButtons() {
    var newList = new Array();
    var listLength = parseInt(this.tableData.list.length);
    console.log("listLength", listLength);
    var currentPage = parseInt(this.pagination.currentPage);
    console.log("currentPage", currentPage);
    var nextPage = (parseInt(this.pagination.currentPage) + 1);
    console.log("nextPage", nextPage);
    var lastPage = (parseInt(this.pagination.currentPage) - 1);
    console.log("lastPage", lastPage);

    var totalButtons = Math.ceil(listLength / parseInt(this.pagination.pageSize));
    console.log("totalButtons", totalButtons);
    var totalButtonList = new Array();

    var maxListLength = 3;

    let median = Math.floor(maxListLength / 2);
    let lowNumber = (currentPage - median) || 1;
    if((currentPage - median) < 1) {
      lowNumber = 1;
    } else {
      lowNumber = (currentPage - median);
    }
    console.log("lowNumber", lowNumber);
    let highNumber = 0;
    if(Math.ceil(currentPage + median) + 1 > totalButtons) {
      highNumber = totalButtons;
    } else {
      highNumber = Math.ceil(currentPage + median) + 1;
    }
    console.log("highNumber", highNumber);

    
    for(let i = lowNumber; i <= highNumber; i++) {
      console.log("i", i);
      totalButtonList.push(i);
    } 
    console.log("totalButtonList", totalButtonList);

    return totalButtonList;
  },
  disabledNextButton() {
    var listLength = parseInt(this.tableData.list.length);
    var totalButtons = Math.ceil(listLength / parseInt(this.pagination.pageSize));
    if(this.pagination.currentPage == totalButtons) {
      return true
    }
    return false
  },
  disabledPrevButton() {
    if(this.pagination.currentPage == 1) {
      return true
    }
    return false
  },
  beginningPageRecord() {
    if(this.tableData.list.length < this.pagination.pageSize) {
      return 1;
    } else {
      return ((this.pagination.currentPage * this.pagination.pageSize) - this.pagination.pageSize);
    }
  },
  endingPageRecord() {
    if(this.tableData.list.length < this.pagination.pageSize) {
      return this.tableData.list.length;
    } else {
      return (this.pagination.currentPage * this.pagination.pageSize);
    }
    
  },
  totalPages() {

  }
 
  },
  mounted() {

  },
  created() {
    console.log("The DataTableMixins loaded!");
  }
}