$("#create-layers .add-btn").on("click", function(){
    console.log("Adding new layer")
    if(!workspace.layers)
    {
        workspace.layers = {}
    }

    workspace.layers["Layer " + (d3.keys(workspace.layers).length + 1)] = new Layer("Layer " + (d3.keys(workspace.layers).length + 1))
    updateLayersPanel()
})

var updateLayersPanel = function()
{
    if(workspace.layers)
    {
        $("#create-layers .layers>ul").html("")
        for(var layer in workspace.layers)
        {
            $("#create-layers .layers>ul").append("<li>" + layer + "</li>")
        }
        $("#create-layers .layers>ul>li").on("click", onLayerSelect)
    }

}

var onLayerSelect = function()
{
    $("#create-layers .layers>ul>li").removeClass("active")
    $(this).addClass("active")
    console.log(workspace.layers[$(this).html()])
    $("#right-sidebar").html("")
    workspace.layers[$(this).html()].getView().appendTo($("#right-sidebar"))
    populateExtensions()
}

var getActiveLayer = function()
{
    return $("#create-layers .layers>ul>li.active")[0]
}

var populateExtensions = function()
{
    $("#Extensions select").append("<option>Custom</option>")

    for(var extension in extensions)
    {
        $("#Extensions select").append("<option>" + extension + "</option>")
    }
    
    $("#Extensions select").on("change", function()
    {
        var extension = extensions[$("#Extensions select").val()]
        window[extension.functions].getView(extension.full_path)
        // $("#ExtensionView").append(window[extension.functions].getView(extension.full_path))
    })
}
