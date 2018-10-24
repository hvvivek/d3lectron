var ScatterPlotFunctions = {}

ScatterPlotFunctions.getView = function(full_path)
{
    ScatterPlotFunctions.html = $("<div></div>")
    ScatterPlotFunctions.html.load(full_path + "/view.html", function()
    {
        $("#ExtensionView").html("")
        $("#ExtensionView").append('<link rel="stylesheet" href="'+ full_path +'/style.css" >' + ScatterPlotFunctions.html[0].innerHTML)
    })
    // console.log(ScatterPlotFunctions.html.innerHTML.length)
    // return 
}

ScatterPlotFunctions.BuildScatterPlot = function(parentId)
{
    var config = {}
    // config.layer = 
    config.parent = workspace.layers[$(getActiveLayer()).html()]
    // config.width = $(parentId + " input[name=width]").val()
    // config.height = $(parentId + " input[name=height]").val()
    config.width = $("#canvas").width()
    config.height = $("#canvas").height()
    config.x = $(parentId + " input[name=x]").val()
    config.y = $(parentId + " input[name=y]").val()
    config.data = $(parentId + " input[name=data]").val()

    var plot = new ScatterPlot(config)
    plot.build()
    console.log(plot.getViz())

    // console.log(config)
}