$("#create-layers .add-btn").on("click", function(){
    console.log("Adding new layer")
    if(!workspace.layers)
    {
        workspace.layers = {}
    }

    workspace.layers["Layer" + (d3.keys(workspace.layers).length + 1)] = new Layer("Layer" + (d3.keys(workspace.layers).length + 1))
    updateLayersPanel()

})

var updateLayersPanel = function()
{
    if(workspace.layers)
    {
        $("#create-layers .layers>ul").html("")
        for(var layer in workspace.layers)
        {
            $("#create-layers .layers>ul").append("<li data-layer-id="+ layer.replace(/ /g,'') +"><img src='./assets/eyecon.png'>" + layer + "</li>")
        }
        $("#create-layers .layers>ul>li").on("click", onLayerSelect)
        $("#create-layers .layers>ul>li:last").click()
        $("#create-layers .layers>ul>li>img").on("click", function(e){
            hideLayer(this)
            e.stopPropagation()
        })
    }

}

var hideLayer = function(listItem)
{
    var layer_id = $(listItem.parentNode).attr("data-layer-id")
    $(listItem).toggleClass("hidden")
    $("#" + workspace.layers[layer_id].getSVGGroup()).toggleClass("hidden")
}

var onLayerSelect = function()
{
    $("#create-layers .layers>ul>li").removeClass("active")
    $(this).addClass("active")
    // console.log(workspace.layers[$(this).attr("data-layer-id")])
    $("#right-sidebar").html("")
    workspace.layers[$(this).attr("data-layer-id")].getView().appendTo($("#right-sidebar"))
    populateExtensions()
}

var getActiveLayer = function()
{
    return workspace.layers[$("#create-layers .layers>ul>li.active").attr("data-layer-id")]
}

var populateExtensions = function()
{
    $("#Extensions select").html("")
    $("#Extensions select").append("<option>Custom</option>")

    for(var extension in extensions)
    {
        $("#Extensions select").append("<option>" + extension + "</option>")
    }
    
    $("#Extensions select").on("change", function()
    {
        var extension = extensions[$("#Extensions select").val()]
        // window[extension.functions].getView(extension.full_path)
        $("#ExtensionView").append(extension.getView(extension.path))
    })
}
