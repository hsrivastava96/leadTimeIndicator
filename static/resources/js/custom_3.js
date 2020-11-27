var rNum = 1;
var dataDict = "";
var keys = "";
var start = 0;

function setter(data)
{
	console.log("Start --> ", start);
	var data_Dict = JSON.parse(data);
	var data_Keys = Object.keys(data_Dict);

	dataDict = data_Dict;
	keys = data_Keys;

	console.log("Data_Dict --> ", data_Dict);

	var row = document.getElementById("row_id");
	var table = document.createElement("TABLE");

	table.setAttribute("id", "table_ID");
	table.style.margin = "50px";

	var table_Row = document.createElement("TR");
	table_Row.setAttribute("id", "row_0");

	for(i = 0; i < 3; i++)
	{
		var table_Cell = document.createElement("TD");
		table_Cell.setAttribute("id", "cell_0"+i);
		table_Cell.style.border = "2px solid black";
		table_Cell.style.background = "white";
		table_Cell.align = "center";
		if(i == 0)
		{
			table_Cell.innerHTML = "<b>PROJECT</b>";
		}
		else if(i == 1)
		{
			table_Cell.innerHTML = "<b>MODULE</b>";
		}
		else if(i == 2)
		{
			table_Cell.innerHTML = "<b>VALUE</b>";
			table_Cell.hidden = true;
		}
		table_Row.appendChild(table_Cell);
		// table.appendChild(table_Row);
	}

	row.appendChild(table);

	// console.log("Starting to create button");
	var addRowButton = document.createElement("DIV");
	addRowButton.setAttribute("class", "row");
	var col = document.createElement("DIV");
	col.setAttribute("class", "col-sm-1");
	col.setAttribute("style", "margin-left: 45px; margin-top: -40px;")
	var button = document.createElement("BUTTON");
	button.setAttribute("class", "btn btn-primary");
	button.setAttribute("style", "border-radius: 20px;")
	button.title = "Click to add new row";
	button.setAttribute("onclick", "addRow()");
	button.innerHTML = "+";
	col.appendChild(button);
	addRowButton.appendChild(col);
	// row.appendChild(addRowButton); 

	// Starting to create buttons to exort excel and PDF
	var addRowButton = document.createElement("DIV");
	addRowButton.setAttribute("class", "row");
	var col = document.createElement("DIV");
	col.setAttribute("class", "col-sm-6 offset-7");
	// col.setAttribute("style", "margin-left: 45px; margin-top: -40px;")

	var button1 = document.createElement("BUTTON");
	var button2 = document.createElement("BUTTON");

	button1.setAttribute("class", "btn btn-primary");
	button1.title = "Click to add new row";
	button1.setAttribute("onclick", "export_Excel()");
	button1.setAttribute("style", "margin-top:-40px;")
	button1.setAttribute("id", "excel_Btn");
	button1.innerHTML = "Export Excel";

	button2.setAttribute("class", "btn btn-primary m-1");
	button2.title = "Click to add new row";
	button2.setAttribute("onclick", "export_PDF()");
	button2.innerHTML = "Export PDF";

	col.appendChild(button1);
	// col.appendChild(button2);

	addRowButton.appendChild(col);
	row.appendChild(addRowButton); 

	addRow();
	addLastRow();
}

function set_Output()
{
	for(i = 0; i < data_Keys.length; i++)
	{
		var n1 = document.getElementById("cell_"+i+"1").innerHTML;
		var n2 = document.getElementById("cell_"+i+"3").innerHTML;	
		var cell = document.getElementById("cell_"+i+data_Dict[data_Keys[0]].length);
		console.log(n1, n2);
		cell.innerHTML = parseInt(n2)*100/parseInt(n1);
	}
}

function addRow()
{
	var table = document.getElementById("table_ID");
	// console.log("Printing in addRow Function --> ", dataDict);

	var rNum_Copy = rNum;
	for(i = 0; i < keys.length; i++, rNum++)
	{
		var subKeys = Object.keys(dataDict[keys[i]]);

		var tr = document.createElement("TR");
		tr.setAttribute("id", "row_"+rNum);

		var c1 = "";
		var c2 = "";
		if(start == 0)
		{
			c1 = document.createElement("TD");
			c2 = document.createElement("TD");
			c1.setAttribute("id", "cell_"+rNum+"0");
			c2.setAttribute("id", "cell_"+rNum+"1");
		}
		else
		{
			c1 = document.getElementById("cell_"+rNum+"0");
			c2 = document.getElementById("cell_"+rNum+"1");
			c1.innerHTML = "";
			c2.innerHTML = "";
		}

		var tCell_1 = c1;
		var tCell_2 = c2;
		var tCell_3 = document.createElement("TD");

		tCell_3.setAttribute("id", "cell_"+rNum+"2");

		tCell_1.style.border = "2px solid black";
		tCell_2.style.border = "2px solid black";
		tCell_3.style.border = "2px solid black";

		tCell_1.style.background = "white";
		tCell_2.style.background = "white";
		tCell_3.style.background = "white";

		tCell_3.hidden = true;

		tCell_1.innerHTML = keys[i];
		tCell_2.innerHTML = "";
		tCell_3.innerHTML = "";

		tr.appendChild(tCell_1);
		tr.appendChild(tCell_2);
		tr.appendChild(tCell_3);

		table.appendChild(tr);
	}

	for(i = 0; i < keys.length; i++, rNum_Copy++)
		getData(keys[i], rNum_Copy);

	if(start == 0)
		start = 1;
	else
	{
		addLastRow();
		totalSum();
	}
}

