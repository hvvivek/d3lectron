$("#icon-tabs li").on("click", function(){
    if(workspace)
    {
        workspace.svgScale = 1
        $("#icon-tabs .active").toggleClass("active")
        $(this).toggleClass("active")
        $("#panels .panel.active").toggleClass("active")
        $("#" + this.getAttribute("panel-id")).toggleClass("active")

        switch(this.getAttribute("panel-id"))
        {
            case "layers-panel":
                if(!workspace.canvas)
                {
                    $("#content").html("")
                    var svg = $("<svg id='canvas'></svg>")
                    $("#content").append(svg)
                    d3.select("#canvas")
                        .attr("width", "960px")
                        .attr("height", "540px")
                        // .attr("viewbox", '-150 -150 150 150')

                    
                    // var scale = 1
                    $(svg).bind('mousewheel', zoomFunction)
                    workspace.canvas = svg
                }
                else
                {
                    $("#content").html("")
                    $("#content").append(workspace.canvas)
                    $(workspace.canvas).bind('mousewheel', zoomFunction)

                }
                if(!$("#create-layers .layers>ul>li")[0])$("#create-layers .add-btn").click()

                break;
            default:
                break;
        }
    }
})

$(".panel .dropdown-title").on("click", function()
{
    $("#" + this.getAttribute("dropdown-id")).toggleClass("active")
    if($("#" + this.getAttribute("dropdown-id")).hasClass("active"))
    {
        $( this).find(".icon").attr("src", "./assets/side-open.png")
    }
    else
    {
        $( this).find(".icon").attr("src", "./assets/side-close.png")
    }
})

var zoomFunction = function(event)
{
    var originalWidth = 960
    var originalHeight  = 540
    console.log(event)
    if(event.metaKey || event.ctrlKey)
    {
        var modifier = event.originalEvent.deltaY/ Math.abs(event.originalEvent.deltaY)
        var new_scale = workspace.svgScale + (modifier/100)
    
        if(new_scale > 0.25 && new_scale < 2)
        {
            workspace.svgScale = new_scale
            var newWidth = originalWidth * workspace.svgScale
            var newHeight = originalHeight * workspace.svgScale
            console.log(newWidth)
            $("#canvas")
                .attr("transform", "scale(" + workspace.svgScale + "," + workspace.svgScale + ")")
                // .attr("height", newHeight)
            // console.log(event.originalEvent.deltaY)
        }
    }
}

