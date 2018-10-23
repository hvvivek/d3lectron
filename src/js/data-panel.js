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
                                // d3.keys(data[0]);
                                // feature_list.remove()
                                // feature_list
                                //     .data(d3.keys(data[0]))
                                //     .exit().remove()

                                
                                
                            }
                        )
                        // $("#content").html("")
                        // linkedFile.getContent().appendTo("#content")
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
        }
    }
}



