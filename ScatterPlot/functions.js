var ScatterPlotFunctions = {}

ScatterPlotFunctions.getView = function(full_path)
{
    ScatterPlotFunctions.html = $("<div></div>")
    ScatterPlotFunctions.html.load(full_path + "/view.html", function()
    {
        $("#ExtensionView").html("")
        $("#ExtensionView").append('<link rel="stylesheet" href="'+ full_path +'/style.css" >' + ScatterPlotFunctions.html[0].innerHTML)
        $("#config .autocomplete input").on('keydown', ScatterPlotFunctions.onInputKeyDown)
        $("#config .autocomplete input").on('input', ScatterPlotFunctions.onInputKeyDown)
        $("#config .autocomplete input").on('click', ScatterPlotFunctions.onInputKeyDown)
    })
    // console.log(ScatterPlotFunctions.html.innerHTML.length)
    // return 
}

ScatterPlotFunctions.BuildScatterPlot = function(a, parentId)
{
    var config = {}
    config.parent = workspace.layers[$(getActiveLayer()).attr("data-layer-id")]
    config.width = $("#canvas").width()
    config.height = $("#canvas").height()
    config.left = $(parentId + " input[name=left]").val()
    config.top = $(parentId + " input[name=top]").val()
    config.right = $(parentId + " input[name=right]").val()
    config.bottom = $(parentId + " input[name=bottom]").val()
    config.x = $(parentId + " input[name=x]").val()
    config.y = $(parentId + " input[name=y]").val()
    config.data = $(parentId + " input[name=data]").val()
    config.color = $(parentId + " input[name=color]").val()
    config.radius = $(parentId + " input[name=radius]").val()

    var id = $(a).attr("data-layer-link")
    if(!id)
    {
        var plot = new ScatterPlot(config)
        plot.build()
        id = randomString(5, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        workspace.layers[$(getActiveLayer()).attr("data-layer-id")].addTemplate(id, plot)
        $(a).attr("data-layer-link", id)
    }
    else
    {
        console.log("Rebuilding")
        console.log($(getActiveLayer()).attr("data-layer-id"))
        var plot = workspace.layers[$(getActiveLayer()).attr("data-layer-id")].templates[id]
        plot.setConfig(config)
        plot.build()
    }
    // console.log(plot.getViz())

    // console.log(config)
}

var autocomplete_list = $("<div id='hidden-search-help'></div>")
//Search Help Functions
ScatterPlotFunctions.onInputKeyDown = function(e)
{
    console.log(e)
    if(e.key == "Backspace" && $(this).val() == "")
    {
        console.log("here")
        $("#hidden-search-help").remove()
    }
    else if($(this).attr("data-array-pointer"))
    {
        console.log(this.parentNode)
        if($(this.parentNode).find("#hidden-search-help").get().length == 0)
        {
            if(autocomplete_list.parentNode)
            {
                autocomplete_list.parentNode.removeChild(autocomplete_list)
            }
            autocomplete_list.html("<ul></ul>")
            autocomplete_list.attr("data-value-fill", "input[name=" + $(this).attr("name") + "]")
            autocomplete_list.appendTo(this.parentNode)
        }
        // $("#hidden-search-help").position("absolute")
        // test = this
        var search_pointer = $(this).attr("data-array-pointer")
        console.log(search_pointer)
        search_pointer = search_pointer.split(":")
        console.log(search_pointer)
        var search_suggestions = window
        var no_error = true;
        try {
            for(var i=0; i<search_pointer.length; i++)
            {
                if(search_pointer[i].indexOf("$")<0)
                {
                    search_suggestions = search_suggestions[search_pointer[i]]
                }
                else
                {
                    console.log($(search_pointer[i].slice(1)).val())
                    search_suggestions = search_suggestions[$(search_pointer[i].slice(1)).val()]
                }
                console.log(search_suggestions)

            }
        } catch (error) {
            no_error = false;
        }
        
        
        
        // var data_array = workspace[$(this).attr("data-array")]
        if(!Array.isArray(search_suggestions) && typeof(search_suggestions) == "object")
        {
            // typeof(search_suggestions)
            search_suggestions = d3.keys(search_suggestions)
        }

        autocomplete_list.find("ul").html("")
        // autocomplete_list.find("ul").style("position:absolute")
        if(no_error && search_suggestions && search_suggestions.length>0)
        {
            for(var i=0; i<search_suggestions.length; i++)
            {
                console.log(search_suggestions)
                autocomplete_list.find("ul").append("<li onClick='ScatterPlotFunctions.autocompleteFill(this)'>" + search_suggestions[i] + "</li>")
            }
        }
        else
        {
            autocomplete_list.find("ul").append("<li><i>No relevant suggestions found</i></li>" )
        }
    }
}

ScatterPlotFunctions.autocompleteFill = function(a)
{
    $("#hidden-search-help").remove()
    // autocomplete_list = $("<div id='hidden-search-help'></div>")
    $($(a.parentNode.parentNode).attr("data-value-fill")).val($(a).html())
}

ScatterPlotFunctions.checkColor = function(a)
{
    var colorString = $(a).val()
    if(isColor(colorString))
    {
        $(a.parentNode).find(".color-box")
                        .attr("style", "background: " + colorString)
    }
    else
    {
        $(a.parentNode).find(".color-box")
                        .attr("style", "background: url('./assets/warning.png') no-repeat; background-size: contain")
    }
}

