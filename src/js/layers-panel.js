$("#create-layers .add-btn").on("click", function(){
    console.log("Adding new layer")
    if(!workspace.layers)
    {
        workspace.layers = {}
    }
    $("#create-layers .caret.expanded").toggleClass("expanded", false)
    workspace.layers["Layer" + (d3.keys(workspace.layers).length + 1)] = new Layer("Layer " + (d3.keys(workspace.layers).length + 1))
    updateLayersPanel()

})

var updateLayersPanel = function()
{
    if(workspace.layers)
    {
        $("#create-layers .layers>ul").html("")
        for(var layer in workspace.layers)
        {
            console.log(workspace.layers[layer])
            var class_name = workspace.layers[layer].visibility?"":"hidden"
            console.log(class_name)
            $("#create-layers .layers>ul").append(workspace.layers[layer].getListView())
        }
        $("#create-layers .layers>ul>li").on("click", onLayerSelect)
        $("#create-layers .layers>ul>li:last").click()
        $("#create-layers .layers>ul>li>div>img.eye").on("click", function(e){
            hideLayer(this)
            e.stopPropagation()
        })

        $("#create-layers .layers>ul>li>div>img.caret").on("click", function(e){
            showTemplates(this)
            e.stopPropagation()
        })

        $("#create-layers .layers>ul>li>div>img.lock").on("click", function(e){
            lockLayer(this)
            e.stopPropagation()
        })
    }

}

var hideLayer = function(listItem)
{
    var layer_id = $(listItem.parentNode.parentNode).attr("data-layer-id")

    $(listItem).toggleClass("hidden")
    if($(listItem).hasClass("hidden")){
        workspace.layers[layer_id].setVisible(false)
    }
    else
    {
        workspace.layers[layer_id].setVisible(true)
    }
    $("#" + workspace.layers[layer_id].getSVGGroup()).toggleClass("hidden")
}

var lockLayer = function(listItem)
{
    var layer_id = $(listItem.parentNode.parentNode).attr("data-layer-id")

    $(listItem).toggleClass("hidden")
    if($(listItem).hasClass("hidden")){
        workspace.layers[layer_id].setLocked(false)
    }
    else
    {
        workspace.layers[layer_id].setLocked(true)
    }
    // $("#" + workspace.layers[layer_id].getSVGGroup()).toggleClass("hidden")
}

var showTemplates = function(listItem)
{
    console.log(listItem)
    var layer_id = $(listItem.parentNode.parentNode).attr("data-layer-id")

    $(listItem).toggleClass("expanded")
    if($(listItem).hasClass("expanded")){
        workspace.layers[layer_id].showTemplates()
    }
    else
    {
        workspace.layers[layer_id].hideTemplates()
    }
    // $("#" + workspace.layers[layer_id].getSVGGroup()).toggleClass("hidden")
}

var onLayerSelect = function()
{
    $("#create-layers .layers>ul>li").removeClass("active")
    $(this).addClass("active")
    // console.log(workspace.layers[$(this).attr("data-layer-id")])
    $("#right-sidebar").html("")
    workspace.layers[$(this).attr("data-layer-id")].getView().appendTo($("#right-sidebar"))

    // workspace.layers[$(this).attr("data-layer-id")].showTemplates()
    // populateExtensions()
    $("#templates select").on("change", function()
    {
        console.log(this)
        var extension = extensions[$(this).val()]
        console.log(this.parentNode)
        // window[extension.functions].getView(extension.full_path)
        $(this.parentNode.parentNode).find(".extension-view").html("")
        $(this.parentNode.parentNode).find(".extension-view").append(extension.getView(extension.path))
    })
}

var getActiveLayer = function()
{
    return workspace.layers[$("#create-layers .layers>ul>li.active").attr("data-layer-id")]
}

var populateExtensions = function()
{
    $(".extensions select").html("")
    $(".extensions select").append("<option>Custom</option>")

    for(var extension in extensions)
    {
        $(".extensions select").append("<option>" + extension + "</option>")
    }
    
    $(".extensions select").on("change", function()
    {
        console.log(this)
        var extension = extensions[$(".extensions select").val()]
        // window[extension.functions].getView(extension.full_path)
        console.log(this.parentNode)
        console.log($(this.parentNode).find(".extension-view").get())
        $(this.parentNode).find(".extension-view").append(extension.getView(extension.path))
    })
}
