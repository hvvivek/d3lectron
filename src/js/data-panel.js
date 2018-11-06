$("#create-data .add-btn").on("click", function(){
    console.log("Adding new data")
    $("#content").html("")
    $("<div id='add-data-form'></div>").appendTo("#content")
    // $("<p class='data-name-label'>Name:</p>").appendTo("#add-data-form")
    $("<input type='text' class='data-name-input' value='insert_name'><br>").appendTo("#add-data-form")
    $("<p class='data-name-input-warning'>A data source with this name already exists. Please choose a different name</p>").appendTo("#add-data-form")
    $("<br><div class='data-files'><ul></ul></div>").appendTo("#add-data-form")
    $("<div class='data-features'><ul></ul></div>").appendTo("#add-data-form")
    $("<button class='data-form-create'>Add Data Source</button>").appendTo("#add-data-form")

    populateSources(workspace)
})

var selectAll = function(a, selector)
{
    
    var parent = $(selector + " input[type=checkbox]").get()
    for(var i=0; i<parent.length; i++)
    {
        if(!$(parent[i]).hasClass("select_all"))
        {
            console.log($(a))
            if($(a)[0].checked)
            {
                console.log("checking")
                $(parent[i]).prop('checked', true);
            }
            else
            {
                console.log("unchecking")
                $(parent[i]).prop('checked', false);
            }
        }
    }
}

$("#create-data .automate-btn").on("click", function(){
    console.log("Automating adding new data")
    $("#content").html("")
    $("<div id='automate-data-form'></div>").appendTo("#content")
    $("<h4 class='data-name-label'>Select data files to read:</h4>").appendTo("#automate-data-form")
    $("<br><div class='data-files'><ul></ul></div>").appendTo("#automate-data-form")
    $("<button class='data-form-create'>Add All</button>").appendTo("#automate-data-form")

    var data_files = workspace.files.filter(function(d){return dataTypes.indexOf(d.type) >= 0})
    d3.select("#automate-data-form .data-files>ul")
    .selectAll("li")
    .data(data_files)
    .enter()
        .append("li")
        .attr("data-workspace-file", function(d){return d.rString})
        .html(function(d){return '<div><input type="checkbox" name="'+d.name+'" value="'+d.rString+'" /><label>'+d.name+'</label></div>'})

    $("<li><div><input type='checkbox' class='select_all' onClick='selectAll(this, \"#automate-data-form\")' name='select_all' value='select_all' /><label>Select All</label></div></li>").prependTo("#automate-data-form .data-files>ul")
    $("#automate-data-form .data-form-create").on("click", function()
    {
        var selectedFiles = []
        var selectedNames = []
        var options = $("#automate-data-form input[type=checkbox]").get()
        for(var i=0; i<options.length; i++)
        {
            if(!$(options[i]).hasClass("selectAll"))
            {
                if($(options[i])[0].checked)
                {
                    selectedFiles.push($(options[i]).attr("value"))
                    selectedNames.push($(options[i]).attr("name"))

                }
            }
        }
        for(var i=0; i<selectedFiles.length; i++)
        {
            var rString = selectedFiles[i]
            var name = selectedNames[i].split(".")[0]
            var linkedFile = workspace.files.filter(function(d){return d.rString == rString})
            if(linkedFile.length > 0)
            {
                linkedFile = linkedFile[0]
                if(!workspace.data_sources)workspace.data_sources = {}
                workspace.data_sources[name] = new DataSource(name, linkedFile)
                updateDataPanel()
            }
        }
        $("#automate-data-form").remove()

    })
})

var populateSources = function(workspace)
{
    var data_files = workspace.files.filter(function(d){return dataTypes.indexOf(d.type) >= 0})
    d3.select("#add-data-form .data-files>ul")
            .selectAll("li")
            .data(data_files)
            .enter()
                .append("li")
                .attr("data-workspace-file", function(d){return d.rString})
                .html(function(d){return d.name})
                .on("click", function(d){
                    $(".data-name-input").val(d.name.split(".")[0])
                    var rString = d.rString
                    var linkedFile = workspace.files.filter(function(d){return d.rString == rString})
                    if(linkedFile.length > 0)
                    {
                        
                        linkedFile = linkedFile[0]
                        d3[linkedFile.type](linkedFile.full_path).then(
                            function(data)
                            {
                                
                                var feature_list = d3.select("#add-data-form .data-features>ul")
                                                        .selectAll("li")
                                if(feature_list._groups[0].length == d3.keys(data[0]).length)
                                {
                                    console.log("Here")
                                    feature_list.data(d3.keys(data[0])).html(function(d){return d}) 
                                }
                                else
                                {
                                    feature_list = feature_list.data(d3.keys(data[0]))

                                    feature_list
                                        .enter()
                                            .append("li")  
                                            .html(function(d){return d}) 
                                
                                    feature_list.exit().remove()
                                }
                            }
                        )
                    }
                })
    
    $("#add-data-form .data-files li").on("click", function()
    {
        console.log("List item selected")
        $("#add-data-form .data-files>ul>li").removeClass("active")
        $(this).addClass("active")
    })

    

    $("#add-data-form .data-form-create").on("click", function()
    {
        var name = $("#add-data-form .data-name-input").val()
        
            console.log("Creating Data Source")

            if(!workspace.data_sources)
            {
                workspace.data_sources = {}
            }

            if(workspace.data_sources[name])
            {
                $("#add-data-form .data-name-input-warning").attr("style", "visibility:visible")
            }
            else
            {
                $("#add-data-form .data-name-input-warning").attr("style", "")

                var rString = $("#add-data-form .data-files>ul>li.active").attr("data-workspace-file")
                // var rString = d.rString
                var linkedFile = workspace.files.filter(function(d){return d.rString == rString})
                if(linkedFile.length > 0)
                {
                    
                    linkedFile = linkedFile[0]
                    workspace.data_sources[name] = new DataSource(name, linkedFile)
                    updateDataPanel()
                }
        }
        $("#add-data-form").remove()
    })
}

var updateDataPanel = function()
{
    $("#create-data .data-sources>ul").html("")
    if(workspace && workspace.data_sources)
    {
        for(var key in workspace.data_sources)
        {
            console.log(key)
            
            $("#create-data .data-sources>ul").append("<li>" + key + "</li>")
            $("#create-data .data-sources>ul>li").click(
                function()
                {
                    console.log(this.innerHTML)
                    $("#content").html(getDataTable(this.innerHTML))
                }
            )

        }
    }
}

var getDataTable = function(key)
{
    var dataSource = workspace.data_sources[key]
    var table = $("<table></table>")
    // table.attr("id", "data-table")
    var table_header = $('<tr></tr>')
    table_header.append("<th></th>")
    for(var i=0; i<dataSource.features.length; i++)
    {
        table_header.append('<th>'+ dataSource.features[i] +'</th>')
    }
    table.append(table_header)

    var num_rows = dataSource.data.length>1000? 1000:dataSource.data.length
    for(var i=0; i<num_rows; i++)
    {
        var table_row = $('<tr></tr>')
        table_row.append("<td class='edit'>Edit</td>")
        for(var j=0; j<dataSource.features.length; j++)
        {
            table_row.append('<td>'+ dataSource.data[i][dataSource.features[j]] +'</td>')
        }
        table.append(table_row)
    }

    var outer_wrapper = $("<div></div>")
    outer_wrapper.attr("id", "data-table")
    outer_wrapper.append("<h2>" + key + "</h2>")
    outer_wrapper.append(table)
    return outer_wrapper
}



