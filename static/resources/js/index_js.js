var n = 5;
function doSum()
{
	for(i = 0; i < n; i++)
	{
		var sum = 0;
		for(j = 0; j < 3; j++)
		{
			var s = document.getElementById("table_Id_"+i+j).innerHTML;
			if(s == "")
				s = '0';
			sum+=parseInt(s);
		}
		document.getElementById("table_Id_"+i+"3").innerHTML = "<h6>"+sum+"</h6>";
	}
}

function doProduct()
{
	for(i = 0; i < n; i++)
	{
		var _initial = document.getElementById("table_Id_"+i+"0").innerHTML;
		if(_initial == "")
			_initial = '0';
		var sum = parseInt(_initial);
		for(j = 1; j < 3; j++)
		{
			var s = document.getElementById("table_Id_"+i+j).innerHTML;
			if(s == "")
				s = '0';
			sum*=parseInt(s);
		}
		document.getElementById("table_Id_"+i+"4").innerHTML = "<h6>"+sum+"</h6>";
	}
}

function SI()
{
	for(i = 0; i < n; i++)
	{
		var _initial = document.getElementById("table_Id_"+i+"0").innerHTML;
		if(_initial == "")
			_initial = '0';
		var sum = parseInt(_initial);
		for(j = 1; j < 3; j++)
		{
			var s = document.getElementById("table_Id_"+i+j).innerHTML;
			if(s == "")
				s = '0';
			sum*=parseInt(s);
		}
		sum = sum/100;
		document.getElementById("table_Id_"+i+"3").innerHTML = "<h6>"+sum+"</h6>";
	}
}

function CI()
{
	for(i = 0; i < n; i++)
	{
		var _initial = document.getElementById("table_Id_"+i+"0").innerHTML;
		if(_initial == "")
			_initial = '0';
		var p = parseInt(_initial);
		var r = document.getElementById("table_Id_"+i+"1").innerHTML;
		if(r == "")
			r = '0';
		r = parseInt(r);

		var t = document.getElementById("table_Id_"+i+"2").innerHTML;
		if(t == "")
			t = '0';
		t = parseInt(t);

		var ci = p*(Math.pow((1 + (r/1200)), (t*12)));
		document.getElementById("table_Id_"+i+"4").innerHTML = "<h6>"+ci+"</h6>";
	}

}

function setter()
{
	document.getElementById("table_Id").innerHTML = "<tr><td style='border: solid black 2px;' align='center'><b>Principle</b></td><td style='border: solid black 2px;' align='center'><b>Rate (%)</b></td><td style='border: solid black 2px;' align='center'><b>Time (Years)</b></td><td style='border: solid black 2px;' align='center'><b>SI</b></td><td style='border: solid black 2px;' align='center'><b>CI</b></td></tr>";

	for(i = 0; i < n; i++)
	{
		var tb_String = "<tr>";
		for(j = 0; j < 3; j++)
		{
			var tb_Id = "table_Id_" + i + j;
			tb_String+= "<td style='border: solid black 2px;' id='"+ tb_Id +"' onkeyup = 'on_Modification_In_Input_Cells()' contenteditable = 'true'></td>"
		}
		var tb_Ind = "table_Id_" + i + "3";
		tb_String+="<td style='border: solid black 2px;' id='"+ tb_Ind +"' align = 'center'></td>";
		tb_Ind = "table_Id_" + i + "4";
		tb_String+="<td style='border: solid black 2px;' id='"+ tb_Ind +"' align = 'center'></td></tr>";

		document.getElementById("table_Id").innerHTML+=tb_String; 
	}

	SI();
	CI();
}

function on_Modification_In_Input_Cells()
{
	SI();
	CI();
}

function add_New_Row()
{
	var table = document.getElementById("table_Id");

	var row = document.createElement("TR");

	var p = document.createElement("TD");
	var r = document.createElement("TD");
	var t = document.createElement("TD");
	var si = document.createElement("TD");
	var ci = document.createElement("TD");

	p.setAttribute("id", "table_Id_"+n+"0");
	r.setAttribute("id", "table_Id_"+n+"1");
	t.setAttribute("id", "table_Id_"+n+"2");
	si.setAttribute("id", "table_Id_"+n+"3");
	ci.setAttribute("id", "table_Id_"+n+"4");

	p.setAttribute("contenteditable", "true");
	r.setAttribute("contenteditable", "true");
	t.setAttribute("contenteditable", "true");

	p.setAttribute("onkeyup", "on_Modification_In_Input_Cells()");
	r.setAttribute("onkeyup", "on_Modification_In_Input_Cells()");
	t.setAttribute("onkeyup", "on_Modification_In_Input_Cells()");

	p.setAttribute("style", "border: solid black 2px");
	r.setAttribute("style", "border: solid black 2px");
	t.setAttribute("style", "border: solid black 2px");
	si.setAttribute("style", "border: solid black 2px");
	ci.setAttribute("style", "border: solid black 2px");

	si.setAttribute("align", "center");
	ci.setAttribute("align", "center");

	row.appendChild(p);
	row.appendChild(r);
	row.appendChild(t);
	row.appendChild(si);
	row.appendChild(ci);
	table.appendChild(row);

	n++;
	SI();
	CI();

}

function export_Excel()
{
	var tableID = "table_Id";
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
    source = $('#div_Table')[0];

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
