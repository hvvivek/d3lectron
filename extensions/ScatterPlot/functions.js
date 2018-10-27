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

    var plot = new ScatterPlot(config)
    plot.build()
    console.log(plot.getViz())

    // console.log(config)
}