function addLastRow()
{
	var table = document.getElementById("table_ID");
	var table_Row = document.createElement("TR");
	var table_Cell_1 = document.createElement("TD");
	var table_Cell_2 = document.createElement("TD");

	table_Cell_1.setAttribute("id", "cell_"+(rNum)+"0");
	table_Cell_1.style.border = "2px solid black";
	table_Cell_1.style.background = "white";	
	table_Cell_1.setAttribute("align", "center");
	table_Cell_1.innerHTML = "<b>TOTAL</b>";

	table_Cell_2.setAttribute("id", "cell_"+(rNum)+"1");
	table_Cell_2.style.border = "2px solid black";
	table_Cell_2.style.background = "white";	
	table_Cell_2.setAttribute("align", "center");

	table_Row.appendChild(table_Cell_1);
	table_Row.appendChild(table_Cell_2);

	table.appendChild(table_Row);
	totalSum();
}

function getData(value, id)
{
	console.log(value, id);

	var tCell_2 = document.getElementById("cell_"+id+"1");
	var tCell_3 = document.getElementById("cell_"+id+"2");

	console.log("cell_"+id+"1", "cell_"+id+"2");

	tCell_2.innerHTML = "";
	tCell_3.innerHTML = "";

	for(i = 0; i < keys.length; i++)
	{
		if(value == keys[i])
		{
			var subKeys = Object.keys(dataDict[value]);
			var select = document.createElement("SELECT");
			select.setAttribute("class", "browser-default custom-select");
			select.setAttribute("onchange", "getFinalData(this.value, "+id+")");

			var option = document.createElement("OPTION");
			option.innerHTML = "-- Select --";
			// option.disabled = true;
			select.appendChild(option);			
			for(j = 0; j < subKeys.length; j++)
			{
				option = document.createElement("OPTION");
				option.innerHTML = subKeys[j];
				select.appendChild(option);
			}
			tCell_2.appendChild(select);
			break;
		}
	}
	// totalSum();
}

function getFinalData(val, id)
{
	console.log(val, id);
	var key_1 = document.getElementById("cell_"+id+"0").innerHTML;
	console.log(key_1);
	document.getElementById("cell_"+id+"2").innerHTML = dataDict[key_1][val];
	totalSum();
}

function totalSum()
{
	var summ = 0;
	var button = document.getElementById("excel_Btn");
	if(start == 1)
	{
		var flag = 0;
		for(i = 1; i < rNum; i++)
		{
			var cell = document.getElementById("cell_"+i+"2");
			var val = parseInt(cell.innerHTML);
			console.log(val);
			if(isNaN(val))
			{
				// console.log("Not selected!");
				flag = 1;
				val = 0;
			}
			summ = summ + val;
		}
		if(flag == 1)
		{
			button.disabled = true;
			summ = "Selections Pending";
		}
		else
			button.disabled = false;
	}
	else
	{
		button.disabled = true;
		summ = "Selections Pending";
	}
	var sum_Cell = document.getElementById("cell_"+rNum+"1");
	sum_Cell.innerHTML = summ;
}

function export_Excel()
{
	var table = document.getElementById("tempTable");
	table.hidden = true;

	var tr = document.createElement("TR");
	var td = document.createElement("TD");
	td.setAttribute("colspan", "2");
	td.align = "center";
	td.setAttribute("style", "height: 50px; width: auto; background: yellow; border: 2px solid black;")
	td.innerHTML = "<b>COMPLETE INFORMATION</b>";
	tr.appendChild(td);
	table.appendChild(tr);

	for(i = 1; i < rNum; i++)
	{
		var tr = document.createElement("TR");
		for(j = 0; j < 2; j++)
		{
			var td = document.createElement("TD");
			if(j == 0)
			{
				// td.setAttribute("style", "background: blue;")
				td.innerHTML = document.getElementById("cell_"+i+"0").innerHTML;
			}
			else if(j == 1)
			{
				// td.setAttribute("style", "background: blue;")
				td.innerHTML = document.getElementById("cell_"+i+"1").childNodes[0].value;
			}
			td.setAttribute("style", "height: 50px; width: auto; border: 2px solid black;")
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	tr = document.createElement("TR");
	td = document.createElement("TD");
	td.align = "center";
	td.setAttribute("style", "height: 50px; width: auto; background: yellow; border: 2px solid black;")
	td.innerHTML = document.getElementById("cell_"+rNum+"0").innerHTML;
	tr.appendChild(td);
	td = document.createElement("TD");
	td.setAttribute("style", "height: 50px; width: auto; border: 2px solid black;")
	td.innerHTML = document.getElementById("cell_"+rNum+"1").innerHTML;
	tr.appendChild(td);
	table.appendChild(tr);

	var tableID = "tempTable";
	var filename = "custom_Analysis_Excel"
	var downloadurl;
	var dataFileType = 'application/vnd.ms-excel';
	var tableSelect = document.getElementById(tableID);
	var tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');

	// Specify file name
	filename = filename?filename+'.xls':'export_excel_data.xls';

	// Create download link element
	downloadurl = document.createElement("a");

	document.body.appendChild(downloadurl);

	if(navigator.msSaveOrOpenBlob)
	{
		var blob = new Blob(['\ufeff', tableHTMLData], {type: dataFileType});
		navigator.msSaveOrOpenBlob(blob, filename);
	}
	else
	{
		// Create a link to the file
		downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;

		// Setting the file name
		downloadurl.download = filename;

		//triggering the function
		downloadurl.click();
	}
}

function export_PDF()
{
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#row_id')[0];

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function(element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 0,
        bottom: 0,
        left: 0,
        width: 1000,
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, {// y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },
    function(dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('custom_Analysis_PDF.pdf');
    }
    , margins);
}
